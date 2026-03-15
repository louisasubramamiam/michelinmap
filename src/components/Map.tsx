"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Restaurant } from "@/types/restaurant";
import MapMarkerComponent from "./MapMarker";

interface MapProps {
  restaurants: Restaurant[];
  onRemove: (id: string) => void;
}

export default function Map({ restaurants, onRemove }: MapProps) {
  return (
    <MapContainer
      center={[30, 0]}
      zoom={3}
      minZoom={2}
      className="h-full w-full rounded-lg"
      style={{ background: "#1a1a2e" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {restaurants.map((r) => (
        <MapMarkerComponent key={r.id} restaurant={r} onRemove={onRemove} />
      ))}
    </MapContainer>
  );
}
