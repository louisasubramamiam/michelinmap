"use client";

interface GlobeGlowProps {
  zoom: number;
}

export default function GlobeGlow({ zoom }: GlobeGlowProps) {
  // Globe is visible as a sphere roughly between zoom 0–5.
  // At zoom ~2.5 (default), the globe fills ~50% of the viewport.
  // As zoom increases, the globe edge moves outward and eventually
  // the projection flattens to a mercator-like view (~zoom 5+).
  // We fade the glow out as zoom increases past 4.

  const opacity = zoom < 3.5 ? 1 : zoom < 5.5 ? 1 - (zoom - 3.5) / 2 : 0;

  if (opacity <= 0) return null;

  // The globe's apparent radius as a % of the container.
  // At zoom 2.5, the globe is roughly 42% radius. It grows with zoom.
  const globeRadius = Math.min(42 + (zoom - 2.5) * 12, 80);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[9] transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Outer soft indigo/white glow halo */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 50% 55%,
              transparent ${globeRadius - 4}%,
              rgba(140, 160, 255, 0.03) ${globeRadius - 2}%,
              rgba(180, 200, 255, 0.10) ${globeRadius}%,
              rgba(200, 215, 255, 0.18) ${globeRadius + 1}%,
              rgba(180, 200, 255, 0.10) ${globeRadius + 2.5}%,
              rgba(120, 140, 230, 0.04) ${globeRadius + 5}%,
              transparent ${globeRadius + 10}%
            )
          `,
        }}
      />
      {/* Wide diffuse indigo atmosphere bleed */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 50% 55%,
              transparent ${globeRadius - 2}%,
              rgba(99, 102, 241, 0.06) ${globeRadius + 3}%,
              rgba(79, 70, 229, 0.03) ${globeRadius + 12}%,
              transparent ${globeRadius + 25}%
            )
          `,
        }}
      />
    </div>
  );
}
