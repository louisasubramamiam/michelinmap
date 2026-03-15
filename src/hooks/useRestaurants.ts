"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePersistentState } from "./usePersistentState";
import { Category, Restaurant } from "@/types/restaurant";
import { allSeedRestaurants } from "@/data/seed-restaurants";
import { computeStats } from "@/lib/stats";

export function useRestaurants() {
  const [restaurants, setRestaurants] = usePersistentState<Restaurant[]>(
    "michelin-restaurants",
    []
  );
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set(["together", "louisa", "satvik"])
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Seed on first load
  useEffect(() => {
    if (mounted && restaurants.length === 0) {
      setRestaurants(allSeedRestaurants);
    }
  }, [mounted, restaurants.length, setRestaurants]);

  const addRestaurant = useCallback(
    (entry: Omit<Restaurant, "id">) => {
      const newRestaurant: Restaurant = {
        ...entry,
        id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      };
      setRestaurants((prev) => [...prev, newRestaurant]);
      return newRestaurant;
    },
    [setRestaurants]
  );

  const removeRestaurant = useCallback(
    (id: string) => {
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    },
    [setRestaurants]
  );

  const toggleCategory = useCallback((category: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }, []);

  const filteredRestaurants = useMemo(
    () => restaurants.filter((r) => activeCategories.has(r.category)),
    [restaurants, activeCategories]
  );

  const stats = useMemo(
    () => computeStats(filteredRestaurants),
    [filteredRestaurants]
  );

  return {
    restaurants,
    filteredRestaurants,
    addRestaurant,
    removeRestaurant,
    activeCategories,
    toggleCategory,
    stats,
    mounted,
  };
}
