"use client";

import { useMemo, useState } from "react";

const players = ["Alex Mercer", "Sarah Chen", "Mike Ross", "John Doe"];

export default function AddMatchPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [winner, setWinner] = useState<"A" | "B" | null>(null);

  const toggle = (p: string) => {
    setSelected((prev) =>
      prev.includes(p)
        ? prev.filter((x) => x !== p)
        : prev.length < 4
        ? [...prev, p]
        : prev
    );
  };

  const teams = useMemo(() => {
    return {
      A: selected.slice(0, 2),
      B: selected.slice(2, 4),
    };
  }, [selected]);

  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E6EDF3] px-4 py-6 max-w-md mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Add Match</h1>
        <p className="text-sm text-[#8B98A9]">
          Select 4 players → auto teams
        </p>
      </div>

      {/* PLAYERS */}
      <section className="space-y-3">
        <h2 className="font-semibold">Players ({selected.length}/4)</h2>

        <div className="space-y-2">
          {players.map((p) => (
            <button
              key={p}
              onClick={() => toggle(p)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition ${
                selected.includes(p)
                  ? "bg-[#121824] border-[#2DFF8F]"
                  : "border-[#1E2A3A]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      {/* TEAMS PREVIEW */}
      {selected.length === 4 && (
        <section className="space-y-3">
          <h2 className="font-semibold">Teams</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#121824] border border-[#1E2A3A] rounded-xl p-3">
              <p className="text-xs text-[#8B98A9] mb-2">Team A</p>
              {teams.A.map((p) => (
                <div key={p}>{p}</div>
              ))}
            </div>

            <div className="bg-[#121824] border border-[#1E2A3A] rounded-xl p-3">
              <p className="text-xs text-[#8B98A9] mb-2">Team B</p>
              {teams.B.map((p) => (
                <div key={p}>{p}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WINNER */}
      {selected.length === 4 && (
        <section className="space-y-2">
          <h2 className="font-semibold">Winner</h2>

          <div className="flex gap-3">
            <button
              onClick={() => setWinner("A")}
              className={`flex-1 py-3 rounded-xl border ${
                winner === "A"
                  ? "bg-[#2DFF8F] text-black"
                  : "border-[#1E2A3A]"
              }`}
            >
              Team A
            </button>

            <button
              onClick={() => setWinner("B")}
              className={`flex-1 py-3 rounded-xl border ${
                winner === "B"
                  ? "bg-[#2DFF8F] text-black"
                  : "border-[#1E2A3A]"
              }`}
            >
              Team B
            </button>
          </div>
        </section>
      )}

      {/* CTA */}
      <button
        disabled={!winner}
        className="w-full bg-[#2DFF8F] text-black font-semibold py-4 rounded-2xl disabled:opacity-30 transition"
      >
        Save Match
      </button>

    </main>
  );
}