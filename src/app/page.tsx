"use client";
import dynamic from "next/dynamic";
import { useState, useCallback, useRef } from "react";
import { useRestaurants } from "@/hooks/useRestaurants";
import Starfield from "@/components/Starfield";
import Dashboard from "@/components/Dashboard";
import CategoryFilter from "@/components/CategoryFilter";
import AddRestaurantForm from "@/components/AddRestaurantForm";

const Globe = dynamic(() => import("@/components/Globe"), { ssr: false });

export default function Home() {
  const {
    filteredRestaurants,
    addRestaurant,
    activeCategories,
    toggleCategory,
    stats,
    mounted,
  } = useRestaurants();

  const [showAddForm, setShowAddForm] = useState(false);
  const globeRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(() => {}, []);

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
          <p className="text-white/30 text-xs uppercase tracking-[0.2em]">Loading</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Starfield excludeRef={globeRef} />

      {/* Header */}
      <div className="relative z-20 px-6 pt-5 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-white tracking-tight">
              Michelin Map
            </h1>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 border border-white/[0.06] px-2 py-0.5 rounded-full">
              {stats.totalVisited} visits
            </span>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-rose-500/20 border border-rose-500/50 text-rose-300 px-4 py-1.5 rounded-full text-xs font-medium hover:bg-rose-500/30 hover:border-rose-500/60 transition-all duration-200 shadow-[0_0_12px_rgba(244,63,94,0.15)] cursor-pointer"
          >
            + Add Restaurant
          </button>
        </div>

        <Dashboard stats={stats} />

        <div className="mt-3">
          <CategoryFilter
            activeCategories={activeCategories}
            onToggle={toggleCategory}
          />
        </div>
      </div>

      {/* Globe area */}
      <div ref={globeRef} className="flex-1 min-h-0 relative z-10 globe-wrapper">
        {/* The map */}
        <div className="absolute inset-0">
          <Globe
            restaurants={filteredRestaurants}
            onSelect={handleSelect}
          />
        </div>

        {/* Top blend into header */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
      </div>

      {/* Add form modal */}
      {showAddForm && (
        <AddRestaurantForm
          onAdd={addRestaurant}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}
