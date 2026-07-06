"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Zap, FlaskConical, Clock, Users, Globe, ExternalLink } from "lucide-react";

const innovations = [
  {
    id: "agmd",
    title: "AGMD Portal",
    category: "Web Platform",
    status: "Active",
    statusColor: "#10B981",
    year: "2026",
    emoji: "⚡",
    color: "#6C4E31",
    description: "Custom performance-oriented web platform built as part of our research into blazing fast rendering engines and clean metadata caching.",
    link: "https://agmd.vercel.app/",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    metrics: [{ k: "Load Speed", v: "<0.8s" }, { k: "Performance", v: "100%" }, { k: "Accessibility", v: "98%" }],
  },
  {
    id: "avs-nexus",
    title: "AVS Nexus",
    category: "EduTech Portal",
    status: "Active",
    statusColor: "#10B981",
    year: "2026",
    emoji: "🏫",
    color: "#06B6D4",
    description: "Interactive academic portal mapping student groups, events, placement records, and institutional collaborations.",
    link: "https://avsnexus.vercel.app/",
    techStack: ["Next.js", "React", "Prisma", "PostgreSQL"],
    metrics: [{ k: "Students Active", v: "2K+" }, { k: "Query Time", v: "<80ms" }, { k: "Uptime", v: "99.9%" }],
  },
  {
    id: "tg-fun-hub",
    title: "TG Fun Hub",
    category: "Entertainment",
    status: "Active",
    statusColor: "#10B981",
    year: "2026",
    emoji: "🎮",
    color: "#B8934B",
    description: "Digital entertainment hub with interactive mini-games, dynamic media grids, and premium responsive user experiences.",
    link: "https://tgfunhub.vercel.app/",
    techStack: ["React", "Tailwind CSS", "GSAP", "Vite"],
    metrics: [{ k: "Mini Games", v: "8+" }, { k: "FPS Rendered", v: "60 FPS" }, { k: "User Retention", v: "75%" }],
  },
  {
    id: "tg-streams",
    title: "TG Streams",
    category: "Streaming",
    status: "Active",
    statusColor: "#10B981",
    year: "2026",
    emoji: "📺",
    color: "#EC4899",
    description: "Streaming video portal optimization research focusing on fast buffer playback and custom video container overlays.",
    link: "https://tgstreams.vercel.app/",
    techStack: ["Next.js", "Vime SDK", "Tailwind CSS", "FastAPI"],
    metrics: [{ k: "Stream Latency", v: "-40%" }, { k: "Supported Formats", v: "HLS/DASH" }, { k: "Buffer Ratio", v: "1.1x" }],
  },
  {
    id: "skilltojob-ai",
    title: "Skill To Job AI",
    category: "Artificial Intelligence",
    status: "Active",
    statusColor: "#10B981",
    year: "2026",
    emoji: "🧠",
    color: "#F59E0B",
    description: "AI-powered job readiness platform analyzing resumes against active tech roles, generating mock interviews, and mapping skill gaps.",
    link: "https://skilltojob-ai.vercel.app/",
    techStack: ["Python", "OpenAI API", "Next.js", "FastAPI"],
    metrics: [{ k: "Match Accuracy", v: "94%" }, { k: "Mock Interviews", v: "500+" }, { k: "Response Latency", v: "1.5s" }],
  },
  {
    id: "cinemahub-arif",
    title: "CinemaHub Arif",
    category: "Web Platform",
    status: "Active",
    statusColor: "#10B981",
    year: "2026",
    emoji: "🎬",
    color: "#10B981",
    description: "Cinematic cataloging web platform researching high-performance image optimization, movie meta lookups, and rich review boards.",
    link: "https://cinemahub-arif.vercel.app/",
    techStack: ["React", "TMDB API", "Tailwind CSS", "Framer Motion"],
    metrics: [{ k: "Movies Listed", v: "50K+" }, { k: "Lookup Speed", v: "<50ms" }, { k: "Interface Fluidity", v: "A+" }],
  },
];

const timelineItems = [
  { year: "Jan 2026", event: "Zentrix Technology founded in Salem", color: "#6C4E31" },
  { year: "Feb 2026", event: "Innovation Lab officially launched", color: "#06B6D4" },
  { year: "Mar 2026", event: "First AI automation project deployed", color: "#B8934B" },
  { year: "Apr 2026", event: "HMS & School ERP projects completed", color: "#10B981" },
  { year: "May 2026", event: "Computer Vision QA system in beta", color: "#F59E0B" },
  { year: "Jul 2026", event: "5+ active innovation lab projects", color: "#EC4899" },
];

