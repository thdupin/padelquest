"use client";
import { Trophy, Crown, Target, TrendingUp, LogOut, Dribbble } from "lucide-react";
import { cn } from "@/lib/utils"; // Importation relative directe de sécurité

interface UserStats {
  name: string;
  elo: number;
  rank: string;
  picElo: number;
  matchs: number;
  wins: number;
  losses: number;
  rankPos: number;
  rankTotal: number;
}

export default function DashboardStats() {
  const userStat: UserStats = {
    name: "Lucas Martin",
    elo: 1199,
    rank: "Bronze",
    picElo: 1199,
    matchs: 6,
    wins: 3,
    losses: 3,
    rankPos: 9,
    rankTotal: 10
  };

  const initials = userStat.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Condition dynamique d'exemple : si le joueur est proche d'un palier, on applique une bordure spéciale
  const isNearLevelUp = userStat.elo >= 1150;

  return (
    <div className="w-full bg-[#0B0F14] text-[#E6EDF3] font-sans">
      
      {/* 1. Global Header Bar */}
      <header className="flex justify-between items-center px-8 py-4 border-b border-[#1E2A3A] bg-[#0B0F14]">
        <div className="flex items-center gap-3">
          {/* Logo container */}
          <div className="w-9 h-9 rounded-xl bg-[#2DFF8F] flex items-center justify-center shadow-[0_0_15px_rgba(45,255,143,0.25)]">
            <img 
              src="/logo.png" 
              alt="PadelQuest Logo" 
              className="w-5 h-5" 
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextSibling) {
                  (e.currentTarget.nextSibling as HTMLElement).style.display = 'block';
                }
              }} 
            />
            <Dribbble className="w-5 h-5 text-black hidden" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight leading-tight">PadelQuest</h1>
            <p className="text-[11px] text-[#8B98A9]">Padel Club Paris 15</p>
          </div>
        </div>

        {/* User Profile Corner */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-tight">{userStat.name}</p>
            <p className="text-[11px] text-[#8B98A9] font-mono mt-0.5">
              <span className="text-[#2DFF8F] font-bold">{userStat.elo}</span> • {userStat.rank}
            </p>
          </div>
          
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center font-black text-xs text-black border border-[#1E2A3A] font-mono select-none">
            {initials}
          </div>
          
          <button className="text-[#8B98A9] hover:text-[#FF4D4D] transition-colors p-1 rounded hover:bg-[#121824] ml-1">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. Grid de Statistiques avec gestion dynamique via cn() */}
      <div className="max-w-7xl mx-auto px-8 pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 : ELO Actuel (Bénéficie d'un filtre adaptatif) */}
        <div className={cn(
          "bg-[#121824] border rounded-xl p-5 relative overflow-hidden bg-gradient-to-b from-[#121824] to-[#121824]/40 shadow-md transition-all",
          isNearLevelUp ? "border-[#2DFF8F]/30 shadow-[0_0_20px_rgba(45,255,143,0.02)]" : "border-[#1E2A3A]"
        )}>
          <div className="absolute top-0 left-0 w-1 h-full bg-[#2DFF8F]" />
          <div className="flex justify-between items-center">
            <span className="text-[#2DFF8F] bg-[#2DFF8F]/10 border border-[#2DFF8F]/20 p-1.5 rounded-lg">
              <Trophy className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black tracking-widest text-[#8B98A9] uppercase font-mono">ELO ACTUEL</span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-black text-[#2DFF8F] font-mono tracking-tight">{userStat.elo}</p>
            <p className="text-xs font-bold text-[#8B98A9] mt-0.5">{userStat.rank}</p>
          </div>
        </div>

        {/* Card 2 : PIC ELO */}
        <div className={cn("bg-[#121824] border border-[#1E2A3A] rounded-xl p-5 bg-gradient-to-b from-[#121824] to-[#121824]/40 shadow-md")}>
          <div className="flex justify-between items-center">
            <span className="text-amber-500 bg-amber-500/10 border border-amber-500/20 p-1.5 rounded-lg">
              <Crown className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black tracking-widest text-[#8B98A9] uppercase font-mono">PIC ELO</span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-black text-amber-500 font-mono tracking-tight">{userStat.picElo}</p>
            <p className="text-xs font-bold text-[#8B98A9] mt-0.5">Niveau maximum atteint</p>
          </div>
        </div>

        {/* Card 3 : MATCHS */}
        <div className={cn("bg-[#121824] border border-[#1E2A3A] rounded-xl p-5 bg-gradient-to-b from-[#121824] to-[#121824]/40 shadow-md")}>
          <div className="flex justify-between items-center">
            <span className="text-purple-400 bg-purple-400/10 border border-purple-400/20 p-1.5 rounded-lg">
              <Target className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black tracking-widest text-[#8B98A9] uppercase font-mono">MATCHS</span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-black text-purple-400 font-mono tracking-tight">{userStat.matchs}</p>
            <p className="text-xs font-bold text-[#8B98A9] mt-0.5 font-mono">
              {userStat.wins}V • {userStat.losses}D
            </p>
          </div>
        </div>

        {/* Card 4 : CLASSEMENT */}
        <div className={cn("bg-[#121824] border border-[#1E2A3A] rounded-xl p-5 bg-gradient-to-b from-[#121824] to-[#121824]/40 shadow-md")}>
          <div className="flex justify-between items-center">
            <span className="text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 p-1.5 rounded-lg">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-black tracking-widest text-[#8B98A9] uppercase font-mono">CLASSEMENT</span>
          </div>
          <div className="mt-4">
            <p className="text-4xl font-black text-cyan-400 font-mono tracking-tight">#{userStat.rankPos}</p>
            <p className="text-xs font-bold text-[#8B98A9] mt-0.5">sur {userStat.rankTotal} joueurs</p>
          </div>
        </div>

      </div>
    </div>
  );
}