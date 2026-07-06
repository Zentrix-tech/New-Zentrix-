"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  maxRadius: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate tracking
  const mouse = useRef({ x: -100, y: -100 });
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const vel = useRef({ x: 0, y: 0 });
  
  // Animation state refs
  const particles = useRef<Particle[]>([]);
  const ripples = useRef<Ripple[]>([]);
  const requestRef = useRef<number>(0);
  const idleTimer = useRef<number>(0);
  const isTabActive = useRef<boolean>(true);
  const prefersReducedMotion = useRef<boolean>(false);

  useEffect(() => {
    // 1. Detect touch screen/pointer support
    const checkTouch = () => {
      const touchSupport =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(touchSupport);
    };

    checkTouch();
    window.addEventListener("resize", checkTouch, { passive: true });

    // Respect user motion accessibility preference
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return () => {
      window.removeEventListener("resize", checkTouch);
    };
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    const logoContainer = logoRef.current;
    const ring = ringRef.current;
    if (!canvas || !logoContainer || !ring) return;

    // Set canvas dimensions to viewport size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });

    // Track mouse coordinates
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    // Global capture group interactive hover detection (mouseover/mouseout bubble)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [data-cursor='hover'], input, textarea, select, label, .project-row-anim, .service-card, .clickable-element, .interactive-hover"
      );
      if (interactive) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const relatedTarget = e.relatedTarget as HTMLElement;
      const interactive = target.closest(
        "a, button, [data-cursor='hover'], input, textarea, select, label, .project-row-anim, .service-card, .clickable-element, .interactive-hover"
      );
      if (interactive && (!relatedTarget || !relatedTarget.closest(
        "a, button, [data-cursor='hover'], input, textarea, select, label, .project-row-anim, .service-card, .clickable-element, .interactive-hover"
      ))) {
        setIsHovered(false);
      }
    };

    // Emit click particles and ripple burst
    const onMouseDown = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Add ripple
      ripples.current.push({
        x,
        y,
        radius: 4,
        alpha: 1.0,
        maxRadius: 46,
      });

      // Add 12-16 custom particles in brand colors (Gold, Bronze, Sand)
      const colors = ["#A37E36", "#6E5528", "#C4A15E", "#FAF7F2"];
      const particleCount = prefersReducedMotion.current ? 4 : 14;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.8 + Math.random() * 3.5;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: 2.5 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Squeeze compression effect
      gsap.to(logoContainer, {
        scale: 0.82,
        duration: 0.1,
        overwrite: "auto",
        onComplete: () => {
          gsap.to(logoContainer, {
            scale: isHovered ? 1.3 : 1.0,
            duration: 0.45,
            ease: "back.out(2)",
            overwrite: "auto",
          });
        },
      });
    };

    // Track tab visibility changes to pause loops
    const handleVisibilityChange = () => {
      isTabActive.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Register primary mouse event listeners
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });

    // Buttery smooth animation loops
    const tick = () => {
      if (!isTabActive.current) {
        requestRef.current = requestAnimationFrame(tick);
        return;
      }

      // 1. Lerp cursor positions
      const lerpVal = prefersReducedMotion.current ? 0.35 : 0.15;
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      
      pos.current.x += dx * lerpVal;
      pos.current.y += dy * lerpVal;

      const speed = Math.sqrt(dx * dx + dy * dy);

      // 2. Idle floating sine animation
      let idleY = 0;
      if (speed < 0.35 && !prefersReducedMotion.current) {
        idleTimer.current += 16.7; // assuming ~60fps frame delta
        if (idleTimer.current > 400) {
          idleY = Math.sin(Date.now() * 0.0035) * 3;
        }
      } else {
        idleTimer.current = 0;
      }

      // 3. Movement tilt/rotation
      let angle = 0;
      if (speed > 1.2 && !prefersReducedMotion.current) {
        angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Map to a subtle max 12 degree tilt
        angle = Math.max(-12, Math.min(12, angle * 0.12));
      }

      // 4. Squash and stretch calculations based on speed
      const stretch = prefersReducedMotion.current ? 1.0 : Math.min(1.15, 1 + speed * 0.002);
      const squash = prefersReducedMotion.current ? 1.0 : Math.max(0.85, 1 - speed * 0.002);

      // Apply transforms on logo container (no translate(-50%, -50%) because top-left represents the click hotspot!)
      logoContainer.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y + idleY}px, 0) rotate(${angle}deg) scale(${isHovered ? 1.3 : 1}) scale3d(${stretch}, ${squash}, 1)`;

      // 5. Outer glowing ring follows slower, centered on the hotspot
      const ringLerpVal = prefersReducedMotion.current ? 0.35 : 0.08;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * ringLerpVal;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * ringLerpVal;
      
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) scale(${isHovered ? 1.0 : 0})`;

      // 6. Draw particles and ripples on canvas
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update & Render Particles
        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.045; // gravity
          p.vx *= 0.97;
          p.vy *= 0.97;
          p.alpha -= 0.025;

          if (p.alpha <= 0) {
            particles.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        }

        // Update & Render Ripples
        for (let i = ripples.current.length - 1; i >= 0; i--) {
          const r = ripples.current[i];
          r.radius += (r.maxRadius - r.radius) * 0.12;
          r.alpha -= 0.035;

          if (r.alpha <= 0) {
            ripples.current.splice(i, 1);
            continue;
          }

          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(163, 126, 54, 0.45)";
          ctx.lineWidth = 1.5;
          ctx.globalAlpha = r.alpha;
          ctx.stroke();
        }

        ctx.globalAlpha = 1.0;
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isTouchDevice, isHovered]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Fullscreen interactive particle & ripple canvas */}
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

      {/* Floating Outer Glowing Ring */}
      <div
        ref={ringRef}
        className="cursor-ring-glowing"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "56px",
          height: "56px",
          border: "1.5px solid rgba(163, 126, 54, 0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99997,
          transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          boxShadow: "0 0 20px rgba(163, 126, 54, 0.2)",
          transition: "transform 0.05s ease-out, scale 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      />

      {/* Main Brand Logo Cursor with Pointer Tip Shape */}
      <div
        ref={logoRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "44px", // Increased size!
          height: "44px",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
        }}
      >
        {/* Tiny custom arrow pointer pointing up-left */}
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="var(--color-violet)"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "translate(-2px, -2px)", // Aligns M2 2 tip exactly with (0,0) mouse coordinate
            filter: "drop-shadow(0 1px 3px rgba(163, 126, 54, 0.4))",
          }}
        >
          <path d="M2 2l20 10-9 2-2 9z" fill="currentColor" />
        </svg>

        {/* The brand logo, increased in size, slightly inclined position */}
        <img
          src="/logo_cursor.png"
          alt="Cursor Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            position: "absolute",
            top: "6px",
            left: "6px",
            transform: "rotate(-15deg)", // permanently inclined!
            filter: "drop-shadow(0 2px 6px rgba(163, 126, 54, 0.18))",
            mixBlendMode: "multiply",
            transformOrigin: "top left",
          }}
          className="cursor-logo-img-hover"
        />
      </div>
    </>
  );
}
