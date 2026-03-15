"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Category, Restaurant } from "@/types/restaurant";
import { computeStats } from "@/lib/stats";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(
    new Set(["together", "louisa", "satvik"])
  );
  const [mounted, setMounted] = useState(false);

  // Fetch restaurants from the API on mount
  useEffect(() => {
    fetch("/api/restaurants")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRestaurants(data);
        }
      })
      .catch(console.error)
      .finally(() => setMounted(true));
  }, []);

  const addRestaurant = useCallback(
    async (entry: Omit<Restaurant, "id">) => {
      const res = await fetch("/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      const newRestaurant = await res.json();
      if (res.ok) {
        setRestaurants((prev) => [...prev, newRestaurant]);
      }
      return newRestaurant;
    },
    []
  );

  const removeRestaurant = useCallback(async (id: string) => {
    const res = await fetch(`/api/restaurants/${id}`, { method: "DELETE" });
    if (res.ok) {
      setRestaurants((prev) => prev.filter((r) => r.id !== id));
    }
  }, []);

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
