"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.classList.add("loading");

    // Counter animation
    let start = 0;
    const duration = 2400;
    const step = 16;
    const increment = 100 / (duration / step);

    const timer = setInterval(() => {
      start = Math.min(start + increment, 100);
      setCount(Math.floor(start));
      if (start >= 100) {
        clearInterval(timer);
        setTimeout(hideLoader, 300);
      }
    }, step);

    const hideLoader = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("loading");
          setDone(true);
        },
      });

      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });
    };

    return () => clearInterval(timer);
  }, []);

  if (done) return null;

  return (
    <div
      ref={loaderRef}
      className="page-loader"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--color-bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
      }}
    >
      {/* Animated logo mark */}
      <div ref={logoRef} style={{ position: "relative" }}>
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: "-20px",
            border: "1px solid rgba(200, 169, 106, 0.15)",
            borderRadius: "50%",
            animation: "spin-slow 4s linear infinite",
          }}
        />
        {/* Inner ring */}
        <div
          style={{
            position: "absolute",
            inset: "-10px",
            border: "1px solid rgba(232, 216, 181, 0.25)",
            borderRadius: "50%",
            animation: "spin-reverse 3s linear infinite",
          }}
        />
        {/* Logo circle */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 60px var(--color-violet-glow)",
            animation: "pulse-glow 2s ease-in-out infinite",
            overflow: "hidden",
            padding: "8px",
          }}
        >
          <img
            src="/logo_main.png"
            alt="Zentrix Logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Brand name */}
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Zentrix Technology
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: "6px",
          }}
        >
          Where Vision Meets Velocity
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: "200px" }}>
        <div
          style={{
            height: "2px",
            background: "var(--color-surface-2)",
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            ref={barRef}
            style={{
              height: "100%",
              width: `${count}%`,
              background: "var(--gradient-primary)",
              borderRadius: "2px",
              transition: "width 0.05s linear",
              boxShadow: "0 0 12px var(--color-violet-glow)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "rgba(245, 245, 245, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            Loading experience
          </span>
          <span
            ref={counterRef}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "var(--color-violet)",
              letterSpacing: "0.05em",
            }}
          >
            {count}%
          </span>
        </div>
      </div>
    </div>
  );
}
