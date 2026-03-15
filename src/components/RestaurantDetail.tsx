"use client";
import { Restaurant, Category } from "@/types/restaurant";

const CATEGORY_COLORS: Record<Category, string> = {
  together: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  louisa: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  satvik: "text-blue-400 bg-blue-500/10 border-blue-500/20",
};

const CATEGORY_LABELS: Record<Category, string> = {
  together: "Together",
  louisa: "Louisa",
  satvik: "Satvik",
};

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onClose: () => void;
  onRemove: (id: string) => void;
}

export default function RestaurantDetail({ restaurant, onClose, onRemove }: RestaurantDetailProps) {
  return (
    <div className="absolute bottom-6 left-6 z-20 w-80 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-[#0f0f19]/90 backdrop-blur-xl rounded-2xl border border-white/[0.08] p-5 shadow-2xl">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold text-white leading-tight pr-4">
            {restaurant.name}
          </h3>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors text-lg leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm">{"⭐".repeat(restaurant.stars)}</span>
          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[restaurant.category]}`}>
            {CATEGORY_LABELS[restaurant.category]}
          </span>
        </div>

        <div className="space-y-1.5 mb-4">
          <p className="text-xs text-white/50">
            <span className="text-white/30">Location</span>{" "}
            <span className="text-white/70">{restaurant.city}, {restaurant.country}</span>
          </p>
          <p className="text-xs text-white/50">
            <span className="text-white/30">Cuisine</span>{" "}
            <span className="text-white/70">{restaurant.cuisine}</span>
          </p>
          {restaurant.occasion && (
            <p className="text-xs text-white/50">
              <span className="text-white/30">Occasion</span>{" "}
              <span className="text-white/70 italic">{restaurant.occasion}</span>
            </p>
          )}
        </div>

        <button
          onClick={() => {
            onRemove(restaurant.id);
            onClose();
          }}
          className="text-[10px] uppercase tracking-wider text-red-400/60 hover:text-red-400 transition-colors cursor-pointer"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
