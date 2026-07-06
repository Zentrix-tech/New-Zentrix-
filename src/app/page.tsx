"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CountUp from "react-countup";
import { useInView as useInViewObserver } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import {
  ArrowRight, Zap, Globe, Code2, Smartphone, Bot, Palette,
  ChevronRight, Star, Play, Check, ExternalLink, TrendingUp,
  Shield, Rocket, Award, Users, Briefcase, FlaskConical,
  Layers, Server, Database, Cloud
} from "lucide-react";
import { siteConfig } from "@/lib/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── HERO SECTION ───────────────────────────────────────────────────────────

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; color: string; life: number; maxLife: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["rgba(184,147,75,", "rgba(108,78,49,", "rgba(108,78,49,", "rgba(108,78,49,"];

    const spawnParticle = () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      });
    };

    for (let i = 0; i < 120; i++) spawnParticle();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.05) spawnParticle();

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

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `${p.color}${alpha * 0.3})`);
        gradient.addColorStop(1, `${p.color}0)`);
        ctx.fillStyle = gradient;
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(184,147,75,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const techStack = ["React & Next.js", "AI & Machine Learning", "Flutter & React Native", "Node.js & Python", "Cloud & DevOps"];

  useEffect(() => {
    // Entrance animations timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(badgeRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo([title1Ref.current, title2Ref.current], { opacity: 0, y: 70, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.12 }, "-=0.7")
      .fromTo(typewriterRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.8")
      .fromTo(subheadlineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
      .fromTo(trustRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.6");

    // Scroll-bound parallax effect on content
    const parallax = gsap.to(contentRef.current, {
      y: 130,
      opacity: 0.15,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tl.kill();
      parallax.scrollTrigger?.kill();
      parallax.kill();
    };
  }, []);

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
      {/* Particle field */}
      <ParticleField />

      {/* Gradient mesh background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 15% 40%, rgba(184, 147, 75, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 85% 20%, rgba(108, 78, 49, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(108, 78, 49, 0.06) 0%, transparent 40%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          paddingTop: "120px",
          paddingBottom: "80px",
        }}
        className="container-zentrix"
      >
        {/* Status badge */}
        {/* Status badge */}
        <div
          ref={badgeRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            background: "rgba(184, 147, 75, 0.08)",
            border: "1px solid rgba(184, 147, 75, 0.2)",
            borderRadius: "100px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-success)",
              boxShadow: "0 0 8px rgba(16,185,129,0.8)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            Now accepting projects — {new Date().getFullYear()}
          </span>
        </div>

        {/* Main headline */}
        <div style={{ perspective: "1000px" }}>
          <h1
            ref={title1Ref}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6.5vw, 6.2rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "0",
              color: "var(--color-text-primary)",
              marginBottom: "8px",
            }}
          >
            We Engineer
          </h1>
          <h1
            ref={title2Ref}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6.5vw, 6.2rem)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "0",
              background: "linear-gradient(135deg, var(--color-violet) 0%, var(--color-violet-light) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "24px",
            }}
          >
            Digital Futures
          </h1>
        </div>

        {/* Typewriter */}
        <div
          ref={typewriterRef}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
            color: "var(--color-cyan)",
            marginBottom: "20px",
            minHeight: "2.5em",
            lineHeight: "1.4",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "var(--color-text-muted)" }}>// Building with</span>
          <TypeAnimation
            sequence={techStack.flatMap((t) => [t, 2000])}
            wrapper="span"
            repeat={Infinity}
            style={{ color: "var(--color-cyan)", fontWeight: 500 }}
          />
        </div>

        <p
          ref={subheadlineRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1.05rem, 2.5vw, 1.25rem)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.8,
            maxWidth: "680px",
            margin: "0 auto 48px",
          }}
        >
          Premium software engineering from Salem — delivering enterprise systems, AI automation,
          mobile apps, and digital experiences that{" "}
          <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>redefine what&apos;s possible</span>.
        </p>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            gap: "18px",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "64px",
          }}
        >
          <Link
            href="/contact"
            data-magnetic
            data-cursor-text="START"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 40px",
              background: "linear-gradient(135deg, var(--color-violet), var(--color-violet-light))",
              color: "#fff",
              borderRadius: "100px",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 20px 50px rgba(184, 147, 75, 0.25)",
              transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <Zap size={18} />
            Start Your Project
          </Link>
          <Link
            href="/works"
            data-magnetic
            data-cursor-text="EXPLORE"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "15px 40px",
              background: "transparent",
              color: "var(--color-text-primary)",
              borderRadius: "100px",
              border: "1px solid var(--color-border)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <Play size={16} fill="currentColor" />
            View Our Work
          </Link>
        </div>

        {/* Trust indicators */}
        <div
          ref={trustRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(24px, 4vw, 56px)",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "7+", label: "Projects Delivered" },
            { value: "5+", label: "Innovation Projects" },
            { value: "100%", label: "Client Satisfaction" },
            { value: "24/7", label: "Support Available" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  background: "linear-gradient(135deg, var(--color-violet-light), var(--color-cyan))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-text-muted)", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}>
          Scroll to explore
        </span>
        <div
          style={{
            width: 24,
            height: 40,
            border: "1.5px solid var(--color-border)",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "center",
            paddingTop: "6px",
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 4,
              height: 8,
              background: "linear-gradient(180deg, var(--color-violet), transparent)",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── MARQUEE TECH SECTION ────────────────────────────────────────────────────

const techItems = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "Flutter",
  "TensorFlow", "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker",
  "Kubernetes", "GraphQL", "React Native", "Figma", "Three.js", "Prisma",
  "Tailwind CSS", "GSAP", "Framer Motion", "Firebase", "Supabase", "Vercel",
];
// Pre-computed reversed array — never mutate techItems at runtime (causes SSR/client hydration mismatch)
const techItemsReversed = [...techItems].reverse();
// Pre-duplicated arrays for seamless infinite marquee
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
    let xPercent2 = 0;
    let direction = -1;
    let speedFactor = 1;

    const animate = () => {
      if (xPercent1 <= -50) xPercent1 = 0;
      if (xPercent1 >= 0) xPercent1 = -50;
      if (xPercent2 <= -50) xPercent2 = 0;
      if (xPercent2 >= 0) xPercent2 = -50;

      xPercent1 += 0.07 * direction * speedFactor;
      xPercent2 += 0.07 * -direction * speedFactor;

      gsap.set(track1, { xPercent: xPercent1 });
      gsap.set(track2, { xPercent: xPercent2 });

      speedFactor += (1 - speedFactor) * 0.05; // smooth deceleration

      requestRef.current = requestAnimationFrame(animate);
    };

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        direction = self.direction === 1 ? -1 : 1;
        const velocity = Math.abs(self.getVelocity() / 300);
        speedFactor = Math.min(Math.max(velocity, 1), 6);
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
        padding: "48px 0",
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "200px",
          background: "linear-gradient(90deg, var(--color-bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "200px",
          background: "linear-gradient(-90deg, var(--color-bg), transparent)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Track 1 */}
      <div style={{ display: "flex", gap: "0", marginBottom: "20px", overflow: "hidden" }}>
        <div
          ref={track1Ref}
          style={{ display: "flex", gap: "0", whiteSpace: "nowrap" }}
        >
          {marqueeTrack1.map((tech, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 28px",
                margin: "0 6px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "100px",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-violet)", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "var(--color-text-secondary)",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Track 2 (reverse) */}
      <div style={{ display: "flex", gap: "0", overflow: "hidden" }}>
        <div
          ref={track2Ref}
          style={{ display: "flex", gap: "0", whiteSpace: "nowrap" }}
        >
          {marqueeTrack2.map((tech, i) => (
            <div
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 28px",
                margin: "0 6px",
                background: "rgba(108, 78, 49, 0.02)",
                border: "1px solid rgba(108, 78, 49, 0.1)",
                borderRadius: "100px",
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-cyan)", flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "var(--color-text-secondary)",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SERVICES SECTION ────────────────────────────────────────────────────────

const featuredServices = [
  {
    id: "web-development",
    icon: Globe,
    color: "#6C4E31",
    gradient: "linear-gradient(135deg, rgba(184,147,75,0.15), rgba(108,78,49,0.05))",
    title: "Web Development",
    description: "Next.js, React, full-stack applications built for performance and scale.",
    features: ["React & Next.js", "SEO Optimized", "Blazing Fast"],
  },
  {
    id: "app-development",
    icon: Smartphone,
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, rgba(108,78,49,0.15), rgba(34,211,238,0.05))",
    title: "App Development",
    description: "Cross-platform mobile apps with Flutter and React Native that feel native.",
    features: ["iOS & Android", "Flutter / RN", "App Store Ready"],
  },
  {
    id: "ai-automation",
    icon: Bot,
    color: "#B8934B",
    gradient: "linear-gradient(135deg, rgba(108,78,49,0.15), rgba(184,147,75,0.05))",
    title: "AI Automation",
    description: "Machine learning pipelines, intelligent workflows, and AI-powered systems.",
    features: ["ML Models", "Workflow Bots", "Data Analytics"],
  },
  {
    id: "enterprise-software",
    icon: Server,
    color: "#EC4899",
    gradient: "linear-gradient(135deg, rgba(108,78,49,0.15), rgba(244,114,182,0.05))",
    title: "Enterprise Software",
    description: "Custom ERP, CRM, HMS, and management systems for growing businesses.",
    features: ["ERP / CRM", "HMS / SMS", "Custom Systems"],
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(251,191,36,0.05))",
    title: "UI/UX Design",
    description: "Awwwards-caliber interfaces and brand identities that captivate users.",
    features: ["Figma Design", "Brand Identity", "Motion Graphics"],
  },
  {
    id: "cloud-solutions",
    icon: Cloud,
    color: "#10B981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(52,211,153,0.05))",
    title: "Cloud & DevOps",
    description: "AWS, Docker, CI/CD pipelines and scalable infrastructure that never sleeps.",
    features: ["AWS / GCP", "Docker / K8s", "CI/CD Pipelines"],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof featuredServices)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className="service-card-anim"
      data-cursor-text="EXPLORE"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? service.gradient : "transparent",
        border: `1px solid ${hovered ? service.color + "30" : "var(--color-border)"}`,
        borderRadius: "20px",
        padding: "32px",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 20px 60px ${service.color}12` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Spotlight */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            width: "200%",
            height: "200%",
            background: `radial-gradient(circle at 50% 50%, ${service.color}08, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Icon */}
      <div
        data-magnetic
        style={{
          width: 56,
          height: 56,
          borderRadius: "14px",
          background: `${service.color}15`,
          border: `1px solid ${service.color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          transition: "all 0.3s ease",
          boxShadow: hovered ? `0 0 20px ${service.color}20` : "none",
        }}
      >
        <Icon size={24} style={{ color: service.color }} />
      </div>

      <h3
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: "1.2rem",
          color: "var(--color-text-primary)",
          marginBottom: "10px",
          letterSpacing: "-0.01em",
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "var(--color-text-secondary)",
          lineHeight: 1.6,
          marginBottom: "20px",
        }}
      >
        {service.description}
      </p>

      {/* Features */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
        {service.features.map((feat) => (
          <span
            key={feat}
            style={{
              padding: "4px 12px",
              background: `${service.color}10`,
              border: `1px solid ${service.color}20`,
              borderRadius: "100px",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: service.color,
            }}
          >
            {feat}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={`/services/${service.id}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-body)",
          fontSize: "0.85rem",
          fontWeight: 600,
          color: service.color,
          textDecoration: "none",
          transition: "gap 0.2s ease",
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

    // Header reveal
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    headerTl
      .fromTo(badgeRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.45")
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55");

    // Grid cards stagger reveal with velocity/direction sensitivity
    const cards = gsap.utils.toArray(".service-card-anim");
    const cardsAnim = gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.96, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        stagger: 0.08,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      headerTl.kill();
      cardsAnim.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "clamp(80px, 10vw, 140px) 0", position: "relative" }}>
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(184,147,75,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-zentrix" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            ref={badgeRef}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              border: "1px solid rgba(184,147,75,0.25)",
              borderRadius: "100px",
              marginBottom: "20px",
              background: "rgba(184,147,75,0.06)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-violet-light)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-violet-light)" }}>
              Our Expertise
            </span>
          </div>

          <h2
            ref={headingRef}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Services That{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-violet) 0%, var(--color-violet-light) 50%, var(--color-cyan) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Transform
            </span>
          </h2>

          <p
            ref={descRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              color: "var(--color-text-secondary)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            From startup MVPs to enterprise platforms — we craft technology that drives growth, automates complexity, and creates experiences users love.
          </p>
        </div>

        {/* Services grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
            marginBottom: "48px",
          }}
        >
          {featuredServices.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* View all */}
        <div style={{ textAlign: "center" }}>
          <Link
            href="/services"
            data-magnetic
            data-cursor-text="ALL SERVICES"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              background: "transparent",
              border: "1px solid var(--color-border)",
              borderRadius: "100px",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              color: "var(--color-text-primary)",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-surface)";
              e.currentTarget.style.borderColor = "var(--color-text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          >
            Explore All 22 Services <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── STATS SECTION ──────────────────────────────────────────────────────────

function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const stats = [
    { value: 7, suffix: "+", label: "Projects Completed", icon: Briefcase, color: "#8B5CF6" },
    { value: 5, suffix: "+", label: "Innovation Projects", icon: FlaskConical, color: "#06B6D4" },
    { value: 100, suffix: "%", label: "Client Satisfaction", icon: Star, color: "#F59E0B" },
    { value: 99, suffix: ".9%", label: "Uptime Guarantee", icon: Shield, color: "#10B981" },
  ];

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => setActive(true),
      onLeaveBack: () => setActive(false),
    });

    const items = gsap.utils.toArray(".stat-item-anim");
    const anim = gsap.fromTo(items, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        }
      }
    );

    return () => {
      trigger.kill();
      anim.kill();
    };
  }, []);

  return (
    <section
      style={{
        padding: "clamp(60px, 8vw, 100px) 0",
        background: "linear-gradient(135deg, rgba(184,147,75,0.03) 0%, rgba(108,78,49,0.02) 100%)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container-zentrix" ref={containerRef}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(24px, 4vw, 48px)",
          }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="stat-item-anim"
                style={{ textAlign: "center" }}
              >
                <div
                  data-magnetic
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                    background: `${stat.color}15`,
                    border: `1px solid ${stat.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <Icon size={22} style={{ color: stat.color }} />
                </div>
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: "8px",
                    background: "linear-gradient(135deg, var(--color-text-primary), var(--color-text-secondary))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {active ? (
                    <CountUp end={stat.value} duration={2} delay={i * 0.15} />
                  ) : (
                    0
                  )}
                  {stat.suffix}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURED WORKS SECTION ──────────────────────────────────────────────────

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
    title: "Sakthi Kailash Women's College",
    category: "Education",
    description: "Custom institutional website for Sakthi Kailash Women's College, highlighting courses, placement records, achievements, and departments.",
    link: "https://www.sakthikailashcollege.org/",
    image: "/work_sakthi_kailash.png",
    color: "#EC4899",
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
    color: "#8B5CF6",
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

    // Header reveal
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    headerTl
      .fromTo(badgeRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.45");

    // Project cards stagger reveal
    const rows = gsap.utils.toArray(".project-row-anim");
    const gridAnim = gsap.fromTo(
      rows,
      { opacity: 0, y: 80, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Premium Obys-style rounded Reveal Clip-Path mask on scroll
    const maskAnimations: gsap.core.Tween[] = [];
    rows.forEach((row: any) => {
      const anim = gsap.fromTo(row, 
        { 
          clipPath: "inset(12% 8% round 32px)",
          scale: 0.94,
          opacity: 0.8
        }, 
        {
          clipPath: "inset(0% 0% round 24px)",
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            end: "top 60%",
            scrub: true,
          }
        }
      );
      maskAnimations.push(anim);
    });

    // Parallax on visual elements vs content elements in rows
    rows.forEach((row: any) => {
      const visual = row.querySelector(".project-visual-anim");
      const content = row.querySelector(".project-content-anim");
      
      if (visual && content) {
        gsap.fromTo(visual, { y: 25 }, {
          y: -25,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
        
        gsap.fromTo(content, { y: -25 }, {
          y: 25,
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    });

    return () => {
      headerTl.kill();
      gridAnim.kill();
      maskAnimations.forEach(a => a.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: "clamp(80px, 10vw, 140px) 0", position: "relative" }}>
      <div className="container-zentrix">
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            ref={badgeRef}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              border: "1px solid rgba(108, 78, 49, 0.25)",
              borderRadius: "100px",
              marginBottom: "20px",
              background: "rgba(108, 78, 49, 0.06)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-cyan)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-cyan)" }}>
              Featured Work
            </span>
          </div>

          <h2
            ref={headingRef}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Real Results,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-cyan), var(--color-cyan-light))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Real Impact
            </span>
          </h2>
        </div>

        {/* Projects */}
        <div ref={gridRef} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {featuredProjects.map((project, i) => (
            <div
              key={project.id}
              className="project-row-anim"
              data-cursor-text="VIEW STUDY"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))",
                gap: "0",
                background: "transparent",
                border: "1px solid var(--color-border)",
                borderRadius: "24px",
                overflow: "hidden",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${project.color}30`;
                e.currentTarget.style.boxShadow = `0 20px 60px ${project.color}08`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Content side */}
              <div
                className="project-content-anim"
                style={{ padding: "clamp(24px, 5vw, 56px)", display: "flex", flexDirection: "column", justifyContent: "center" }}
              >
                <div style={{ marginBottom: "12px" }}>
                  <span
                    style={{
                      padding: "4px 12px",
                      background: `${project.color}12`,
                      border: `1px solid ${project.color}25`,
                      borderRadius: "100px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: project.color,
                    }}
                  >
                    {project.category}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                    color: "var(--color-text-primary)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    marginBottom: "16px",
                  }}
                >
                  {project.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.75, marginBottom: "24px" }}>
                  {project.description}
                </p>

                {/* Metrics */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "28px", flexWrap: "wrap" }}>
                  {project.metrics.map((m) => (
                    <div key={m} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Check size={14} style={{ color: project.color }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{m}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        padding: "4px 12px",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "100px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.75rem",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.link || `/works/${project.id}`}
                  target={project.link ? "_blank" : undefined}
                  rel={project.link ? "noopener noreferrer" : undefined}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: project.color,
                    textDecoration: "none",
                    width: "fit-content",
                  }}
                >
                  View Live Site <ExternalLink size={14} />
                </Link>
              </div>

              {/* Visual side with screenshot */}
              <div
                className="project-visual-anim"
                style={{
                  minHeight: "340px",
                  position: "relative",
                  overflow: "hidden",
                  order: i % 2 === 0 ? 1 : -1,
                  borderLeft: i % 2 === 0 ? "1px solid var(--color-border)" : "none",
                  borderRight: i % 2 !== 0 ? "1px solid var(--color-border)" : "none",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    inset: 0,
                    transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                  className="project-row-image"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, rgba(26,22,18,0.05) 0%, rgba(26,22,18,0.2) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "56px" }}>
          <Link
            href="/works"
            data-magnetic
            data-cursor-text="ALL PROJECTS"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 36px",
              background: "linear-gradient(135deg, var(--color-violet), var(--color-violet-light))",
              color: "#fff",
              borderRadius: "100px",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 12px 40px rgba(184, 147, 75, 0.25)",
            }}
          >
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS SECTION ─────────────────────────────────────────────────────────

