"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let rafId: number;
    let currentProgress = 0;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const target = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Smooth lerp for buttery movement
      currentProgress += (target - currentProgress) * 0.12;

      bar.style.width = `${currentProgress}%`;
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      {/* Track */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(163,126,54,0.08)",
          zIndex: 9997,
          pointerEvents: "none",
        }}
      />
      {/* Fill bar */}
      <div
        ref={barRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          width: "0%",
          background: "linear-gradient(90deg, #6E5528 0%, #A37E36 50%, #C4A15E 100%)",
          zIndex: 9998,
          pointerEvents: "none",
          transformOrigin: "left center",
          boxShadow:
            "0 0 8px rgba(163,126,54,0.6), 0 0 16px rgba(163,126,54,0.3)",
          transition: "none",
          willChange: "width",
        }}
      >
        {/* Leading glow dot */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#C4A15E",
            boxShadow:
              "0 0 10px rgba(196,161,94,0.9), 0 0 20px rgba(196,161,94,0.5)",
          }}
        />
      </div>
    </>
  );
}
