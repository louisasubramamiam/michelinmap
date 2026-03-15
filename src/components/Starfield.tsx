"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: { x: number; y: number; r: number; base: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({ x: Math.random(), y: Math.random(), r: 0.3 + Math.random() * 0.5, base: 0.3 + Math.random() * 0.4, speed: 0.2 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2 });
    }
    for (let i = 0; i < 80; i++) {
      stars.push({ x: Math.random(), y: Math.random(), r: 0.7 + Math.random() * 0.8, base: 0.5 + Math.random() * 0.3, speed: 0.3 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2 });
    }
    for (let i = 0; i < 20; i++) {
      stars.push({ x: Math.random(), y: Math.random(), r: 1.2 + Math.random() * 1.0, base: 0.7 + Math.random() * 0.3, speed: 0.4 + Math.random() * 0.6, phase: Math.random() * Math.PI * 2 });
    }

    let time = 0;
    let animId: number;

    const draw = () => {
      time += 0.006;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * s.speed + s.phase);
        const alpha = s.base * twinkle;
        const x = s.x * canvas.width;
        const y = s.y * canvas.height;
        const r = s.r * dpr;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 215, 255, ${alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 15,
        mixBlendMode: "screen",
      }}
    />
  );
}