const processSteps = [
  { step: "01", title: "Discovery", desc: "We dive deep into your vision, goals, and requirements to build a strategic roadmap.", icon: "🔍", color: "#6C4E31" },
  { step: "02", title: "Design", desc: "Awwwards-caliber UI/UX design — wireframes, prototypes, and pixel-perfect visuals.", icon: "✦", color: "#B8934B" },
  { step: "03", title: "Engineering", desc: "Clean, scalable code with modern architectures, CI/CD pipelines, and comprehensive testing.", icon: "⚡", color: "#06B6D4" },
  { step: "04", title: "Launch", desc: "Smooth deployment with monitoring, performance optimization, and post-launch support.", icon: "🚀", color: "#10B981" },
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

    // Header reveal
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    headerTl
      .fromTo(badgeRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(headingRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.45");

    // Steps cards stagger entrance
    const steps = gsap.utils.toArray(".process-step-anim");
    const stepsAnim = gsap.fromTo(
      steps,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: stepsGridRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Dynamic drawing of the path line on scroll
    const path = linePathRef.current;
    if (path) {
      const pathLength = path.getTotalLength();
      gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

      const pathAnim = gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: stepsGridRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      // Illuminate step circles as the scroll crosses them
      steps.forEach((step: any, idx) => {
        const circle = step.querySelector(".step-circle");
        gsap.to(circle, {
          borderColor: processSteps[idx].color,
          backgroundColor: `${processSteps[idx].color}18`,
          boxShadow: `0 0 25px ${processSteps[idx].color}25`,
          duration: 0.4,
          scrollTrigger: {
            trigger: step,
            start: "top 65%",
            toggleActions: "play none none reverse",
          }
        });
      });

      return () => {
        headerTl.kill();
        stepsAnim.kill();
        pathAnim.kill();
      };
    }

    return () => {
      headerTl.kill();
      stepsAnim.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        padding: "clamp(80px, 10vw, 140px) 0",
        background: "var(--color-bg-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(184,147,75,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-zentrix" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            ref={badgeRef}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              borderRadius: "100px",
              marginBottom: "20px",
              background: "rgba(16, 185, 129, 0.06)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-success)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-success)" }}>
              How We Work
            </span>
          </div>

          <h2
            ref={headingRef}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Our Development Process
          </h2>
        </div>

        <div
          ref={stepsGridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2px",
            position: "relative",
          }}
        >
          {/* SVG Connector line */}
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "10%",
              right: "10%",
              height: "4px",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
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
                  <stop offset="0%" stopColor="var(--color-violet)" />
                  <stop offset="50%" stopColor="var(--color-violet-light)" />
                  <stop offset="100%" stopColor="var(--color-cyan)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {processSteps.map((step, i) => (
            <div
              key={step.step}
              className="process-step-anim"
              data-cursor-text={step.title.toUpperCase()}
              style={{
                padding: "32px 24px",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Step number circle */}
              <div
                className="step-circle"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: "var(--color-surface)",
                  border: "2px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  position: "relative",
                  transition: "all 0.4s ease",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>{step.icon}</span>
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: step.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {step.step}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "var(--color-text-primary)",
                  marginBottom: "10px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.65,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS SECTION ────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    name: "Arun Kumar",
    role: "CEO",
    company: "HealthFirst Clinic",
    text: "Zentrix delivered an incredible HMS that transformed our entire hospital operations. The attention to detail and quality is extraordinary.",
    rating: 5,
    avatar: "A",
    color: "#6C4E31",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Director",
    company: "Excel School",
    text: "The school management system they built is world-class. Parents, teachers, and admin all love it. Highly recommend Zentrix!",
    rating: 5,
    avatar: "P",
    color: "#06B6D4",
  },
  {
    id: 3,
    name: "Rajesh Nair",
    role: "Founder",
    company: "AutoFlow Solutions",
    text: "Their AI automation suite cut our manual work by 80%. The team is incredibly professional and delivered ahead of schedule.",
    rating: 5,
    avatar: "R",
    color: "#B8934B",
  },
  {
    id: 4,
    name: "Kavitha Devi",
    role: "CTO",
    company: "RetailPro",
    text: "Best web development agency we've worked with. The website they built for us drives real business results every single day.",
    rating: 5,
    avatar: "K",
    color: "#EC4899",
  },
];

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInViewObserver({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        padding: "clamp(80px, 10vw, 140px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container-zentrix">
        <div ref={ref} style={{ textAlign: "center", marginBottom: "60px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              border: "1px solid rgba(245,158,11,0.3)",
              borderRadius: "100px",
              marginBottom: "20px",
              background: "rgba(245,158,11,0.06)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#F59E0B" }}>
              Client Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Trusted by Visionaries
          </motion.h2>
        </div>

        {/* Testimonial carousel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "32px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-surface-2)",
                borderRadius: "20px",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${t.color}30`;
                e.currentTarget.style.background = `${t.color}05`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-surface-2)";
                e.currentTarget.style.background = "var(--color-surface)";
              }}
            >
              {/* Stars */}
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {Array(t.rating).fill(0).map((_, si) => (
                  <Star key={si} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  marginBottom: "24px",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: `${t.color}20`,
                    border: `1px solid ${t.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: t.color,
                    flexShrink: 0,
                  }}
                >
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
                    {t.role} @ {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Review CTA */}
        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Link
            href="/contact#reviews"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-text-muted)",
              textDecoration: "none",
            }}
          >
            Read all reviews <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── INNOVATION LAB PREVIEW ──────────────────────────────────────────────────

function InnovationSection() {
  const { ref, inView } = useInViewObserver({ threshold: 0.1, triggerOnce: true });

  const innovations = [
    { icon: "🤖", title: "AI Research", desc: "Computer vision, NLP, and predictive models for real-world applications.", color: "#6C4E31" },
    { icon: "⚙️", title: "IoT & Automation", desc: "Smart systems connecting physical devices to intelligent software platforms.", color: "#06B6D4" },
    { icon: "🏥", title: "Healthcare Innovation", desc: "Experimental apps revolutionizing patient care and medical workflows.", color: "#10B981" },
    { icon: "🌐", title: "Future Ideas", desc: "Internal products and experimental concepts pushing technology boundaries.", color: "#F59E0B" },
  ];

  return (
    <section
      style={{
        padding: "clamp(80px, 10vw, 140px) 0",
        background: "var(--color-bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Futuristic grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(184,147,75,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,147,75,0.03) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <div className="container-zentrix" style={{ position: "relative" }}>
        <div ref={ref}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
            {/* Left content */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  border: "1px solid rgba(184, 147, 75, 0.3)",
                  borderRadius: "100px",
                  marginBottom: "24px",
                  background: "rgba(184, 147, 75, 0.08)",
                }}
              >
                <FlaskConical size={14} style={{ color: "#B8934B" }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8934B" }}>
                  Innovation Lab
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 800,
                  color: "var(--color-text-primary)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  marginBottom: "20px",
                }}
              >
                Where the Future
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #6C4E31, #B8934B, #06B6D4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Gets Built
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 }}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                  maxWidth: "480px",
                }}
              >
                Our Innovation Lab is where we experiment with emerging technologies — from computer vision to IoT automation — creating tomorrow&apos;s solutions today.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
                style={{ display: "flex", gap: "16px" }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#B8934B" }}>5+</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>Active Projects</div>
                </div>
                <div style={{ width: "1px", background: "var(--color-surface-2)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#06B6D4" }}>10+</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>Technologies</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                style={{ marginTop: "32px" }}
              >
                <Link
                  href="/innovation-lab"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 28px",
                    background: "linear-gradient(135deg, #6C4E31, #B8934B)",
                    color: "#fff",
                    borderRadius: "100px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 12px 40px rgba(184,147,75,0.3)",
                  }}
                >
                  <FlaskConical size={16} />
                  Explore the Lab
                </Link>
              </motion.div>
            </div>

            {/* Right — innovation cards grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {innovations.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    padding: "28px 24px",
                    background: `${item.color}08`,
                    border: `1px solid ${item.color}20`,
                    borderRadius: "20px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${item.color}12`;
                    e.currentTarget.style.borderColor = `${item.color}30`;
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${item.color}08`;
                    e.currentTarget.style.borderColor = `${item.color}20`;
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{item.icon}</div>
                  <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-primary)", marginBottom: "8px" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          section [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ─── CTA SECTION ─────────────────────────────────────────────────────────────

function CTASection() {
  const { ref, inView } = useInViewObserver({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      style={{
        padding: "clamp(80px, 10vw, 140px) 0",
        position: "relative",
        overflow: "hidden",
        background: "var(--color-bg)",
      }}
    >
      {/* Animated background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(184,147,75,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 50%, rgba(108,78,49,0.1) 0%, transparent 60%)
          `,
          pointerEvents: "none",
        }}
      />

      <div className="container-zentrix" style={{ position: "relative", zIndex: 2 }}>
        <div
          ref={ref}
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 20px",
                border: "1px solid rgba(184, 147, 75, 0.3)",
                borderRadius: "100px",
                marginBottom: "32px",
                background: "rgba(184, 147, 75, 0.08)",
              }}
            >
              <Award size={14} style={{ color: "#B8934B" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 600, color: "#B8934B" }}>
                Premium Quality Guaranteed
              </span>
            </div>

            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                marginBottom: "24px",
              }}
            >
              <span style={{ color: "var(--color-text-primary)" }}>Ready to Build</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #6C4E31, #B8934B, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Something Legendary?
              </span>
            </h2>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                marginBottom: "48px",
              }}
            >
              From a simple website to a complex enterprise system — we bring your vision to life with premium quality, on time, every time. Let&apos;s create something extraordinary together.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "18px 44px",
                  background: "linear-gradient(135deg, #6C4E31, #B8934B)",
                  color: "#fff",
                  borderRadius: "100px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 24px 80px rgba(184, 147, 75, 0.4)",
                  letterSpacing: "0.01em",
                }}
              >
                <Zap size={18} />
                Start Your Project Now
              </Link>
              <Link
                href="/works"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "17px 44px",
                  background: "transparent",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  borderRadius: "100px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
              >
                See Our Portfolio
              </Link>
            </div>

            {/* Trust row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "clamp(16px, 3vw, 32px)",
                marginTop: "48px",
                flexWrap: "wrap",
              }}
            >
              {[
                { icon: "⚡", text: "Fast Delivery" },
                { icon: "🛡️", text: "Quality Guaranteed" },
                { icon: "🤝", text: "Post-launch Support" },
                { icon: "📱", text: "Mobile-first" },
              ].map((item) => (
                <div
                  key={item.text}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "1rem" }}>{item.icon}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
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

// ─── MAIN HOME PAGE ──────────────────────────────────────────────────────────

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
