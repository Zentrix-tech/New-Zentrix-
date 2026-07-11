"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Subtle mouse parallax on aurora blobs
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let rafId: number;
    let mx = 0, my = 0;

    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    const blobs = el.querySelectorAll<HTMLElement>(".aurora-parallax");
    let cx = 0, cy = 0;

    const animate = () => {
      cx += (mx - cx) * 0.04;
      cy += (my - cy) * 0.04;

      blobs.forEach((blob, i) => {
        const depth = (i + 1) * 12;
        blob.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Blob 1 – top left warm gold */}
      <div
        className="aurora-parallax"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-8%",
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(163,126,54,0.10) 0%, rgba(163,126,54,0.04) 50%, transparent 70%)",
          filter: "blur(70px)",
          animation: "aurora-float-1 14s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 2 – top right bronze */}
      <div
        className="aurora-parallax"
        style={{
          position: "absolute",
          top: "5%",
          right: "-10%",
          width: "50vw",
          height: "50vw",
          maxWidth: 650,
          maxHeight: 650,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,161,94,0.08) 0%, rgba(110,85,40,0.04) 50%, transparent 70%)",
          filter: "blur(80px)",
          animation: "aurora-float-2 18s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 3 – bottom center warm */}
      <div
        className="aurora-parallax"
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "25%",
          width: "60vw",
          height: "40vw",
          maxWidth: 700,
          maxHeight: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(108,78,49,0.07) 0%, rgba(163,126,54,0.03) 50%, transparent 70%)",
          filter: "blur(90px)",
          animation: "aurora-float-3 12s ease-in-out infinite",
          willChange: "transform",
        }}
      />

      {/* Blob 4 – center subtle pulse */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "35%",
          width: "30vw",
          height: "30vw",
          maxWidth: 400,
          maxHeight: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(163,126,54,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "aurora-float-1 20s ease-in-out infinite reverse",
          willChange: "transform",
        }}
      />
    </div>
  );
}
