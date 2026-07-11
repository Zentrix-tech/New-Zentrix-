"use client";

import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mx = -500,
      my = -500;
    let cx = -500,
      cy = -500;
    let rafId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark vignette overlay
      ctx.fillStyle = "rgba(250,247,242,0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spotlight: radial gradient that punches a hole through the overlay
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 320);
      gradient.addColorStop(0, "rgba(250,247,242,0)");
      gradient.addColorStop(0.3, "rgba(250,247,242,0)");
      gradient.addColorStop(0.7, "rgba(163,126,54,0.012)");
      gradient.addColorStop(1, "rgba(163,126,54,0.03)");

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(cx, cy, 300, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      // Soft warm halo near cursor
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, 200);
      halo.addColorStop(0, "rgba(163,126,54,0.025)");
      halo.addColorStop(1, "rgba(163,126,54,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, 200, 0, Math.PI * 2);
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        mixBlendMode: "multiply",
        opacity: 0.6,
      }}
    />
  );
}
