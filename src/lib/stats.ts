import { Restaurant, DashboardStats } from "@/types/restaurant";

export function computeStats(restaurants: Restaurant[]): DashboardStats {
  const cuisineCounts = new Map<string, number>();
  const countries = new Set<string>();

  let oneStar = 0;
  let twoStar = 0;
  let threeStar = 0;
  let totalStars = 0;

  for (const r of restaurants) {
    totalStars += r.stars;
    if (r.stars === 1) oneStar++;
    else if (r.stars === 2) twoStar++;
    else if (r.stars === 3) threeStar++;

    countries.add(r.country);
    cuisineCounts.set(r.cuisine, (cuisineCounts.get(r.cuisine) ?? 0) + 1);
  }

  const topCuisines = [...cuisineCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cuisine, count]) => ({ cuisine, count }));

  return {
    totalVisited: restaurants.length,
    totalStars,
    oneStar,
    twoStar,
    threeStar,
    topCuisines,
    countriesVisited: countries.size,
  };
}
