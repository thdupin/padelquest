type Props = {
  rank: number;
  name: string;
  elo: number;
  trend: string;
};

export default function PlayerCard({
  rank,
  name,
  elo,
  trend,
}: Props) {
  return (
    <div className="bg-[#121824] border border-[#1E2A3A] rounded-2xl p-4 flex items-center justify-between transition hover:border-[#2DFF8F]/40">

      <div className="flex items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-[#0B0F14] flex items-center justify-center font-bold">
          #{rank}
        </div>

        <div>
          <div className="font-semibold">
            {name}
          </div>

          <div className="text-sm text-[#8B98A9]">
            {elo} ELO
          </div>
        </div>

      </div>

      <div className="font-semibold text-[#2DFF8F]">
        {trend}
      </div>
    </div>
  );
}