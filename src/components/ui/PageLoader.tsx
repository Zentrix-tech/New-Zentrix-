"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.classList.add("loading");

    // ── Neural Particle Canvas ──────────────────────────────
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    interface Node { x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulsePhase: number; }
    const nodes: Node[] = [];
    let animFrame: number;

    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const drawCanvas = (progress: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.25 * progress;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(163,126,54,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const pulse = Math.sin(t * 2 + node.pulsePhase) * 0.3 + 0.7;
        const alpha = node.opacity * pulse * progress;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163,126,54,${alpha})`;
        ctx.fill();

        // Glow
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 4);
        grad.addColorStop(0, `rgba(196,161,94,${alpha * 0.4})`);
        grad.addColorStop(1, "rgba(196,161,94,0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
    };

    // ── Progress Counter ────────────────────────────────────
    let progressVal = 0;
    const duration = 2600;
    const step = 16;
    const increment = 100 / (duration / step);

    const timer = setInterval(() => {
      progressVal = Math.min(progressVal + increment, 100);
      const rounded = Math.floor(progressVal);
      setCount(rounded);
      if (counterRef.current) counterRef.current.textContent = `${rounded}%`;
      if (barRef.current) barRef.current.style.width = `${rounded}%`;

      if (progressVal >= 100) {
        clearInterval(timer);
        setTimeout(hideLoader, 400);
      }
    }, step);

    // ── Canvas loop ─────────────────────────────────────────
    const loop = () => {
      const progress = Math.min(progressVal / 100, 1);
      drawCanvas(progress);
      animFrame = requestAnimationFrame(loop);
    };
    loop();

    // ── Entrance animations ─────────────────────────────────
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { scale: 0.6, opacity: 0, rotationY: 30 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 1.2, ease: "power4.out" }
    )
    .fromTo(
      textRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
      "-=0.7"
    );

    const hideLoader = () => {
      cancelAnimationFrame(animFrame);
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("loading");
          setDone(true);
        },
      });
      exitTl
        .to([logoRef.current, textRef.current, barRef.current?.parentElement], {
          y: -30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.in",
        })
        .to(
          loaderRef.current,
          { yPercent: -100, duration: 1.1, ease: "power4.inOut" },
          "-=0.2"
        );
    };

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(animFrame);
      tl.kill();
    };
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
        gap: "36px",
        overflow: "hidden",
      }}
    >
      {/* Neural network canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.8,
        }}
      />

      {/* Aurora blob */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(163,126,54,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          animation: "aurora-float-1 8s ease-in-out infinite",
        }}
      />

      {/* Logo mark */}
      <div
        ref={logoRef}
        style={{ position: "relative", opacity: 0 }}
      >
        {/* Spinning outer ring */}
        <div
          style={{
            position: "absolute",
            inset: "-28px",
            border: "1px solid rgba(163,126,54,0.2)",
            borderRadius: "50%",
            animation: "spin-slow 6s linear infinite",
          }}
        />
        {/* Spinning inner ring */}
        <div
          style={{
            position: "absolute",
            inset: "-14px",
            border: "1.5px solid rgba(196,161,94,0.35)",
            borderRadius: "50%",
            animation: "spin-reverse 4s linear infinite",
          }}
        />

        {/* Metallic glow ring */}
        <div
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(163,126,54,0.4) 90deg, rgba(196,161,94,0.7) 180deg, rgba(163,126,54,0.4) 270deg, transparent 360deg)",
            animation: "conic-spin 3s linear infinite",
            filter: "blur(2px)",
          }}
        />

        {/* Logo circle */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 0 40px rgba(163,126,54,0.3), 0 0 80px rgba(163,126,54,0.15)",
            animation: "pulse-glow 2.5s ease-in-out infinite",
            overflow: "hidden",
            padding: "10px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <img
            src="/logo_main.webp"
            alt="Zentrix Logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Brand text */}
      <div ref={textRef} style={{ textAlign: "center", opacity: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem, 3vw, 1.7rem)",
            fontWeight: 500,
            color: "var(--color-text-primary)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          Zentrix Technology
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            color: "var(--color-text-muted)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Where Vision Meets Velocity
        </p>
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "240px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          style={{
            height: "2px",
            background: "rgba(163,126,54,0.12)",
            borderRadius: "2px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            ref={barRef}
            style={{
              height: "100%",
              width: "0%",
              background: "var(--gradient-primary)",
              borderRadius: "2px",
              transition: "width 0.05s linear",
              boxShadow: "0 0 14px rgba(163,126,54,0.7)",
              position: "relative",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--color-text-muted)",
              letterSpacing: "0.08em",
            }}
          >
            Initializing experience
          </span>
          <span
            ref={counterRef}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--color-violet)",
              letterSpacing: "0.05em",
              fontWeight: 500,
            }}
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
