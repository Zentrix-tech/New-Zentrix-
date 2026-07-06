"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollPercent(progress);
      el.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9999,
        background: "var(--color-border)",
        pointerEvents: "none",
      }}
    >
      <div
        ref={progressRef}
        style={{
          height: "100%",
          width: `${scrollPercent}%`,
          background: "linear-gradient(90deg, #6C4E31, #B8934B, #06B6D4)",
          boxShadow: "0 0 10px rgba(184, 147, 75, 0.8)",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
}
