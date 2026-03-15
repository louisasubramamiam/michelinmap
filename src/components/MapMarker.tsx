"use client";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Restaurant, Category } from "@/types/restaurant";

const CATEGORY_COLORS: Record<Category, string> = {
  together: "#E11D48",  // rose-600
  louisa: "#7C3AED",    // violet-600
  satvik: "#2563EB",    // blue-600
};

const CATEGORY_LABELS: Record<Category, string> = {
  together: "Together",
  louisa: "Louisa",
  satvik: "Satvik",
};

function createStarIcon(stars: 1 | 2 | 3, category: Category): L.DivIcon {
  const color = CATEGORY_COLORS[category];
  const size = stars === 3 ? 36 : stars === 2 ? 32 : 28;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size + 2],
    html: `
      <div style="
        width: ${size}px; height: ${size}px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
        cursor: pointer;
      ">
        <span style="
          transform: rotate(45deg);
          color: white; font-weight: bold; font-size: ${stars === 3 ? 11 : stars === 2 ? 12 : 14}px;
          line-height: 1;
        ">${"★".repeat(stars)}</span>
      </div>
    `,
  });
}

interface MapMarkerProps {
  restaurant: Restaurant;
  onRemove: (id: string) => void;
}

export default function MapMarkerComponent({ restaurant, onRemove }: MapMarkerProps) {
  const icon = createStarIcon(restaurant.stars, restaurant.category);

  return (
    <Marker position={[restaurant.lat, restaurant.lng]} icon={icon}>
      <Popup>
        <div className="min-w-[180px]">
          <h3 className="font-bold text-sm mb-1">{restaurant.name}</h3>
          <p className="text-xs text-gray-600 mb-1">
            {restaurant.city}, {restaurant.country}
          </p>
          <p className="text-xs text-gray-600 mb-1">{restaurant.cuisine}</p>
          <p className="text-sm mb-1">
            {"⭐".repeat(restaurant.stars)}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: CATEGORY_COLORS[restaurant.category] }}
            >
              {CATEGORY_LABELS[restaurant.category]}
            </span>
          </div>
          {restaurant.occasion && (
            <p className="text-xs italic text-gray-500 mb-2">{restaurant.occasion}</p>
          )}
          <button
            onClick={() => onRemove(restaurant.id)}
            className="text-xs text-red-500 hover:text-red-700 cursor-pointer"
          >
            Remove
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
