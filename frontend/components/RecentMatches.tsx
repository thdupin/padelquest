"use client";
import { Flame, Crown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils"; // Importation relative directe de sécurité

// Interfaces pour un typage TypeScript rigoureux
interface MatchTag {
  label: string;
  class: string;
}

interface Match {
  id: number;
  tags: MatchTag[];
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  date: string;
  impact?: string;
}

export default function RecentMatches() {
  // Injection propre des données de tes maquettes Figma
  const sampleMatches: Match[] = [
    {
      id: 1,
      tags: [{ label: "DOMINANT WIN 💀", class: "text-amber-500 bg-amber-500/10 border-amber-500/20" }],
      teamA: "Julien Moreau & Nicolas Laurent",
      teamB: "Maxime Roux & Pierre Simon",
      scoreA: 2,
      scoreB: 0,
      date: "19 mai"
    },
    {
      id: 2,
      tags: [
        { label: "UPSET ⚡", class: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
        { label: "DOMINANT WIN 💀", class: "text-amber-500 bg-amber-500/10 border-amber-500/20" }
      ],
      teamA: "Lucas Martin & Maxime Roux",
      teamB: "Nicolas Laurent & Antoine Petit",
      scoreA: 2,
      scoreB: 0,
      impact: "↑ Victoire · ELO +29",
      date: "19 mai"
    }
  ];

  return (
    <div className="bg-[#121824] border border-[#1E2A3A] rounded-xl p-6 h-full shadow-lg">
      
      {/* Title Section */}
      <div className="flex items-center gap-2 mb-6">
        <Flame className="w-5 h-5 text-amber-500 fill-amber-500/10" />
        <h2 className="text-lg font-black tracking-tight text-[#E6EDF3]">Matchs récents</h2>
      </div>

      {/* Match Cards List */}
      <div className="space-y-4">
        {sampleMatches.map((match) => (
          <div 
            key={match.id} 
            className="bg-[#0B0F14]/60 border border-[#1E2A3A] rounded-xl p-4 relative overflow-hidden transition-colors hover:border-[#1E2A3A]/80"
          >
            
            {/* Top Bar du Match (Tags + Date) piloté par cn() */}
            <div className="flex flex-wrap gap-1 items-center justify-between mb-3">
              <div className="flex gap-1.5">
                {match.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className={cn(
                      "text-[9px] font-black px-2 py-0.5 border rounded uppercase tracking-wider font-sans select-none",
                      tag.class
                    )}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-[#8B98A9] font-mono">{match.date}</span>
            </div>

            {/* Corps du score (Vainqueurs vs Perdants) */}
            <div className="space-y-2.5">
              {/* Équipe Gagnante (Team A) */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-black tracking-tight flex items-center gap-2 text-[#E6EDF3]">
                  <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10 shrink-0" /> 
                  {match.teamA}
                </span>
                <span className="text-base font-mono font-black text-[#2DFF8F]">{match.scoreA}</span>
              </div>
              
              {/* Équipe Perdante (Team B) */}
              <div className="flex justify-between items-center opacity-40 group">
                <span className="text-sm font-medium tracking-tight pl-5 text-[#E6EDF3]">
                  {match.teamB}
                </span>
                <span className="text-base font-mono font-bold text-[#E6EDF3]">{match.scoreB}</span>
              </div>
            </div>

            {/* Section Evolution ELO dynamique via cn() */}
            {match.impact && (
              <div className={cn(
                "mt-3 pt-3 border-t border-[#1E2A3A]/60 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider font-mono",
                match.scoreA > match.scoreB ? "text-[#2DFF8F]" : "text-[#FF4D4D]"
              )}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{match.impact}</span>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}