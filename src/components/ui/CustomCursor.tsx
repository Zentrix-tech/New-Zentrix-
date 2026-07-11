"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number; size: number;
  color: string;
}

interface Ripple {
  x: number; y: number;
  radius: number; alpha: number;
  maxRadius: number;
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouse = useRef({ x: -200, y: -200 });
  const dotPos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const particles = useRef<Particle[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const rafRef = useRef<number>(0);
  const isHovering = useRef(false);
  const cursorText = useRef("");
  const prefersReduced = useRef(false);
  const isTabActive = useRef(true);
  const magnetTarget = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const isTouchScreen =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouchScreen);
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    if (!canvas || !dot || !ring || !textEl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Check magnetic targets
      const magnetEl = (e.target as HTMLElement)?.closest("[data-magnetic]") as HTMLElement | null;
      if (magnetEl && !prefersReduced.current) {
        const rect = magnetEl.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height) * 0.8;
        if (dist < maxDist) {
          magnetTarget.current = {
            x: cx + dx * 0.35,
            y: cy + dy * 0.35,
          };
        } else {
          magnetTarget.current = null;
        }
      } else {
        magnetTarget.current = null;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor='hover'], input, textarea, select, label, [data-magnetic]"
      );
      if (interactive) {
        isHovering.current = true;
        const ct = (interactive as HTMLElement).dataset.cursorText || "";
        cursorText.current = ct;
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest("a, button, [data-cursor='hover'], input, textarea, [data-magnetic]")) {
        isHovering.current = false;
        cursorText.current = "";
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        alpha: 0.8,
        maxRadius: 48,
      });

      if (prefersReduced.current) return;
      const colors = ["#A37E36", "#6E5528", "#C4A15E", "#E8D5A3", "#FAF7F2"];
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          size: 2 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      gsap.to(dot, { scale: 0.7, duration: 0.08, overwrite: true, onComplete: () =>
        gsap.to(dot, { scale: isHovering.current ? 1.5 : 1, duration: 0.4, ease: "back.out(2)", overwrite: true })
      });
    };

    const handleVisibility = () => { isTabActive.current = !document.hidden; };
    document.addEventListener("visibilitychange", handleVisibility);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });

    const tick = () => {
      if (!isTabActive.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const lerpF = prefersReduced.current ? 0.5 : 0.16;
      const ringLerpF = prefersReduced.current ? 0.4 : 0.07;

      // Target position: magnetic or mouse
      const targetX = magnetTarget.current?.x ?? mouse.current.x;
      const targetY = magnetTarget.current?.y ?? mouse.current.y;

      dotPos.current.x += (targetX - dotPos.current.x) * lerpF;
      dotPos.current.y += (targetY - dotPos.current.y) * lerpF;

      ringPos.current.x += (dotPos.current.x - ringPos.current.x) * ringLerpF;
      ringPos.current.y += (dotPos.current.y - ringPos.current.y) * ringLerpF;

      const hov = isHovering.current;
      const hasText = !!cursorText.current;

      // Dot
      dot.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%) scale(${hov ? (hasText ? 0 : 1.4) : 1})`;
      dot.style.opacity = hasText ? "0" : "1";

      // Ring
      const ringSize = hov ? (hasText ? 80 : 64) : 48;
      ring.style.width = `${ringSize}px`;
      ring.style.height = `${ringSize}px`;
      ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      ring.style.borderColor = hov
        ? "rgba(163,126,54,0.7)"
        : "rgba(163,126,54,0.4)";
      ring.style.background = hasText
        ? "rgba(163,126,54,0.1)"
        : "transparent";

      // Text label
      if (textEl) {
        textEl.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
        textEl.style.opacity = hasText ? "1" : "0";
        textEl.textContent = cursorText.current;
      }

      // Canvas: particles + ripples
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.alpha -= 0.022;
          if (p.alpha <= 0) { particles.current.splice(i, 1); continue; }
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }

        for (let i = ripples.current.length - 1; i >= 0; i--) {
          const r = ripples.current[i];
          r.radius += (r.maxRadius - r.radius) * 0.1;
          r.alpha -= 0.03;
          if (r.alpha <= 0) { ripples.current.splice(i, 1); continue; }
          ctx.globalAlpha = r.alpha;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(163,126,54,0.5)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Particle + ripple canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--color-violet)",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          boxShadow:
            "0 0 10px rgba(163,126,54,0.7), 0 0 20px rgba(163,126,54,0.4)",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "1.5px solid rgba(163,126,54,0.4)",
          pointerEvents: "none",
          zIndex: 99997,
          willChange: "transform",
          boxShadow: "0 0 20px rgba(163,126,54,0.15)",
          transition:
            "width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease, background 0.2s ease",
          backdropFilter: "blur(0px)",
        }}
      />

      {/* Cursor text label */}
      <div
        ref={textRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          fontFamily: "var(--font-body) !important",
          fontSize: "0.58rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          color: "var(--color-violet)",
          textTransform: "uppercase",
          opacity: 0,
          transition: "opacity 0.2s ease",
          whiteSpace: "nowrap",
          willChange: "transform",
        }}
      />
    </>
  );
}
