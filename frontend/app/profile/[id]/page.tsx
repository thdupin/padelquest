"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Swords, Flame, ArrowLeft, Trophy, Medal } from "lucide-react";
import { cn } from "@/lib/utils"; // Chemin relatif direct pour éviter le bug de compilation

// Typage strict pour éviter les erreurs de compilation TypeScript
interface UserData {
  id: number;
  name: string;
  elo: number;
}

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/users/${id}`)
      .then((res) => res.json())
      .then((data: UserData) => setUser(data))
      .catch((err) => console.error("Erreur profil:", err));
  }, [id]);

  if (!user) {
    return (
      <div className="text-[#8B98A9] text-center mt-20 text-xs font-black uppercase tracking-widest font-mono">
        Chargement du profil...
      </div>
    );
  }

  // Génération automatique des initiales pour l'avatar
  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2)
    : "??";

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] p-6 max-w-5xl mx-auto font-sans pb-24">
      
      {/* Bouton retour avec icône vectorielle Lucide */}
      <div className="mb-6">
        <Link href="/" className="text-xs font-black text-[#8B98A9] hover:text-[#E6EDF3] flex items-center gap-1 transition-colors uppercase tracking-wider font-mono">
          <ArrowLeft className="w-3.5 h-3.5" /> Retour Dashboard
        </Link>
      </div>

      {/* Grid pour calquer l'UI globale Desktop/Tablette de tes maquettes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* COLONNE GAUCHE : Identity Card */}
        <div className="md:col-span-1 bg-[#121824] border border-[#1E2A3A] rounded-2xl p-6 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2DFF8F]" />
          
          {/* Avatar Premium Style Esport */}
          <div className="w-20 h-20 bg-[#0B0F14] rounded-full mx-auto mb-4 flex items-center justify-center font-black text-2xl border-2 border-[#2DFF8F] text-[#2DFF8F] font-mono shadow-[0_0_15px_rgba(45,255,143,0.15)]">
            {initials}
          </div>
          
          <h1 className="text-xl font-black tracking-tight text-[#E6EDF3] flex items-center justify-center gap-1.5">
            {user.name}
          </h1>
          
          <div className="flex items-center justify-center gap-1 text-[#8B98A9] text-[10px] font-black uppercase tracking-widest mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2DFF8F]" /> Joueur Vérifié
          </div>

          {/* ELO Block conforme à tes visuels Figma */}
          <div className="mt-6 bg-[#0B0F14]/60 p-4 rounded-xl border border-[#1E2A3A] block w-full">
            <span className="text-[10px] text-[#8B98A9] uppercase font-black tracking-widest font-mono flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3 text-amber-500" /> Rang Compétitif
            </span>
            <p className="text-4xl font-black text-[#2DFF8F] mt-1.5 tracking-tighter font-mono">{user.elo}</p>
            <span className="text-[9px] text-[#8B98A9] uppercase tracking-wider font-bold block mt-0.5 font-mono">BRONZE • PIC 1199</span>
          </div>
        </div>

        {/* COLONNE DROITE : Attributs & Rivalités (Prend 2/3 de la largeur) */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-[#121824] border border-[#1E2A3A] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs font-black uppercase text-[#8B98A9] tracking-widest border-b border-[#1E2A3A] pb-3 mb-4 flex items-center gap-1.5">
              <Medal className="w-4 h-4 text-[#2DFF8F]" /> Attributs Joueur
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Box Style de jeu */}
              <div className="bg-[#0B0F14]/40 border border-[#1E2A3A] p-4 rounded-xl flex items-start gap-3.5">
                <div className="p-2.5 bg-[#1E2A3A] rounded-lg text-[#E6EDF3]">
                  <Swords className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#E6EDF3]">Profil Offensif</p>
                  <p className="text-[11px] text-[#8B98A9] mt-0.5">Predilection pour le Smash & la Volée</p>
                </div>
              </div>

              {/* Box Série en cours (Effet Ego / Hype) */}
              <div className="bg-[#0B0F14]/40 border border-[#1E2A3A] p-4 rounded-xl flex items-start gap-3.5">
                <div className="p-2.5 bg-[#2DFF8F]/10 rounded-lg text-[#2DFF8F] border border-[#2DFF8F]/20">
                  <Flame className="w-5 h-5 fill-[#2DFF8F]/20" />
                </div>
                <div>
                  <p className="text-sm font-black text-[#E6EDF3]">Série : 3 Victoires</p>
                  <p className="text-[11px] text-[#2DFF8F] font-bold mt-0.5">Invaincu au club ce mois-ci</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}