import type { DashboardStat } from "@/backoffice/data/mock-data";

interface StatCardProps {
  stat: DashboardStat;
}

const trendColors = {
  up: "text-green-600",
  down: "text-red-600",
  neutral: "text-gray-500",
};

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
      <p className="mt-2 text-3xl font-black text-taco-dark">{stat.value}</p>
      {stat.change && (
        <p className={`mt-1 text-xs font-bold ${trendColors[stat.trend ?? "neutral"]}`}>
          {stat.change}
        </p>
      )}
    </div>
  );
}
