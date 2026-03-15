"use client";
import { Category } from "@/types/restaurant";

const CATEGORIES: {
  key: Category;
  label: string;
  inactive: string;
  active: string;
  dot: string;
}[] = [
  {
    key: "together",
    label: "Together",
    inactive: "border-rose-500/20 text-rose-400/60",
    active: "bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.15)]",
    dot: "bg-rose-400",
  },
  {
    key: "louisa",
    label: "Louisa",
    inactive: "border-violet-500/20 text-violet-400/60",
    active: "bg-violet-500/20 border-violet-500/50 text-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.15)]",
    dot: "bg-violet-400",
  },
  {
    key: "satvik",
    label: "Satvik",
    inactive: "border-blue-500/20 text-blue-400/60",
    active: "bg-blue-500/20 border-blue-500/50 text-blue-300 shadow-[0_0_12px_rgba(96,165,250,0.15)]",
    dot: "bg-blue-400",
  },
];

interface CategoryFilterProps {
  activeCategories: Set<Category>;
  onToggle: (category: Category) => void;
}

export default function CategoryFilter({ activeCategories, onToggle }: CategoryFilterProps) {
  return (
    <div className="flex gap-2">
      {CATEGORIES.map(({ key, label, inactive, active, dot }) => {
        const isActive = activeCategories.has(key);
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm transition-all duration-300 cursor-pointer ${
              isActive ? active : inactive
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? dot : "bg-white/20"} transition-colors`} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
