"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Heart, Globe, Rocket, Users, Coffee } from "lucide-react";

const openRoles = [
  {
    title: "Full-Stack Developer",
    type: "Full-time",
    level: "Mid–Senior",
    stack: ["Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    color: "#6C4E31",
    emoji: "⚡",
    desc: "Build premium web applications and robust backend systems that power our client projects.",
  },
  {
    title: "Flutter Developer",
    type: "Full-time",
    level: "Mid-level",
    stack: ["Flutter", "Dart", "Firebase", "REST APIs"],
    color: "#06B6D4",
    emoji: "📱",
    desc: "Create beautiful, performant cross-platform mobile apps for iOS and Android.",
  },
  {
    title: "AI / ML Engineer",
    type: "Full-time",
    level: "Senior",
    stack: ["Python", "TensorFlow", "PyTorch", "FastAPI"],
    color: "#B8934B",
    emoji: "🧠",
    desc: "Design and deploy machine learning systems that automate real-world business processes.",
  },
  {
    title: "UI/UX Designer",
    type: "Full-time / Contract",
    level: "Mid-level",
    stack: ["Figma", "Framer", "Adobe XD", "Prototyping"],
    color: "#EC4899",
    emoji: "🎨",
    desc: "Design Awwwards-level interfaces that make users fall in love with the products we build.",
  },
  {
    title: "Digital Marketing Specialist",
    type: "Full-time",
    level: "Junior–Mid",
    stack: ["Meta Ads", "Google Ads", "SEO", "Analytics"],
    color: "#F59E0B",
    emoji: "📈",
    desc: "Drive growth for Zentrix and our clients through data-driven digital marketing campaigns.",
  },
];

const perks = [
  { icon: "🚀", title: "Work on Ambitious Projects", desc: "No boring CRUD apps. Every project is a chance to push the boundaries of what software can do." },
  { icon: "🧠", title: "Continuous Learning", desc: "Explore new technologies, attend workshops, and access premium learning resources — we invest in you." },
  { icon: "💰", title: "Competitive Compensation", desc: "Market-competitive salaries, performance bonuses, and equity plans for senior roles." },
  { icon: "🏠", title: "Remote-First Culture", desc: "Work from anywhere. We judge by output and impact, not by chair time." },
  { icon: "⚡", title: "Fast-Paced Growth", desc: "As a growing company, opportunities to lead, own, and grow are abundant and immediate." },
  { icon: "❤️", title: "Supportive Team", desc: "Small, tight-knit, and deeply collaborative. Your opinions matter and your growth is celebrated." },
];

export default function CareersPage() {
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 50% 30%, rgba(184,147,75,0.15) 0%, transparent 60%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container-zentrix" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              border: "1px solid rgba(184,147,75,0.3)",
              borderRadius: "100px",
              marginBottom: "24px",
              background: "rgba(184,147,75,0.08)",
            }}
          >
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8934B" }}>
              🔥 We&apos;re Hiring
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 7rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "24px",
            }}
          >
            <span style={{ color: "var(--color-text-primary)" }}>Build the Future</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6C4E31, #B8934B, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              With Zentrix
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "580px",
              margin: "0 auto",
            }}
          >
            Join a team of passionate engineers, designers, and creators building world-class software from Salem. Here, your best work gets to matter.
          </motion.p>
        </div>
      </section>

      {/* Why Zentrix */}
      <section style={{ padding: "0 0 clamp(80px,10vw,120px)" }}>
        <div className="container-zentrix">
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              textAlign: "center",
              marginBottom: "40px",
              letterSpacing: "-0.03em",
            }}
          >
            Why You&apos;ll Love Working Here
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: "16px",
            }}
          >
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "28px 24px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(184,147,75,0.06)";
                  e.currentTarget.style.borderColor = "rgba(184,147,75,0.2)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-surface)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "14px" }}>{perk.icon}</div>
                <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--color-text-primary)", marginBottom: "8px" }}>
                  {perk.title}
                </h4>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.65 }}>{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section
        style={{
          padding: "clamp(60px,8vw,100px) 0",
          background: "var(--color-bg)",
          borderTop: "1px solid var(--color-surface)",
        }}
      >
        <div className="container-zentrix">
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(1.8rem,4vw,2.8rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              textAlign: "center",
              marginBottom: "40px",
              letterSpacing: "-0.03em",
            }}
          >
            Open Positions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {openRoles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "24px 28px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-surface-2)",
                  borderRadius: "16px",
                  transition: "all 0.3s ease",
                  flexWrap: "wrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${role.color}06`;
                  e.currentTarget.style.borderColor = `${role.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-surface)";
                  e.currentTarget.style.borderColor = "var(--color-surface-2)";
                }}
              >
                {/* Emoji */}
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "14px",
                    background: `${role.color}15`,
                    border: `1px solid ${role.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    flexShrink: 0,
                  }}
                >
                  {role.emoji}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--color-text-primary)", marginBottom: "4px" }}>
                    {role.title}
                  </h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.825rem", color: "var(--color-text-muted)" }}>{role.desc}</p>
                </div>

                {/* Metadata */}
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                  <span style={{ padding: "4px 12px", background: `${role.color}12`, border: `1px solid ${role.color}22`, borderRadius: "100px", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: role.color, fontWeight: 600 }}>
                    {role.type}
                  </span>
                  <span style={{ padding: "4px 12px", background: "var(--color-surface)", border: "1px solid var(--color-surface-2)", borderRadius: "100px", fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    {role.level}
                  </span>
                  {role.stack.slice(0, 2).map((s) => (
                    <span key={s} style={{ padding: "4px 10px", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "100px", fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "var(--color-text-secondary)" }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Apply */}
                <Link
                  href={`/contact?role=${encodeURIComponent(role.title)}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "10px 20px",
                    background: `${role.color}15`,
                    border: `1px solid ${role.color}30`,
                    borderRadius: "100px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: role.color,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  Apply <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't see a role? CTA */}
      <section style={{ padding: "clamp(60px,8vw,100px) 0", textAlign: "center" }}>
        <div className="container-zentrix">
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>💌</div>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "12px", letterSpacing: "-0.02em" }}>
            Don&apos;t see your role?
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", color: "var(--color-text-muted)", marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px" }}>
            We always want to hear from exceptional talent. Send us your portfolio and tell us how you&apos;d add value to the Zentrix team.
          </p>
          <Link
            href="mailto:zentrixtech01@gmail.com?subject=Open%20Application%20—%20Zentrix%20Technology"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 36px",
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
            <Heart size={18} /> Send Open Application
          </Link>
        </div>
      </section>
    </div>
  );
}
