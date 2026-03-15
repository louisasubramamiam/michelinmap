"use client";
import { DashboardStats } from "@/types/restaurant";

interface DashboardProps {
  stats: DashboardStats;
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: string;
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-2.5 min-w-0">
      {icon && <span className="text-sm sm:text-base opacity-80 shrink-0">{icon}</span>}
      <div className="min-w-0">
        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] text-white/30 leading-none mb-1 truncate">{label}</p>
        <p className="text-sm sm:text-lg font-light text-white/90 tracking-tight leading-none truncate">{value}</p>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-6 sm:h-8 bg-white/[0.06] self-center shrink-0 hidden sm:block" />;
}

export default function Dashboard({ stats }: DashboardProps) {
  return (
    <div className="grid grid-cols-4 sm:flex sm:items-center bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/[0.05] overflow-hidden">
      <StatCard label="Restaurants" value={stats.totalVisited} icon="🍽" />
      <Divider />
      <StatCard label="Total Stars" value={stats.totalStars} icon="⭐" />
      <Divider />
      <StatCard label="3 Stars" value={stats.threeStar} icon="⭐⭐⭐" />
      <Divider />
      <StatCard label="2 Stars" value={stats.twoStar} icon="⭐⭐" />
      <Divider />
      <StatCard label="1 Star" value={stats.oneStar} icon="⭐" />
      <Divider />
      <StatCard label="Countries" value={stats.countriesVisited} icon="🌍" />
      <Divider />
      <StatCard label="Top Cuisine" value={stats.topCuisines[0]?.cuisine ?? "—"} />
    </div>
  );
}
