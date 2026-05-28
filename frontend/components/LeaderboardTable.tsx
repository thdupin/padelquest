"use client";
import { Trophy, Award } from "lucide-react";
import { cn } from "@/lib/utils";

// Interface pour typer les données des joueurs du classement
interface Player {
  id: number;
  name: string;
  elo: number;
}

interface LeaderboardTableProps {
  players: Player[];
}

export default function LeaderboardTable({ players }: LeaderboardTableProps) {
  
  // Rendu vectoriel dynamique pour les rangs et médailles du podium
  const renderRankNode = (index: number) => {
    if (index === 0) {
      return (
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
          <Trophy className="w-4 h-4 fill-amber-500/10" />
        </div>
      );
    }
    if (index === 1) {
      return (
        <div className="w-8 h-8 rounded-lg bg-slate-400/10 text-slate-400 border border-slate-400/20 flex items-center justify-center">
          <Award className="w-4 h-4" />
        </div>
      );
    }
    if (index === 2) {
      return (
        <div className="w-8 h-8 rounded-lg bg-amber-700/10 text-amber-600 border border-amber-700/20 flex items-center justify-center">
          <Award className="w-4 h-4" />
        </div>
      );
    }
    
    // Formatage propre type "04", "05" pour les suivants
    return (
      <div className="w-8 h-8 rounded-lg bg-[#1E2A3A]/40 text-[#8B98A9] border border-[#1E2A3A] flex items-center justify-center font-mono text-xs font-bold">
        {(index + 1).toString().padStart(2, "0")}
      </div>
    );
  };

  return (
    <div className="bg-[#121824] border border-[#1E2A3A] rounded-xl p-6 h-full shadow-lg">
      
      {/* Table Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#2DFF8F]" />
          <h2 className="text-lg font-black tracking-tight text-[#E6EDF3]">Leaderboard</h2>
        </div>
        
        {/* Onglets Mon club / Paris filtrés de ta maquette */}
        <div className="flex gap-1 bg-[#0B0F14] p-1 rounded-lg border border-[#1E2A3A]">
          <button type="button" className="text-xs font-bold px-3 py-1.5 bg-[#121824] text-[#E6EDF3] rounded border border-[#1E2A3A] select-none">
            Mon club
          </button>
          <button type="button" className="text-xs font-bold px-3 py-1.5 text-[#8B98A9] hover:text-[#E6EDF3] transition-colors select-none">
            Paris
          </button>
        </div>
      </div>

      {/* Liste des joueurs */}
      <div className="space-y-2">
        {players.map((player, index) => {
  const initials = player.name
    ? player.name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
    : "??";

  // Exemple concret : on veut mettre en avant Lucas Martin (ID #1) s'il est dans la liste
  const isCurrentUser = player.id === 1;

  return (
    <div 
      key={player.id || index} 
      className={cn(
        // Classes de base pour toutes les lignes
        "flex items-center justify-between p-3 rounded-lg bg-[#0B0F14]/40 border border-[#1E2A3A]/60 transition-colors group",
        // Changement dynamique si c'est la ligne de l'utilisateur connecté (Effet Ego)
        isCurrentUser 
          ? "border-[#2DFF8F]/40 bg-[#2DFF8F]/5 shadow-[0_0_15px_rgba(45,255,143,0.05)]" 
          : "hover:border-[#1E2A3A]"
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {renderRankNode(index)}
        
        <div className="w-9 h-9 rounded-full bg-[#1E2A3A] border border-[#1E2A3A] flex items-center justify-center text-xs font-black text-amber-500 font-mono select-none shrink-0">
          {initials}
        </div>
        
        <div className="min-w-0">
          <h4 className={cn(
            "text-sm font-black tracking-tight text-[#E6EDF3] truncate transition-colors",
            isCurrentUser ? "text-[#2DFF8F]" : "group-hover:text-[#2DFF8F]"
          )}>
            {player.name} {isCurrentUser && <span className="text-[10px] font-medium text-[#8B98A9] ml-1">(Toi)</span>}
          </h4>
          <p className="text-[11px] text-[#8B98A9] font-medium">4 matchs • 2V/2D</p>
        </div>
      </div>

      <div className="text-right shrink-0">
        <span className="text-sm font-black font-mono tracking-tight text-[#E6EDF3]">{player.elo}</span>
        <p className="text-[9px] font-bold text-[#8B98A9] uppercase font-mono tracking-wider mt-0.5">GOLD</p>
      </div>
    </div>
  );
})}
      </div>
    </div>
  );
}