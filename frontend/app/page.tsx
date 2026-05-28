"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardStats from "@/components/DashboardStats";
import LeaderboardTable from "@/components/LeaderboardTable";
import RecentMatches from "@/components/RecentMatches";

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Appel à ton API Fastify
    fetch("http://localhost:4000/leaderboard")
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch((err) => console.error("Erreur de synchronisation API:", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] pb-16 relative">
      {/* 1. Header et Statistiques du haut */}
      <DashboardStats />

      {/* 2. Double Colonne Principale (Layout Propre Figma) */}
      <div className="max-w-7xl mx-auto px-8 mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Colonne Leaderboard (Prend 2 tiers de l'espace sur grand écran) */}
        <div className="lg:col-span-2">
          <LeaderboardTable players={players} />
        </div>

        {/* Colonne Activités (Prend 1 tier de l'espace) */}
        <div className="lg:col-span-1">
          <RecentMatches />
        </div>

      </div>

      {/* 3. Bouton Flottant "Saisie rapide" (+) en bas à droite */}
      <Link 
        href="/match" 
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#2DFF8F] hover:bg-[#2DFF8F]/90 text-[#0B0F14] font-black text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(45,255,143,0.4)] transition-all active:scale-95 z-50"
      >
        +
      </Link>
    </div>
  );
}