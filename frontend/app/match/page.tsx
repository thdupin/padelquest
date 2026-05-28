"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, X, ChevronRight, Users, User, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LogMatch() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [format, setFormat] = useState("doubles");
  const [availablePlayers, setAvailablePlayers] = useState([]);
  
  const [partnerId, setPartnerId] = useState("");
  const [opponent1Id, setOpponent1Id] = useState("");
  const [opponent2Id, setOpponent2Id] = useState("");
  
  const [scoreA, setScoreA] = useState(2);
  const [scoreB, setScoreB] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/leaderboard")
      .then((res) => res.json())
      .then((data) => setAvailablePlayers(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async () => {
    const currentUserId = 1; 
    const payload = {
      teamA: format === "doubles" ? [currentUserId, parseInt(partnerId)] : [currentUserId],
      teamB: format === "doubles" ? [parseInt(opponent1Id), parseInt(opponent2Id)] : [parseInt(opponent1Id)],
      scoreA,
      scoreB
    };

    try {
      const res = await fetch("http://localhost:4000/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] p-6 max-w-md mx-auto font-sans">
      
      <div className="mb-6">
        <Link href="/" className="text-xs font-bold text-[#8B98A9] hover:text-[#E6EDF3] flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3 h-3" /> Retour
        </Link>
      </div>

      <div className="bg-[#121824] border border-[#1E2A3A] rounded-2xl p-6 relative shadow-2xl">
        
        <Link href="/" className="absolute top-4 right-4 text-[#8B98A9] hover:text-[#E6EDF3] transition-colors">
          <X className="w-4 h-4" />
        </Link>

        {step === 1 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-[#2DFF8F] fill-[#2DFF8F]/20" />
              <h1 className="text-lg font-black tracking-tight">Logger un match</h1>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-[#8B98A9] uppercase tracking-wider mb-2">Format</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat("doubles")}
                  className={cn(
                    "py-3 rounded-xl text-xs font-black transition-all border",
                    format === "doubles" ? "bg-[#2DFF8F]/10 border-[#2DFF8F] text-[#2DFF8F]" : "bg-[#0B0F14]/60 border-[#1E2A3A] text-[#8B98A9]"
                  )}
                >
                  Doubles (2v2)
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("singles")}
                  className={cn(
                    "py-3 rounded-xl text-xs font-black transition-all border",
                    format === "singles" ? "bg-[#2DFF8F]/10 border-[#2DFF8F] text-[#2DFF8F]" : "bg-[#0B0F14]/60 border-[#1E2A3A] text-[#8B98A9]"
                  )}
                >
                  Singles (1v1)
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-[#8B98A9] uppercase tracking-wider mb-2">Ton équipe</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#2DFF8F]/5 border border-[#2DFF8F]/30 p-3 rounded-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#2DFF8F]/20 text-[#2DFF8F] font-mono text-[10px] font-black flex items-center justify-center">
                    LM
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-[#2DFF8F] font-black uppercase tracking-wider">TOI</p>
                    <p className="text-xs font-black truncate">Lucas Martin</p>
                  </div>
                </div>

                {format === "doubles" ? (
                  <select
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    className="bg-[#0B0F14]/60 border border-[#1E2A3A] p-3 rounded-xl text-xs font-medium text-[#E6EDF3] focus:border-[#2DFF8F] focus:outline-none appearance-none"
                  >
                    <option value="">+ Partenaire</option>
                    {availablePlayers.map(p => p.id !== 1 && <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                ) : (
                  <div className="bg-[#0B0F14]/20 border border-[#1E2A3A]/40 p-3 rounded-xl flex items-center justify-center text-xs text-[#8B98A9] gap-1.5">
                    <User className="w-3 h-3" /> Solo
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold text-[#8B98A9] uppercase tracking-wider mb-2">Adversaires</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={opponent1Id}
                  onChange={(e) => setOpponent1Id(e.target.value)}
                  className="bg-[#0B0F14]/60 border border-[#1E2A3A] p-3 rounded-xl text-xs font-medium text-[#E6EDF3] focus:border-[#2DFF8F] focus:outline-none"
                >
                  <option value="">+ Adversaire 1</option>
                  {availablePlayers.map(p => p.id !== 1 && <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>

                {format === "doubles" && (
                  <select
                    value={opponent2Id}
                    onChange={(e) => setOpponent2Id(e.target.value)}
                    className="bg-[#0B0F14]/60 border border-[#1E2A3A] p-3 rounded-xl text-xs font-medium text-[#E6EDF3] focus:border-[#2DFF8F] focus:outline-none"
                  >
                    <option value="">+ Adversaire 2</option>
                    {availablePlayers.map(p => p.id !== 1 && <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                )}
              </div>
            </div>

            <button
              type="button"
              disabled={!opponent1Id || (format === "doubles" && (!partnerId || !opponent2Id))}
              onClick={() => setStep(2)}
              className="w-full bg-[#2DFF8F] disabled:bg-[#1E2A3A] disabled:text-[#8B98A9] text-[#0B0F14] font-black uppercase py-4 rounded-xl text-xs tracking-widest transition-all flex items-center justify-center gap-1"
            >
              Score <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            {/* L'étape 2 reste identique mais profite désormais des classes dynamiques via la fonction cn() */}
            <div className="flex items-center gap-2 mb-6">
              <button type="button" onClick={() => setStep(1)} className="text-[#8B98A9] text-xs font-bold hover:text-[#E6EDF3] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Équipes
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-[#0B0F14]/60 p-4 rounded-xl border border-[#1E2A3A] text-center">
                <p className="text-xs font-black text-[#2DFF8F] uppercase tracking-wider mb-2">Ton Équipe</p>
                <div className="text-4xl font-mono font-black text-[#2DFF8F] mb-4">{scoreA}</div>
                <div className="flex gap-1 justify-center">
                  {[0, 1, 2, 3].map(v => (
                    <button key={v} type="button" onClick={() => setScoreA(v)}
                      className={cn(
                        "w-10 h-10 rounded-lg text-sm font-mono font-black border transition-all",
                        scoreA === v ? "bg-[#2DFF8F] text-[#0B0F14] border-[#2DFF8F]" : "border-[#1E2A3A] text-[#8B98A9]"
                      )}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0B0F14]/60 p-4 rounded-xl border border-[#1E2A3A] text-center">
                <p className="text-xs font-black text-[#8B98A9] uppercase tracking-wider mb-2">Adversaires</p>
                <div className="text-4xl font-mono font-black text-[#E6EDF3] mb-4">{scoreB}</div>
                <div className="flex gap-1 justify-center">
                  {[0, 1, 2, 3].map(v => (
                    <button key={v} type="button" onClick={() => setScoreB(v)}
                      className={cn(
                        "w-10 h-10 rounded-lg text-sm font-mono font-black border transition-all",
                        scoreB === v ? "bg-amber-500 text-[#0B0F14] border-amber-500" : "border-[#1E2A3A] text-[#8B98A9]"
                      )}>
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <button type="button" onClick={handleSubmit} className="w-full bg-[#2DFF8F] text-[#0B0F14] font-black uppercase py-4 rounded-xl text-xs tracking-widest shadow-[0_0_20px_rgba(45,255,143,0.3)]">
                Enregistrer le Match
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}