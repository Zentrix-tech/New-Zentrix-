"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowRight, Zap, Globe, Code2, Smartphone, Bot, Palette,
  ChevronRight, Star, Play, Check, ExternalLink, TrendingUp,
  Shield, Rocket, Award, Users, Briefcase, FlaskConical,
  Layers, Server, Database, Cloud, Clock, BarChart2, ChevronLeft, ChevronDown
} from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import CodeTypewriter from "@/components/ui/CodeTypewriter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── UTILS ───────────────────────────────────────────────────────────────────

function splitWords(text: string): string[] {
  return text.split(" ").filter(Boolean);
}

// ─── PARTICLE FIELD ──────────────────────────────────────────────────────────

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    interface Particle {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string; life: number; maxLife: number;
    }
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const colors = ["rgba(163,126,54,", "rgba(196,161,94,", "rgba(110,85,40,"];

    const spawnParticle = () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.5 + 0.1,
        color, life: 0, maxLife: Math.random() * 220 + 100,
      });
    };

    for (let i = 0; i < 100; i++) spawnParticle();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.04) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const fade = p.life < 20 ? p.life / 20 : p.life > p.maxLife - 20 ? (p.maxLife - p.life) / 20 : 1;
        const alpha = p.opacity * fade;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, `${p.color}${alpha * 0.3})`);
        grad.addColorStop(1, `${p.color}0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < Math.min(i + 4, particles.length); j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(163,126,54,${0.06 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animFrame); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
  );
}

// ─── NEURAL NETWORK ───────────────────────────────────────────────────────────

function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let mx = 0, my = 0;

    interface NNode { x: number; y: number; vx: number; vy: number; size: number; pulsePhase: number; }
    const nodes: NNode[] = [];
    const numNodes = 22;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      nodes.length = 0;
      for (let i = 0; i < numNodes; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 1,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;

      nodes.forEach((node) => {
        // Gentle mouse attract
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          node.vx += (dx / dist) * 0.015;
          node.vy += (dy / dist) * 0.015;
        }

        node.vx *= 0.96;
        node.vy *= 0.96;
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        const pulse = Math.sin(t * 1.5 + node.pulsePhase) * 0.3 + 0.7;
        const alpha = 0.5 * pulse;

        // Glow
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 5);
        grad.addColorStop(0, `rgba(163,126,54,${alpha * 0.6})`);
        grad.addColorStop(1, "rgba(163,126,54,0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163,126,54,${alpha})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(163,126,54,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.6 }}
    />
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  const techStack = [
    "React & Next.js", 2000,
    "AI & Machine Learning", 2000,
    "Flutter & React Native", 2000,
    "Node.js & Python", 2000,
    "Cloud & DevOps", 2000,
    "AI Automation", 2000,
  ];

  const heroWords1 = splitWords("We Engineer");
  const heroWords2 = splitWords("Digital Futures");

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(badgeRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 });

    // Word-by-word headline reveal
    const allWordEls = wordsRef.current.filter(Boolean);
    tl.fromTo(
      allWordEls,
      { opacity: 0, y: 50, rotateX: 15, filter: "blur(12px)" },
      { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", stagger: 0.08, duration: 1.1 },
      "-=0.5"
    );

    tl.fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.7")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(statsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(codeRef.current, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1 }, "-=1.2");

    // Parallax on scroll
    const par = gsap.to(contentRef.current, {
      y: 100,
      opacity: 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Mouse parallax layers
    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      mx += (cx - mx) * 0.04;
      my += (cy - my) * 0.04;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      tl.kill();
      par.scrollTrigger?.kill();
      par.kill();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const addWordRef = (el: HTMLDivElement | null, i: number) => {
    if (el) wordsRef.current[i] = el;
  };

  const heroStats = [
    { value: "7+", label: "Projects Delivered" },
    { value: "5+", label: "Innovation Projects" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <section
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      <ParticleField />
      <NeuralNetwork />

      {/* Gradient mesh */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 15% 40%, rgba(163,126,54,0.10) 0%, transparent 55%),
                     radial-gradient(ellipse at 85% 20%, rgba(108,78,49,0.07) 0%, transparent 50%),
                     radial-gradient(ellipse at 50% 80%, rgba(196,161,94,0.05) 0%, transparent 45%)`,
      }} />

      {/* AI Grid */}
      <div className="ai-grid" />

      {/* Content */}
      <div
        ref={contentRef}
        className="container-zentrix"
        style={{ position: "relative", zIndex: 3, paddingTop: 140, paddingBottom: 80 }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "880px", margin: "0 auto" }}>
          {/* Centered hero text */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Badge */}
            <div
              ref={badgeRef}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "8px 20px", background: "rgba(163,126,54,0.08)",
                border: "1px solid rgba(163,126,54,0.22)", borderRadius: 100, marginBottom: 32,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-success)", boxShadow: "0 0 8px rgba(16,185,129,0.8)", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", fontWeight: 600, color: "var(--color-text-secondary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Now accepting projects — {new Date().getFullYear()}
              </span>
            </div>

            {/* Headline — word by word */}
            <div style={{ perspective: "1000px", marginBottom: 8 }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem,6.5vw,6.5rem)", fontWeight: 500, lineHeight: 1.04, letterSpacing: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.25em" }}>
                {heroWords1.map((word, i) => (
                  <span
                    key={`w1-${i}`}
                    ref={(el) => addWordRef(el as HTMLDivElement | null, i)}
                    style={{ display: "inline-block", color: "var(--color-text-primary)" }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </div>
            <div style={{ perspective: "1000px", marginBottom: 24 }}>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem,6.5vw,6.5rem)", fontWeight: 500, lineHeight: 1.04, letterSpacing: 0, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.25em" }}>
                {heroWords2.map((word, i) => (
                  <span
                    key={`w2-${i}`}
                    ref={(el) => addWordRef(el as HTMLDivElement | null, heroWords1.length + i)}
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(135deg, var(--color-violet) 0%, var(--color-gold) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            {/* Typewriter */}
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "clamp(0.85rem,1.8vw,1.1rem)",
              color: "var(--color-violet)", marginBottom: 18,
              display: "flex", justifyContent: "center", alignItems: "center", gap: 8,
            }}>
              <span style={{ color: "var(--color-text-muted)" }}>// Building with</span>
              <TypeAnimation
                sequence={techStack}
                wrapper="span"
                repeat={Infinity}
                style={{ color: "var(--color-violet)", fontWeight: 500 }}
              />
            </div>

            <p
              ref={subRef}
              style={{
                fontFamily: "var(--font-body)", fontSize: "clamp(1rem,2vw,1.2rem)",
                color: "var(--color-text-secondary)", lineHeight: 1.8,
                maxWidth: 680, marginBottom: 44, textAlign: "center",
              }}
            >
              Premium software engineering from Salem — delivering enterprise systems, AI automation,
              mobile apps, and digital experiences that{" "}
              <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>redefine what&apos;s possible</span>.
            </p>

            {/* CTA buttons */}
            <div ref={ctaRef} style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
              <Link
                href="/contact"
                data-magnetic
                data-cursor-text="START"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "16px 40px",
                  background: "linear-gradient(135deg, var(--color-violet-light), var(--color-violet), var(--color-gold))",
                  backgroundSize: "200% auto",
                  color: "#fff", borderRadius: 100,
                  fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem",
                  textDecoration: "none",
                  boxShadow: "0 20px 50px rgba(163,126,54,0.28)",
                  transition: "all 0.4s var(--ease-out-expo)",
                  position: "relative", overflow: "hidden",
                  animation: "holographic-shift 4s ease infinite",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 28px 60px rgba(163,126,54,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(163,126,54,0.28)"; }}
              >
                <Zap size={18} />
                Start Your Project
              </Link>
              <Link
                href="/works"
                data-magnetic
                data-cursor-text="EXPLORE"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "15px 40px",
                  background: "transparent", color: "var(--color-text-primary)",
                  borderRadius: 100, border: "1px solid var(--color-border-hover)",
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.95rem",
                  textDecoration: "none", backdropFilter: "blur(10px)",
                  transition: "all 0.3s var(--ease-out-expo)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(163,126,54,0.4)"; e.currentTarget.style.background = "rgba(163,126,54,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-hover)"; e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Play size={16} fill="currentColor" />
                View Our Work
              </Link>
            </div>

            {/* Stats row */}
            <div ref={statsRef} style={{ display: "flex", justifyContent: "center", gap: "clamp(20px,4vw,48px)", flexWrap: "wrap" }}>
              {heroStats.map((stat) => (
                <div key={stat.label} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "var(--font-display)", fontWeight: 500,
                    fontSize: "clamp(1.6rem,3vw,2.2rem)",
                    background: "linear-gradient(135deg, var(--color-violet-light), var(--color-gold))",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", lineHeight: 1, marginBottom: 5,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "var(--color-text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MARQUEE TECH SECTION ─────────────────────────────────────────────────────

const techItems = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Flutter",
  "TensorFlow", "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker",
  "Kubernetes", "GraphQL", "React Native", "Figma", "Three.js", "Prisma",
  "Tailwind CSS", "GSAP", "Framer Motion", "Firebase", "Supabase", "Vercel",
];
const techItemsReversed = [...techItems].reverse();
const marqueeTrack1 = [...techItems, ...techItems, ...techItems];
const marqueeTrack2 = [...techItemsReversed, ...techItemsReversed, ...techItemsReversed];

function TechMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!track1 || !track2) return;

    let xPercent1 = 0;
    let xPercent2 = -50;
    let direction = -1;
    let speedFactor = 1;

    const animate = () => {
      if (xPercent1 <= -50) xPercent1 = 0;
      if (xPercent2 >= 0) xPercent2 = -50;

      xPercent1 += 0.06 * direction * speedFactor;
      xPercent2 += 0.06 * -direction * speedFactor;
      speedFactor += (1 - speedFactor) * 0.04;

      gsap.set(track1, { xPercent: xPercent1 });
      gsap.set(track2, { xPercent: xPercent2 });

      requestRef.current = requestAnimationFrame(animate);
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        direction = self.direction === 1 ? -1 : 1;
        const velocity = Math.abs(self.getVelocity() / 300);
        speedFactor = Math.min(Math.max(velocity, 1), 5);
      },
    });

    const requestRef = { current: requestAnimationFrame(animate) };

    return () => {
      cancelAnimationFrame(requestRef.current);
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        padding: "52px 0",
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Edge fades */}
      {["left", "right"].map((side) => (
        <div
          key={side}
          style={{
            position: "absolute", [side]: 0, top: 0, bottom: 0, width: 180,
            background: `linear-gradient(${side === "left" ? "90deg" : "-90deg"}, var(--color-bg-secondary), transparent)`,
            zIndex: 2, pointerEvents: "none",
          }}
        />
      ))}

      {[{ ref: track1Ref, items: marqueeTrack1 }, { ref: track2Ref, items: marqueeTrack2 }].map(({ ref, items }, trackIdx) => (
        <div key={trackIdx} style={{ display: "flex", overflow: "hidden", marginBottom: trackIdx === 0 ? 16 : 0 }}>
          <div ref={ref} style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}>
            {items.map((tech, i) => (
              <div
                key={i}
                className="marquee-item"
                style={{ flexShrink: 0 }}
              >
                <span
                  className="tech-dot"
                  style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: trackIdx === 0 ? "var(--color-violet)" : "var(--color-gold)",
                    flexShrink: 0,
                  }}
                />
                <span style={{
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.875rem",
                  color: "var(--color-text-secondary)", letterSpacing: "0.02em",
                }}>
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── STATS SECTION ────────────────────────────────────────────────────────────

function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const stats = [
    { value: 7, suffix: "+", label: "Projects Completed", icon: Briefcase, color: "#A37E36", barWidth: 70 },
    { value: 5, suffix: "+", label: "Innovation Projects", icon: FlaskConical, color: "#6E5528", barWidth: 50 },
    { value: 100, suffix: "%", label: "Client Satisfaction", icon: Star, color: "#C4A15E", barWidth: 100 },
    { value: 99, suffix: ".9%", label: "Uptime Guarantee", icon: Shield, color: "#A37E36", barWidth: 99 },
    { value: 10, suffix: "K+", label: "Hours Saved via AI", icon: Clock, color: "#6E5528", barWidth: 80 },
  ];

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 78%",
      onEnter: () => setActive(true),
      onLeaveBack: () => setActive(false),
    });

    const cards = gsap.utils.toArray(".stat-card-anim");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        stagger: 0.08, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Section reveal
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => { trigger.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "clamp(70px,9vw,120px) 0",
        background: "linear-gradient(135deg, rgba(163,126,54,0.03) 0%, rgba(110,85,40,0.02) 100%)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Morphing blob */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 600, height: 400,
        background: "radial-gradient(ellipse, rgba(163,126,54,0.05) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
        animation: "aurora-float-1 10s ease-in-out infinite",
      }} />

      <div className="container-zentrix" ref={containerRef}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "clamp(16px,3vw,28px)",
        }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const isHov = hoveredIdx === i;
            return (
              <div
                key={stat.label}
                className="stat-card-anim"
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  background: isHov ? `${stat.color}08` : "rgba(255,255,255,0.5)",
                  border: `1px solid ${isHov ? stat.color + "25" : "var(--color-border)"}`,
                  borderRadius: 20, padding: "28px 24px", textAlign: "center",
                  backdropFilter: "blur(12px)",
                  transition: "all 0.4s var(--ease-out-expo)",
                  transform: isHov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                  boxShadow: isHov ? `0 24px 60px ${stat.color}15, 0 0 0 1px ${stat.color}20` : "0 4px 20px rgba(108,78,49,0.04)",
                  cursor: "default",
                  position: "relative", overflow: "hidden",
                }}
              >
                {/* Shimmer glass reflection on hover */}
                {isHov && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "50%",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
                    pointerEvents: "none",
                  }} />
                )}

                <div
                  data-magnetic
                  style={{
                    width: 52, height: 52, borderRadius: 14,
                    background: `${stat.color}14`,
                    border: `1px solid ${stat.color}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                    boxShadow: isHov ? `0 0 20px ${stat.color}25` : "none",
                    transition: "all 0.3s ease",
                    animation: isHov ? "float-premium 4s ease-in-out infinite" : "none",
                  }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>

                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,4vw,3.5rem)",
                  fontWeight: 500, letterSpacing: 0, lineHeight: 1, marginBottom: 8,
                  background: `linear-gradient(135deg, ${stat.color}, var(--color-gold))`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {active ? <CountUp end={stat.value} duration={2.2} delay={i * 0.12} /> : 0}
                  {stat.suffix}
                </div>

                <div style={{
                  fontFamily: "var(--font-body)", fontSize: "0.82rem",
                  color: "var(--color-text-secondary)", fontWeight: 500, marginBottom: 14,
                }}>
                  {stat.label}
                </div>

                {/* Animated progress bar */}
                <div className="stat-bar-track">
                  <div
                    className={`stat-bar-fill ${active ? "animated" : ""}`}
                    style={{ "--bar-width": `${stat.barWidth}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES SECTION ─────────────────────────────────────────────────────────

const featuredServices = [
  {
    id: "web-development", icon: Globe, color: "#A37E36",
    gradient: "linear-gradient(135deg, rgba(163,126,54,0.15), rgba(196,161,94,0.05))",
    title: "Web Development",
    description: "Next.js, React, full-stack applications built for performance and scale.",
    features: ["React & Next.js", "SEO Optimized", "Blazing Fast"],
  },
  {
    id: "app-development", icon: Smartphone, color: "#6E5528",
    gradient: "linear-gradient(135deg, rgba(110,85,40,0.15), rgba(163,126,54,0.05))",
    title: "App Development",
    description: "Cross-platform mobile apps with Flutter and React Native that feel native.",
    features: ["iOS & Android", "Flutter / RN", "App Store Ready"],
  },
  {
    id: "ai-automation", icon: Bot, color: "#C4A15E",
    gradient: "linear-gradient(135deg, rgba(196,161,94,0.15), rgba(163,126,54,0.05))",
    title: "AI Automation",
    description: "Machine learning pipelines, intelligent workflows, and AI-powered systems.",
    features: ["ML Models", "Workflow Bots", "Data Analytics"],
  },
  {
    id: "enterprise-software", icon: Server, color: "#A37E36",
    gradient: "linear-gradient(135deg, rgba(163,126,54,0.15), rgba(110,85,40,0.05))",
    title: "Enterprise Software",
    description: "Custom ERP, CRM, HMS, and management systems for growing businesses.",
    features: ["ERP / CRM", "HMS / SMS", "Custom Systems"],
  },
  {
    id: "ui-ux-design", icon: Palette, color: "#C4A15E",
    gradient: "linear-gradient(135deg, rgba(196,161,94,0.15), rgba(163,126,54,0.05))",
    title: "UI/UX Design",
    description: "Awwwards-caliber interfaces and brand identities that captivate users.",
    features: ["Figma Design", "Brand Identity", "Motion Graphics"],
  },
  {
    id: "cloud-solutions", icon: Cloud, color: "#6E5528",
    gradient: "linear-gradient(135deg, rgba(110,85,40,0.15), rgba(196,161,94,0.05))",
    title: "Cloud & DevOps",
    description: "AWS, Docker, CI/CD pipelines and scalable infrastructure that never sleeps.",
    features: ["AWS / GCP", "Docker / K8s", "CI/CD Pipelines"],
  },
];

function ServiceCard({ service, index }: { service: typeof featuredServices[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "translateY(0) rotateX(0) rotateY(0) scale(1)";
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className="service-card-anim service-card-premium"
      data-cursor-text="EXPLORE"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        background: hovered ? service.gradient : "rgba(255,255,255,0.4)",
        border: `1px solid ${hovered ? service.color + "30" : "var(--color-border)"}`,
        borderRadius: 20, padding: "32px 28px",
        transition: "transform 0.5s var(--ease-out-expo), background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: hovered ? `0 24px 60px ${service.color}12, 0 0 0 1px ${service.color}15` : "0 4px 20px rgba(108,78,49,0.03)",
        backdropFilter: "blur(12px)",
        transformStyle: "preserve-3d",
        position: "relative", overflow: "hidden",
        cursor: "none",
      }}
    >
      {/* Glass reflection */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "40%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)",
        pointerEvents: "none", borderRadius: "20px 20px 0 0",
      }} />

      {/* Glow on hover */}
      {hovered && (
        <div style={{
          position: "absolute", top: "-30%", left: "-30%", width: "160%", height: "160%",
          background: `radial-gradient(circle at 50% 50%, ${service.color}08, transparent 60%)`,
          pointerEvents: "none",
        }} />
      )}

      {/* Icon */}
      <div
        data-magnetic
        style={{
          width: 56, height: 56, borderRadius: 14,
          background: `${service.color}14`,
          border: `1px solid ${service.color}22`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
          boxShadow: hovered ? `0 0 24px ${service.color}25` : "none",
          transition: "all 0.3s ease",
          animation: hovered ? "float-premium 5s ease-in-out infinite" : "none",
        }}
      >
        <Icon size={24} style={{ color: service.color }} />
      </div>

      <h3 style={{
        fontFamily: "var(--font-display)", fontWeight: 500,
        fontSize: "1.3rem", color: "var(--color-text-primary)",
        marginBottom: 10, letterSpacing: 0,
      }}>
        {service.title}
      </h3>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: "0.875rem",
        color: "var(--color-text-secondary)", lineHeight: 1.65, marginBottom: 20,
      }}>
        {service.description}
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
        {service.features.map((feat) => (
          <span key={feat} style={{
            padding: "4px 12px",
            background: `${service.color}10`, border: `1px solid ${service.color}20`,
            borderRadius: 100, fontSize: "0.72rem", fontWeight: 600,
            color: service.color, fontFamily: "var(--font-body)",
          }}>
            {feat}
          </span>
        ))}
      </div>

      <Link
        href={`/services/${service.id}`}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: "0.85rem", fontWeight: 600, color: service.color,
          textDecoration: "none", transition: "gap 0.2s ease",
          fontFamily: "var(--font-body)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.gap = "10px"; }}
        onMouseLeave={(e) => { e.currentTarget.style.gap = "6px"; }}
      >
        Learn more <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
    });

    tl.fromTo(badgeRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(headingRef.current, { opacity: 0, y: 35, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, "-=0.5")
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");

    const cards = gsap.utils.toArray(".service-card-anim");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.94, filter: "blur(10px)" },
      {
        opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
        stagger: 0.1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      }
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "clamp(80px,10vw,140px) 0", position: "relative" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(163,126,54,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-zentrix" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div ref={badgeRef} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
            border: "1px solid rgba(163,126,54,0.25)", borderRadius: 100,
            marginBottom: 20, background: "rgba(163,126,54,0.06)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-violet-light)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-violet-light)" }}>
              Our Expertise
            </span>
          </div>

          <h2 ref={headingRef} style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4.2rem)",
            fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.05,
            letterSpacing: 0, marginBottom: 16,
          }}>
            Services That{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--color-violet) 0%, var(--color-gold) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Transform
            </span>
          </h2>

          <p ref={descRef} style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem,2vw,1.1rem)",
            color: "var(--color-text-secondary)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75,
          }}>
            From startup MVPs to enterprise platforms — we craft technology that drives growth, automates complexity, and creates experiences users love.
          </p>
        </div>

        <div ref={gridRef} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20, marginBottom: 48,
        }}>
          {featuredServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/services"
            data-magnetic
            data-cursor-text="ALL SERVICES"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 34px", background: "transparent",
              border: "1px solid var(--color-border)", borderRadius: 100,
              fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9375rem",
              color: "var(--color-text-primary)", textDecoration: "none",
              transition: "all 0.3s var(--ease-out-expo)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(163,126,54,0.06)"; e.currentTarget.style.borderColor = "rgba(163,126,54,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--color-border)"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Explore All 22 Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED WORKS SECTION ───────────────────────────────────────────────────

const featuredProjects = [
  {
    id: "avs-engg-college",
    title: "AVS Engineering College Portal",
    category: "Education",
    description: "Comprehensive web infrastructure for AVS Engineering College, supporting academic notices, placement portals, online admissions, and department sites.",
    link: "https://www.avsenggcollege.ac.in/",
    image: "/work_avs_engg.png",
    color: "#A37E36",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    metrics: ["Load Time -75%", "Admin Speed 3x", "100% Mobile"],
  },
  {
    id: "sakthi-kailash-college",
    title: "Sakthi Kailash Women&apos;s College",
    category: "Education",
    description: "Custom institutional website for Sakthi Kailash Women's College, highlighting courses, placement records, achievements, and departments.",
    link: "https://www.sakthikailashcollege.org/",
    image: "/work_sakthi_kailash.png",
    color: "#C4A15E",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: ["Traffic +180%", "Speed 95%", "Engage 99%"],
  },
  {
    id: "avs-college-omalur",
    title: "AVS College of Arts & Science",
    category: "Education",
    description: "Official institutional web platform and student portal for AVS College of Arts & Science, providing access to academic resources and admissions.",
    link: "https://www.avscollegeomalur.edu.in/",
    image: "/work_avs_omalur.png",
    color: "#6E5528",
    tags: ["Next.js", "TypeScript", "Node.js"],
    metrics: ["98% Performance", "2.5x Inbound Rise", "0% Downtime"],
  },
];

function WorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
    });

    tl.fromTo(badgeRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(headingRef.current, { opacity: 0, y: 35, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, "-=0.5");

    const rows = gsap.utils.toArray(".project-row-anim");

    // Clip-path cinematic reveals
    rows.forEach((row: any) => {
      gsap.fromTo(
        row,
        { clipPath: "inset(12% 8% round 32px)", scale: 0.94, opacity: 0.8 },
        {
          clipPath: "inset(0% 0% round 24px)", scale: 1, opacity: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 90%", end: "top 60%", scrub: true },
        }
      );

      // Parallax layers within rows
      const visual = row.querySelector(".project-visual-anim");
      const content = row.querySelector(".project-content-anim");
      if (visual && content) {
        gsap.fromTo(visual, { y: 30 }, { y: -30, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(content, { y: -20 }, { y: 20, ease: "none", scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } });
      }
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "clamp(80px,10vw,140px) 0", position: "relative" }}>
      <div className="container-zentrix">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div ref={badgeRef} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
            border: "1px solid rgba(163,126,54,0.25)", borderRadius: 100,
            marginBottom: 20, background: "rgba(163,126,54,0.06)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-gold)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-gold)" }}>
              Featured Work
            </span>
          </div>

          <h2 ref={headingRef} style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4.2rem)",
            fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.05,
            letterSpacing: 0,
          }}>
            Real Results,{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--color-gold), var(--color-violet))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Real Impact
            </span>
          </h2>
        </div>

        <div ref={gridRef} style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {featuredProjects.map((project, i) => (
            <div
              key={project.id}
              className="project-row-anim"
              data-cursor-text="VIEW STUDY"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
                gap: 0,
                border: "1px solid var(--color-border)",
                borderRadius: 24, overflow: "hidden",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${project.color}30`;
                e.currentTarget.style.boxShadow = `0 24px 60px ${project.color}10`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Content side */}
              <div className="project-content-anim" style={{ padding: "clamp(24px,5vw,52px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ marginBottom: 12 }}>
                  <span style={{
                    padding: "4px 12px",
                    background: `${project.color}12`, border: `1px solid ${project.color}25`,
                    borderRadius: 100, fontSize: "0.72rem", fontWeight: 600,
                    color: project.color, fontFamily: "var(--font-body)",
                  }}>
                    {project.category}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: "var(--font-display)", fontWeight: 500,
                  fontSize: "clamp(1.5rem,3vw,2.3rem)", color: "var(--color-text-primary)",
                  lineHeight: 1.1, letterSpacing: 0, marginBottom: 16,
                }}
                  dangerouslySetInnerHTML={{ __html: project.title }}
                />

                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.75, marginBottom: 24 }}>
                  {project.description}
                </p>

                <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                  {project.metrics.map((m) => (
                    <div key={m} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Check size={13} style={{ color: project.color }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{m}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                  {project.tags.map((tag) => (
                    <span key={tag} style={{
                      padding: "4px 12px", background: "var(--color-surface)",
                      border: "1px solid var(--color-border)", borderRadius: 100,
                      fontSize: "0.72rem", color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.link || `/works/${project.id}`}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontSize: "0.875rem", fontWeight: 600, color: project.color,
                    textDecoration: "none", width: "fit-content",
                    fontFamily: "var(--font-body)",
                    transition: "gap 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.gap = "12px"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.gap = "8px"; }}
                >
                  View Live Site <ExternalLink size={14} />
                </Link>
              </div>

              {/* Visual side */}
              <div
                className="project-visual-anim"
                style={{
                  minHeight: 340, position: "relative", overflow: "hidden",
                  order: i % 2 === 0 ? 1 : -1,
                  borderLeft: i % 2 === 0 ? "1px solid var(--color-border)" : "none",
                  borderRight: i % 2 !== 0 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title.replace(/&apos;/g, "'")}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    position: "absolute", inset: 0,
                    transition: "transform 0.8s var(--ease-out-expo), filter 0.5s ease",
                    filter: "brightness(0.92)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.filter = "brightness(1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(0.92)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(26,22,18,0.02), rgba(26,22,18,0.15))", pointerEvents: "none" }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <Link
            href="/works"
            data-magnetic
            data-cursor-text="ALL PROJECTS"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 36px",
              background: "linear-gradient(135deg, var(--color-violet-light), var(--color-violet))",
              color: "#fff", borderRadius: 100,
              fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 16px 48px rgba(163,126,54,0.28)",
              transition: "all 0.4s var(--ease-out-expo)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(163,126,54,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(163,126,54,0.28)"; }}
          >
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS SECTION ──────────────────────────────────────────────────────────

const processSteps = [
  { step: "01", title: "Discovery", desc: "We dive deep into your vision, goals, and requirements to build a strategic roadmap.", icon: "🔍", color: "#6C4E31" },
  { step: "02", title: "Design", desc: "Awwwards-caliber UI/UX design — wireframes, prototypes, and pixel-perfect visuals.", icon: "✦", color: "#B8934B" },
  { step: "03", title: "Engineering", desc: "Clean, scalable code with modern architectures, CI/CD pipelines, and comprehensive testing.", icon: "⚡", color: "#A37E36" },
  { step: "04", title: "Launch", desc: "Smooth deployment with monitoring, performance optimization, and post-launch support.", icon: "🚀", color: "#C4A15E" },
];

function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepsGridRef = useRef<HTMLDivElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: container, start: "top 80%", toggleActions: "play none none reverse" },
    });

    tl.fromTo(badgeRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(headingRef.current, { opacity: 0, y: 35, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }, "-=0.5");

    const steps = gsap.utils.toArray(".process-step-anim");
    gsap.fromTo(
      steps,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: stepsGridRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      }
    );

    // SVG path draw
    const path = linePathRef.current;
    if (path) {
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0, ease: "none",
        scrollTrigger: { trigger: stepsGridRef.current, start: "top 60%", end: "bottom 80%", scrub: true },
      });

      // Step glow activation
      steps.forEach((step: any, idx) => {
        const circle = step.querySelector(".step-circle");
        gsap.to(circle, {
          borderColor: processSteps[idx].color,
          backgroundColor: `${processSteps[idx].color}15`,
          boxShadow: `0 0 30px ${processSteps[idx].color}30`,
          duration: 0.5,
          scrollTrigger: { trigger: step, start: "top 65%", toggleActions: "play none none reverse" },
        });
      });
    }

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        padding: "clamp(80px,10vw,140px) 0",
        background: "var(--color-bg-secondary)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 800, height: 400,
        background: "radial-gradient(ellipse, rgba(163,126,54,0.06) 0%, transparent 70%)",
        pointerEvents: "none", filter: "blur(40px)",
        animation: "aurora-float-2 12s ease-in-out infinite",
      }} />

      <div className="container-zentrix" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div ref={badgeRef} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
            border: "1px solid rgba(16,185,129,0.25)", borderRadius: 100,
            marginBottom: 20, background: "rgba(16,185,129,0.06)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-success)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-success)" }}>
              How We Work
            </span>
          </div>

          <h2 ref={headingRef} style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4.2rem)",
            fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.05, letterSpacing: 0,
          }}>
            Our Development Process
          </h2>
        </div>

        <div ref={stepsGridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 2, position: "relative" }}>
          {/* Animated SVG connector */}
          <div style={{ position: "absolute", top: 60, left: "8%", right: "8%", height: 4, zIndex: 0, pointerEvents: "none" }}>
            <svg width="100%" height="4" fill="none" style={{ overflow: "visible" }}>
              <path
                ref={linePathRef}
                d="M 0 2 L 1000 2"
                stroke="url(#process-grad)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <defs>
                <linearGradient id="process-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-violet-light)" />
                  <stop offset="50%" stopColor="var(--color-violet)" />
                  <stop offset="100%" stopColor="var(--color-gold)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {processSteps.map((step, i) => (
            <div
              key={step.step}
              className="process-step-anim"
              data-cursor-text={step.title.toUpperCase()}
              style={{ padding: "32px 24px", textAlign: "center", position: "relative", zIndex: 1 }}
            >
              <div
                className="step-circle"
                style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "var(--color-surface)",
                  border: "2px solid var(--color-border)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px", position: "relative", transition: "all 0.4s ease",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>{step.icon}</span>
                <span style={{
                  position: "absolute", top: -8, right: -8,
                  width: 24, height: 24, borderRadius: "50%",
                  background: step.color, display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700, color: "#fff",
                }}>
                  {step.step}
                </span>
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)", fontWeight: 500,
                fontSize: "1.25rem", color: "var(--color-text-primary)", marginBottom: 10,
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.875rem",
                color: "var(--color-text-secondary)", lineHeight: 1.65,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ─────────────────────────────────────────────────────

const testimonials = [
  { id: 1, name: "Arun Kumar", role: "CEO", company: "HealthFirst Clinic", text: "Zentrix delivered an incredible HMS that transformed our entire hospital operations. The attention to detail and quality is extraordinary.", rating: 5, avatar: "A", color: "#A37E36" },
  { id: 2, name: "Priya Sharma", role: "Director", company: "Excel School", text: "The school management system they built is world-class. Parents, teachers, and admin all love it. Highly recommend Zentrix!", rating: 5, avatar: "P", color: "#6E5528" },
  { id: 3, name: "Rajesh Nair", role: "Founder", company: "AutoFlow Solutions", text: "Their AI automation suite cut our manual work by 80%. The team is incredibly professional and delivered ahead of schedule.", rating: 5, avatar: "R", color: "#C4A15E" },
  { id: 4, name: "Kavitha Devi", role: "CTO", company: "RetailPro", text: "Best web development agency we've worked with. The website they built for us drives real business results every single day.", rating: 5, avatar: "K", color: "#A37E36" },
];

function TestimonialsSection() {
  const { ref, inView } = useInViewObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <section style={{ padding: "clamp(80px,10vw,140px) 0", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(163,126,54,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container-zentrix">
        <div ref={ref} style={{ textAlign: "center", marginBottom: 60 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
              border: "1px solid rgba(245,158,11,0.3)", borderRadius: 100,
              marginBottom: 20, background: "rgba(245,158,11,0.06)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F59E0B" }}>
              Client Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,5vw,4.2rem)",
              fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.05, letterSpacing: 0,
            }}
          >
            Trusted by Visionaries
          </motion.h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="testimonial-glass"
              style={{ padding: 32, position: "relative", overflow: "hidden" }}
            >
              {/* Glass shimmer */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "35%",
                background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
                pointerEvents: "none",
              }} />

              <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                {Array(t.rating).fill(0).map((_, si) => (
                  <Star key={si} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                ))}
              </div>

              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.9375rem",
                color: "var(--color-text-muted)", lineHeight: 1.75,
                marginBottom: 24, fontStyle: "italic",
              }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: `${t.color}18`, border: `1px solid ${t.color}28`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "1.1rem",
                  color: t.color, flexShrink: 0,
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {t.role} @ {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link
            href="/contact#reviews"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-muted)",
              textDecoration: "none", fontFamily: "var(--font-body)",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; }}
          >
            Read all reviews <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── INNOVATION SECTION ───────────────────────────────────────────────────────

function InnovationSection() {
  const { ref, inView } = useInViewObserver({ threshold: 0.1, triggerOnce: true });

  const innovations = [
    { icon: "🤖", title: "AI Research", desc: "Computer vision, NLP, and predictive models for real-world applications.", color: "#6C4E31" },
    { icon: "⚙️", title: "IoT & Automation", desc: "Smart systems connecting physical devices to intelligent software platforms.", color: "#A37E36" },
    { icon: "🏥", title: "Healthcare Innovation", desc: "Experimental apps revolutionizing patient care and medical workflows.", color: "#10B981" },
    { icon: "🌐", title: "Future Ideas", desc: "Internal products and experimental concepts pushing technology boundaries.", color: "#C4A15E" },
  ];

  return (
    <section style={{ padding: "clamp(80px,10vw,140px) 0", background: "var(--color-bg)", position: "relative", overflow: "hidden" }}>
      {/* AI Grid */}
      <div className="ai-grid-animated" />

      <div className="container-zentrix" style={{ position: "relative", zIndex: 1 }}>
        <div ref={ref}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "clamp(300px,45%,560px) 1fr",
            gap: "clamp(40px,6vw,80px)", alignItems: "center",
          }}>
            {/* Left content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
                  border: "1px solid rgba(163,126,54,0.3)", borderRadius: 100,
                  marginBottom: 24, background: "rgba(163,126,54,0.08)",
                }}
              >
                <FlaskConical size={14} style={{ color: "#B8934B" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8934B" }}>
                  Innovation Lab
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3.8rem)",
                  fontWeight: 500, color: "var(--color-text-primary)", lineHeight: 1.05,
                  letterSpacing: 0, marginBottom: 20,
                }}
              >
                Where the Future
                <br />
                <span style={{
                  background: "linear-gradient(135deg, #6C4E31, #B8934B, #C4A15E)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Gets Built
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
                style={{
                  fontFamily: "var(--font-body)", fontSize: "0.9375rem",
                  color: "var(--color-text-muted)", lineHeight: 1.75,
                  marginBottom: 32, maxWidth: 480,
                }}
              >
                Our Innovation Lab is where we experiment with emerging technologies — from computer vision to IoT automation — creating tomorrow&apos;s solutions today.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                style={{ display: "flex", gap: 24, marginBottom: 32 }}
              >
                {[{ val: "5+", label: "Active Projects", color: "#B8934B" }, { val: "10+", label: "Technologies", color: "#A37E36" }].map((item) => (
                  <div key={item.label} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 500, color: item.color }}>{item.val}</div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{item.label}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/innovation-lab"
                  data-magnetic
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 28px",
                    background: "linear-gradient(135deg, #6C4E31, #B8934B)",
                    color: "#fff", borderRadius: 100,
                    fontFamily: "var(--font-body)", fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 16px 48px rgba(163,126,54,0.3)",
                    transition: "all 0.4s var(--ease-out-expo)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 24px 60px rgba(163,126,54,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(163,126,54,0.3)"; }}
                >
                  <FlaskConical size={16} />
                  Explore the Lab
                </Link>
              </motion.div>
            </div>

            {/* Right: innovation cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {innovations.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "28px 24px",
                    background: `${item.color}07`, border: `1px solid ${item.color}18`,
                    borderRadius: 20, transition: "all 0.35s var(--ease-out-expo)",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${item.color}12`;
                    e.currentTarget.style.borderColor = `${item.color}28`;
                    e.currentTarget.style.transform = "translateY(-6px) scale(1.01)";
                    e.currentTarget.style.boxShadow = `0 20px 50px ${item.color}12`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${item.color}07`;
                    e.currentTarget.style.borderColor = `${item.color}18`;
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: 12 }}>{item.icon}</div>
                  <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "1.1rem", color: "var(--color-text-primary)", marginBottom: 8 }}>
                    {item.title}
                  </h4>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .innovation-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── CTA SECTION ──────────────────────────────────────────────────────────────

function CTASection() {
  const { ref, inView } = useInViewObserver({ threshold: 0.2, triggerOnce: true });

  return (
    <section style={{ padding: "clamp(80px,10vw,140px) 0", position: "relative", overflow: "hidden", background: "var(--color-bg)" }}>
      {/* Aurora background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse at 30% 50%, rgba(163,126,54,0.14) 0%, transparent 60%),
                     radial-gradient(ellipse at 70% 50%, rgba(110,85,40,0.09) 0%, transparent 60%)`,
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: 600, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(163,126,54,0.08) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
        animation: "aurora-float-1 14s ease-in-out infinite",
      }} />

      <div className="container-zentrix" style={{ position: "relative", zIndex: 2 }}>
        <div ref={ref} style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 20px",
              border: "1px solid rgba(163,126,54,0.3)", borderRadius: 100,
              marginBottom: 32, background: "rgba(163,126,54,0.08)",
            }}>
              <Award size={14} style={{ color: "#B8934B" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", fontWeight: 600, color: "#B8934B" }}>
                Premium Quality Guaranteed
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem,6vw,5.8rem)",
              fontWeight: 500, lineHeight: 0.95, letterSpacing: 0, marginBottom: 24,
            }}>
              <span style={{ color: "var(--color-text-primary)" }}>Ready to Build</span>
              <br />
              <span style={{
                background: "linear-gradient(135deg, #6C4E31, #A37E36, #C4A15E)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Something Legendary?
              </span>
            </h2>

            <p style={{
              fontFamily: "var(--font-body)", fontSize: "clamp(0.9rem,2vw,1.15rem)",
              color: "var(--color-text-muted)", lineHeight: 1.75, marginBottom: 48,
            }}>
              From a simple website to a complex enterprise system — we bring your vision to life with premium quality, on time, every time. Let&apos;s create something extraordinary together.
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}>
              <Link
                href="/contact"
                data-magnetic
                data-cursor-text="START"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "18px 48px",
                  background: "linear-gradient(135deg, #6C4E31, #A37E36, #C4A15E)",
                  backgroundSize: "200% auto", color: "#fff", borderRadius: 100,
                  fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 28px 80px rgba(163,126,54,0.38)",
                  transition: "all 0.4s var(--ease-out-expo)",
                  animation: "holographic-shift 5s ease infinite",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 36px 100px rgba(163,126,54,0.5)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 28px 80px rgba(163,126,54,0.38)"; }}
              >
                <Zap size={18} />
                Start Your Project Now
              </Link>
              <Link
                href="/works"
                data-magnetic
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "17px 48px",
                  background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)",
                  border: "1px solid var(--color-border-hover)",
                  color: "var(--color-text-primary)", borderRadius: 100,
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem",
                  textDecoration: "none", transition: "all 0.3s var(--ease-out-expo)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(163,126,54,0.06)"; e.currentTarget.style.borderColor = "rgba(163,126,54,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "var(--color-border-hover)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                See Our Portfolio
              </Link>
            </div>

            {/* Trust row */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "clamp(16px,3vw,36px)", flexWrap: "wrap",
            }}>
              {[
                { icon: "⚡", text: "Fast Delivery" },
                { icon: "🛡️", text: "Quality Guaranteed" },
                { icon: "🤝", text: "Post-launch Support" },
                { icon: "📱", text: "Mobile-first" },
              ].map((item) => (
                <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <StatsSection />
      <ServicesSection />
      <WorksSection />
      <ProcessSection />
      <TestimonialsSection />
      <InnovationSection />
      <CTASection />
    </>
  );
}
