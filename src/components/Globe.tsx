"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Restaurant, Category } from "@/types/restaurant";

const CATEGORY_COLORS: Record<Category, string> = {
  together: "#f43f5e",
  louisa: "#a78bfa",
  satvik: "#60a5fa",
};

const CATEGORY_GLOW: Record<Category, string> = {
  together: "rgba(244, 63, 94, 0.4)",
  louisa: "rgba(167, 139, 250, 0.4)",
  satvik: "rgba(96, 165, 250, 0.4)",
};

const MAP_STYLE = {
  version: 8 as const,
  name: "Dark",
  sources: {
    "stadia-dark": {
      type: "raster" as const,
      tiles: [
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxzoom: 20,
    },
  },
  layers: [
    {
      id: "stadia-dark-layer",
      type: "raster" as const,
      source: "stadia-dark",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
};

interface GlobeProps {
  restaurants: Restaurant[];
  onSelect: (restaurant: Restaurant) => void;
}

function StarPin({ stars, category, size }: { stars: 1 | 2 | 3; category: Category; size: number }) {
  const color = CATEGORY_COLORS[category];
  const glow = CATEGORY_GLOW[category];

  return (
    <div
      className="relative flex items-center justify-center cursor-pointer transition-transform duration-150 hover:scale-125"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          transform: "scale(1.8)",
        }}
      />
      <div
        className="relative rounded-full border-2 border-white/30 flex items-center justify-center shadow-lg"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 30% 30%, ${color}, ${color}dd)`,
          boxShadow: `0 0 ${size / 2}px ${glow}, 0 2px 8px rgba(0,0,0,0.5)`,
        }}
      >
        <span
          className="text-white font-bold leading-none"
          style={{ fontSize: size * 0.35 }}
        >
          {"★".repeat(stars)}
        </span>
      </div>
    </div>
  );
}

export default function Globe({ restaurants, onSelect }: GlobeProps) {
  const mapRef = useRef<any>(null);
  const [popupRestaurant, setPopupRestaurant] = useState<Restaurant | null>(null);
  const [zoom, setZoom] = useState(2.5);

  // Add fog/atmosphere to the globe once the map loads
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const applySky = () => {
      map.setSky({
        "sky-color": "#0b0b21",
        "horizon-color": "#1a1a3e",
        "sky-horizon-blend": 0.5,
        "atmosphere-blend": 0.8,
      });
    };

    if (map.isStyleLoaded()) {
      applySky();
    } else {
      map.on("style.load", applySky);
    }
  }, []);

  const getPinSize = useCallback((stars: 1 | 2 | 3) => {
    const base = stars === 3 ? 32 : stars === 2 ? 26 : 20;
    if (zoom > 10) return base * 1.2;
    if (zoom > 6) return base;
    return base * 0.8;
  }, [zoom]);

  const handleMarkerClick = useCallback((restaurant: Restaurant) => {
    setPopupRestaurant(restaurant);
    onSelect(restaurant);
    mapRef.current?.flyTo({
      center: [restaurant.lng, restaurant.lat],
      zoom: Math.max(zoom, 12),
      duration: 800,
    });
  }, [onSelect, zoom]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 0,
        latitude: 30,
        zoom: 2.5,
        pitch: 0,
      }}
      mapStyle={MAP_STYLE}
      projection="globe"
      style={{ width: "100%", height: "100%" }}
      onZoom={(e) => setZoom(e.viewState.zoom)}
      onClick={() => setPopupRestaurant(null)}
      attributionControl={false}
    >
      <NavigationControl position="bottom-right" showCompass={false} />

      {restaurants.map((r) => (
        <Marker
          key={r.id}
          longitude={r.lng}
          latitude={r.lat}
          anchor="center"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            handleMarkerClick(r);
          }}
        >
          <StarPin stars={r.stars} category={r.category} size={getPinSize(r.stars)} />
        </Marker>
      ))}

      {popupRestaurant && (
        <Popup
          longitude={popupRestaurant.lng}
          latitude={popupRestaurant.lat}
          anchor="bottom"
          onClose={() => setPopupRestaurant(null)}
          closeButton={false}
          className="michelin-popup"
          offset={20}
        >
          <div className="min-w-[200px]">
            <h3 className="font-bold text-sm text-white mb-1">{popupRestaurant.name}</h3>
            <p className="text-xs text-white/40 mb-1">
              {popupRestaurant.city}, {popupRestaurant.country}
            </p>
            <p className="text-xs text-white/40 mb-2">{popupRestaurant.cuisine}</p>
            <p className="text-sm mb-2">{"⭐".repeat(popupRestaurant.stars)}</p>
            {popupRestaurant.occasion && (
              <p className="text-xs italic text-white/30">{popupRestaurant.occasion}</p>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
}
