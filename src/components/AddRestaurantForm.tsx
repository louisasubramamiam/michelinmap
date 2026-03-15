"use client";
import { useState } from "react";
import { Category, Restaurant } from "@/types/restaurant";

interface AddRestaurantFormProps {
  onAdd: (entry: Omit<Restaurant, "id">) => Promise<Restaurant> | Restaurant;
  onClose: () => void;
}

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  london: { lat: 51.5074, lng: -0.1278 },
  paris: { lat: 48.8566, lng: 2.3522 },
  tokyo: { lat: 35.6762, lng: 139.6503 },
  "new york": { lat: 40.7128, lng: -74.006 },
  copenhagen: { lat: 55.6761, lng: 12.5683 },
  singapore: { lat: 1.3521, lng: 103.8198 },
  rome: { lat: 41.9028, lng: 12.4964 },
  barcelona: { lat: 41.3874, lng: 2.1686 },
  bangkok: { lat: 13.7563, lng: 100.5018 },
  "hong kong": { lat: 22.3193, lng: 114.1694 },
  dubai: { lat: 25.2048, lng: 55.2708 },
  milan: { lat: 45.4642, lng: 9.19 },
  lisbon: { lat: 38.7223, lng: -9.1393 },
  amsterdam: { lat: 52.3676, lng: 4.9041 },
  berlin: { lat: 52.52, lng: 13.405 },
  madrid: { lat: 40.4168, lng: -3.7038 },
  sydney: { lat: -33.8688, lng: 151.2093 },
  "kuala lumpur": { lat: 3.139, lng: 101.6869 },
  vancouver: { lat: 49.2827, lng: -123.1207 },
  dublin: { lat: 53.3498, lng: -6.2603 },
  edinburgh: { lat: 55.9533, lng: -3.1883 },
  manchester: { lat: 53.4808, lng: -2.2426 },
  cambridge: { lat: 52.2053, lng: 0.1218 },
  belfast: { lat: 54.5973, lng: -5.9301 },
  dubrovnik: { lat: 42.6507, lng: 18.0944 },
  porto: { lat: 41.1579, lng: -8.6291 },
  lyon: { lat: 45.764, lng: 4.8357 },
  osaka: { lat: 34.6937, lng: 135.5023 },
  kyoto: { lat: 35.0116, lng: 135.7681 },
  seoul: { lat: 37.5665, lng: 126.978 },
  chicago: { lat: 41.8781, lng: -87.6298 },
  "san francisco": { lat: 37.7749, lng: -122.4194 },
  "los angeles": { lat: 34.0522, lng: -118.2437 },
  melbourne: { lat: -37.8136, lng: 144.9631 },
  malta: { lat: 35.8997, lng: 14.5146 },
  "gran canaria": { lat: 27.9202, lng: -15.5474 },
  bray: { lat: 51.5082, lng: -0.6999 },
  taormina: { lat: 37.8516, lng: 15.2884 },
  provence: { lat: 43.8932, lng: 5.3837 },
};

function lookupCoords(city: string): { lat: number; lng: number } | null {
  const key = city.toLowerCase().trim();
  return CITY_COORDS[key] ?? null;
}

const inputClass =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/10 transition-colors";

export default function AddRestaurantForm({ onAdd, onClose }: AddRestaurantFormProps) {
  const [name, setName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [stars, setStars] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<Category>("together");
  const [occasion, setOccasion] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !cuisine || !city || !country) {
      setError("Please fill in all required fields.");
      return;
    }

    let coords = lookupCoords(city);
    if (!coords && lat && lng) {
      coords = { lat: parseFloat(lat), lng: parseFloat(lng) };
    }
    if (!coords || isNaN(coords.lat) || isNaN(coords.lng)) {
      setError("City not recognised. Please enter lat/lng manually.");
      return;
    }

    onAdd({
      name,
      cuisine,
      city,
      country,
      stars,
      lat: coords.lat,
      lng: coords.lng,
      category,
      occasion: occasion || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0f0f19] border border-white/[0.08] rounded-2xl shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Add Restaurant</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors text-xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-xs mb-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
            {error}
          </p>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5 block">Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Restaurant name" />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5 block">Cuisine *</label>
            <input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} className={inputClass} placeholder="e.g. French, Indian" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5 block">City *</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} placeholder="London" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5 block">Country *</label>
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} placeholder="UK" />
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5 block">Stars *</label>
            <div className="flex gap-2">
              {([1, 2, 3] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStars(s)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
                    stars === s
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                      : "bg-white/[0.02] border-white/[0.06] text-white/40 hover:border-white/[0.12]"
                  }`}
                >
                  {"⭐".repeat(s)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5 block">Category *</label>
            <div className="flex gap-2">
              {([
                { key: "together" as const, label: "Together", active: "bg-rose-500/20 border-rose-500/50 text-rose-300" },
                { key: "louisa" as const, label: "Louisa", active: "bg-violet-500/20 border-violet-500/50 text-violet-300" },
                { key: "satvik" as const, label: "Satvik", active: "bg-blue-500/20 border-blue-500/50 text-blue-300" },
              ]).map(({ key, label, active }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCategory(key)}
                  className={`flex-1 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                    category === key
                      ? active
                      : "bg-white/[0.02] border-white/[0.06] text-white/40 hover:border-white/[0.12]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5 block">Occasion</label>
            <input type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} className={inputClass} placeholder="Birthday, anniversary..." />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5 block">Latitude</label>
              <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} className={inputClass} placeholder="Auto from city" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5 block">Longitude</label>
              <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} className={inputClass} placeholder="Auto from city" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-rose-600 to-rose-500 text-white py-2.5 px-4 rounded-xl text-sm font-medium hover:from-rose-500 hover:to-rose-400 transition-all duration-200 shadow-lg shadow-rose-500/20 cursor-pointer"
          >
            Add Restaurant
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-sm font-medium border border-white/[0.08] text-white/50 hover:text-white/70 hover:border-white/[0.15] transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