function InnovationCard({ item, index }: { item: typeof innovations[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-surface-2)",
        borderRadius: "24px",
        padding: "32px",
        transition: "all 0.4s ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${item.color}35`;
        e.currentTarget.style.background = `linear-gradient(135deg, ${item.color}08, transparent)`;
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 20px 60px ${item.color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-surface-2)";
        e.currentTarget.style.background = "var(--color-surface)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "14px",
              background: `${item.color}15`,
              border: `1px solid ${item.color}25`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
            }}
          >
            {item.emoji}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", fontWeight: 600, color: item.color, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {item.category}
              </span>
            </div>
            <span
              style={{
                padding: "2px 8px",
                background: `${item.statusColor}15`,
                border: `1px solid ${item.statusColor}30`,
                borderRadius: "100px",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: item.statusColor,
              }}
            >
              ● {item.status}
            </span>
          </div>
        </div>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155" }}>
          {item.year}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: "1.15rem",
          color: "var(--color-text-primary)",
          letterSpacing: "-0.01em",
          marginBottom: "10px",
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.875rem",
          color: "var(--color-text-muted)",
          lineHeight: 1.65,
          marginBottom: "20px",
        }}
      >
        {item.description}
      </p>

      {/* Metrics */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
        {item.metrics.map((m) => (
          <div
            key={m.k}
            style={{
              padding: "8px 12px",
              background: `${item.color}08`,
              border: `1px solid ${item.color}18`,
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1rem", color: item.color }}>{m.v}</div>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--color-text-secondary)" }}>{m.k}</div>
          </div>
        ))}
      </div>

      {/* Tech tags & Launch Link */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginTop: "auto" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {item.techStack.map((t) => (
            <span
              key={t}
              style={{
                padding: "3px 10px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-surface-2)",
                borderRadius: "100px",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.7rem",
                color: "var(--color-text-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {item.link && (
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: item.color,
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            Launch <ExternalLink size={12} style={{ marginLeft: 2 }} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function InnovationLabPage() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: timelineRef, inView: timelineInView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          padding: "160px 0 100px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Futuristic grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(184,147,75,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,147,75,0.04) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse at 50% 30%, rgba(184,147,75,0.2) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(108,78,49,0.1) 0%, transparent 50%)
            `,
          }}
        />

        <div className="container-zentrix" style={{ position: "relative", zIndex: 2 }} ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              border: "1px solid rgba(184,147,75,0.4)",
              borderRadius: "100px",
              marginBottom: "28px",
              background: "rgba(184,147,75,0.1)",
            }}
          >
            <FlaskConical size={14} style={{ color: "#B8934B" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8934B" }}>
              Innovation Lab — Zentrix Technology
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 7.5rem)",
              fontWeight: 800,
              lineHeight: 0.93,
              letterSpacing: "-0.04em",
              marginBottom: "28px",
            }}
          >
            <span style={{ color: "var(--color-text-primary)" }}>Where the</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6C4E31, #B8934B, #06B6D4, #22D3EE)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Future is Built
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "600px",
              margin: "0 auto 56px",
            }}
          >
            The Zentrix Innovation Lab is our experimental playground — a space where we push the boundaries of AI, IoT, computer vision, and emerging technologies to build tomorrow&apos;s solutions today.
          </motion.p>

          {/* Lab stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            style={{ display: "flex", gap: "clamp(16px,4vw,48px)", justifyContent: "center", flexWrap: "wrap" }}
          >
            {[
              { v: "5+", l: "Active Projects", icon: FlaskConical, c: "#6C4E31" },
              { v: "10+", l: "Technologies Explored", icon: Globe, c: "#06B6D4" },
              { v: "2026", l: "Founded", icon: Clock, c: "#B8934B" },
              { v: "∞", l: "Ideas in Queue", icon: Zap, c: "#F59E0B" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <Icon size={20} style={{ color: s.c, margin: "0 auto 6px" }} />
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.8rem", fontWeight: 800, color: s.c }}>{s.v}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{s.l}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: "40px 0 clamp(80px,10vw,120px)" }}>
        <div className="container-zentrix">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.03em",
              }}
            >
              Active Research Projects
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "20px",
            }}
          >
            {innovations.map((item, i) => (
              <InnovationCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section
        style={{
          padding: "clamp(60px,8vw,100px) 0",
          background: "var(--color-bg)",
          borderTop: "1px solid var(--color-surface)",
        }}
      >
        <div className="container-zentrix" ref={timelineRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.03em",
              }}
            >
              Innovation Timeline
            </h2>
          </div>

          <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: "20px",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "linear-gradient(180deg, #6C4E31, #06B6D4, transparent)",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {timelineItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -40 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "flex", gap: "24px", alignItems: "flex-start", paddingLeft: "8px" }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: item.color,
                      border: `3px solid var(--color-bg)`,
                      boxShadow: `0 0 15px ${item.color}60`,
                      flexShrink: 0,
                      marginTop: "4px",
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", color: item.color, fontWeight: 600, marginBottom: "4px" }}>
                      {item.year}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                      {item.event}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(60px,8vw,100px) 0", textAlign: "center" }}>
        <div className="container-zentrix">
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(1.8rem,4vw,3rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Have a wild idea? Let&apos;s explore it.
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", color: "var(--color-text-muted)", marginBottom: "32px" }}>
            We love ambitious, innovative projects. Bring us your toughest problems.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 40px",
              background: "linear-gradient(135deg, #6C4E31, #B8934B)",
              color: "#fff",
              borderRadius: "100px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 20px 60px rgba(184,147,75,0.35)",
            }}
          >
            <FlaskConical size={18} /> Pitch Your Idea
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 640px) {
          [style*="grid-template-columns: repeat(auto-fill, minmax(340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
