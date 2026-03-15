export type Category = "together" | "louisa" | "satvik";

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  city: string;
  country: string;
  stars: 1 | 2 | 3;
  lat: number;
  lng: number;
  category: Category;
  occasion?: string;
}

export interface DashboardStats {
  totalVisited: number;
  totalStars: number;
  oneStar: number;
  twoStar: number;
  threeStar: number;
  topCuisines: { cuisine: string; count: number }[];
  countriesVisited: number;
}
