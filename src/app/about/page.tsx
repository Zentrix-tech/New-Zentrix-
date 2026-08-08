"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Zap, Award, Users, Target, Heart, MapPin, Calendar, Globe, Shield } from "lucide-react";

const milestones = [
  { year: "2026", month: "January", title: "Zentrix Technology Founded", desc: "Born in Salem, Tamil Nadu with a clear mission — to democratize premium software engineering for businesses of all sizes.", color: "#6C4E31" },
  { year: "2026", month: "February", title: "Innovation Lab Launched", desc: "Dedicated research division created to explore AI, IoT, and emerging technologies.", color: "#06B6D4" },
  { year: "2026", month: "March", title: "First Enterprise Client", desc: "Delivered our first HMS project — a complete hospital management system that transformed clinical operations.", color: "#B8934B" },
  { year: "2026", month: "April", title: "School ERP Delivered", desc: "Completed an all-in-one School Management System serving 500+ students across multiple branches.", color: "#10B981" },
  { year: "2026", month: "May", title: "AI Division Launched", desc: "Launched dedicated AI/ML services — deploying automation solutions that saved clients 80% manual work.", color: "#F59E0B" },
  { year: "2026", month: "July", title: "7+ Projects, Growing Fast", desc: "7 projects delivered, 5 innovation lab experiments active, and growing toward becoming Tamil Nadu's #1 software company.", color: "#EC4899" },
];

const values = [
  {
    icon: "⚡",
    title: "Velocity with Quality",
    desc: "We move fast without breaking things. Every sprint delivers tested, production-ready code that your users will love.",
    color: "#6C4E31",
  },
  {
    icon: "🧠",
    title: "Engineering First",
    desc: "We are engineers at heart. Clean architecture, scalable systems, and future-proof technology choices are non-negotiable.",
    color: "#06B6D4",
  },
  {
    icon: "💎",
    title: "Premium or Nothing",
    desc: "We don't build mediocre products. Every pixel, every API, every line of code reflects our commitment to excellence.",
    color: "#B8934B",
  },
  {
    icon: "🤝",
    title: "Client Partnership",
    desc: "We're not just a vendor — we're your technology partner. Your success is our success, long after launch day.",
    color: "#10B981",
  },
  {
    icon: "🔬",
    title: "Relentless Innovation",
    desc: "We constantly explore what's next — AI, automation, new frameworks — keeping our clients ahead of the curve.",
    color: "#F59E0B",
  },
  {
    icon: "🌍",
    title: "Impact at Scale",
    desc: "From Salem to the world. We build software that matters — making real differences in healthcare, education, and business.",
    color: "#EC4899",
  },
];

const team = [
  {
    name: "Mohammed Arif",
    role: "Founder & CEO",
    bio: "Visionary leader and core system architect. Specialized in custom engineering, high-performance web platforms, and Awwwards-grade digital experiences.",
    color: "var(--color-violet)",
    emoji: "🚀",
    skills: ["Fullstack Dev", "UI/UX Motion", "Lead Gen Strategy", "Awwwards Style"],
    image: "/founder_arif.webp",
    portfolio: "https://arif.zone.id/",
  },
  {
    name: "Gokulprasath",
    role: "Co-Founder & CTO",
    bio: "Full-stack technologist and product architect. Focused on building scalable cloud platforms, automated workflows, and complex technovation portals.",
    color: "var(--color-cyan)",
    emoji: "⚙️",
    skills: ["System Architecture", "NodeJS / NextJS", "Database Design", "AI Integration"],
    image: "/cofounder_gokul.webp",
    portfolio: "https://gokulprasath.vercel.app/",
  },
  {
    name: "Mohammad Rashid",
    role: "Co-Founder & CBO",
    bio: "Strategic business executive driving corporate partnerships, revenue growth, and market expansion. Dedicated to delivering high-impact enterprise software solutions.",
    color: "#F59E0B",
    emoji: "💼",
    skills: ["Business Strategy", "Client Partnerships", "Revenue Growth", "Enterprise Operations"],
    image: "/cofounder_rashid.jpg",
  },
];

function MilestoneTimeline() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <div ref={ref} style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
      {/* Center line */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "2px",
          background: "linear-gradient(180deg, #6C4E31, #06B6D4, #B8934B, #10B981, #F59E0B, #EC4899, transparent)",
          transform: "translateX(-50%)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        {milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 40px 1fr",
              gap: "0",
              alignItems: "center",
            }}
          >
            {/* Left */}
            <div style={{ textAlign: i % 2 === 0 ? "right" : "left", padding: "0 24px", order: i % 2 === 0 ? 0 : 2 }}>
              {i % 2 === 0 ? (
                <div
                  style={{
                    background: "var(--color-surface)",
                    border: `1px solid ${m.color}25`,
                    borderRadius: "16px",
                    padding: "20px 24px",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: m.color, marginBottom: "6px" }}>
                    {m.month} {m.year}
                  </div>
                  <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-primary)", marginBottom: "6px" }}>{m.title}</h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              ) : null}
            </div>

            {/* Center dot */}
            <div style={{ display: "flex", justifyContent: "center", order: 1 }}>
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: m.color,
                  border: "3px solid var(--color-bg)",
                  boxShadow: `0 0 15px ${m.color}60`,
                  zIndex: 1,
                }}
              />
            </div>

            {/* Right */}
            <div style={{ padding: "0 24px", order: i % 2 === 0 ? 2 : 0 }}>
              {i % 2 !== 0 ? (
                <div
                  style={{
                    background: "var(--color-surface)",
                    border: `1px solid ${m.color}25`,
                    borderRadius: "16px",
                    padding: "20px 24px",
                  }}
                >
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: m.color, marginBottom: "6px" }}>
                    {m.month} {m.year}
                  </div>
                  <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--color-text-primary)", marginBottom: "6px" }}>{m.title}</h4>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>{m.desc}</p>
                </div>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: teamRef, inView: teamInView } = useInView({ threshold: 0.1, triggerOnce: true });

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
            background: `
              radial-gradient(ellipse at 30% 50%, rgba(184,147,75,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(108,78,49,0.08) 0%, transparent 50%)
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
              padding: "6px 16px",
              border: "1px solid rgba(184,147,75,0.3)",
              borderRadius: "100px",
              marginBottom: "24px",
              background: "rgba(184,147,75,0.08)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8934B" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8934B" }}>
              Our Story
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 7rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "28px",
            }}
          >
            <span style={{ color: "var(--color-text-primary)" }}>Built from</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6C4E31, #B8934B, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Salem, Built for the World
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
              maxWidth: "640px",
              margin: "0 auto 48px",
            }}
          >
            Zentrix Technology was born from a simple conviction: that every business — from a Salem clinic to a global enterprise — deserves world-class software. We&apos;re here to make that happen.
          </motion.p>

          {/* Quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            {[
              { icon: MapPin, text: "Salem, Tamil Nadu", color: "#6C4E31" },
              { icon: Calendar, text: "Founded 2026", color: "#06B6D4" },
              { icon: Users, text: "5+ Team Members", color: "#B8934B" },
              { icon: Globe, text: "Serving India & Beyond", color: "#10B981" },
            ].map(({ icon: Icon, text, color }) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-surface-2)",
                  borderRadius: "100px",
                }}
              >
                <Icon size={14} style={{ color }} />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.825rem", color: "var(--color-text-muted)" }}>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Tagline */}
      <section style={{ padding: "0 0 clamp(80px,10vw,120px)" }}>
        <div className="container-zentrix">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                emoji: "🎯",
                title: "Our Mission",
                text: "To empower businesses across India with world-class software — making enterprise-grade technology accessible, affordable, and transformative.",
                color: "#6C4E31",
              },
              {
                emoji: "🔭",
                title: "Our Vision",
                text: "To become South India's most trusted software engineering studio — recognized globally for innovation, quality, and the lasting impact we create.",
                color: "#06B6D4",
              },
              {
                emoji: "⚡",
                title: "Our Philosophy",
                text: "\"Where Vision Meets Velocity\" — we believe great software is the intersection of ambitious ideas and relentless execution. No shortcuts, no compromises.",
                color: "#B8934B",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  padding: "36px",
                  background: `${card.color}06`,
                  border: `1px solid ${card.color}20`,
                  borderRadius: "24px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${card.color}10`;
                  e.currentTarget.style.borderColor = `${card.color}35`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${card.color}06`;
                  e.currentTarget.style.borderColor = `${card.color}20`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{card.emoji}</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section
        style={{
          padding: "clamp(60px,8vw,100px) 0",
          background: "var(--color-bg)",
          borderTop: "1px solid var(--color-surface)",
        }}
      >
        <div className="container-zentrix" ref={valuesRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.03em",
              }}
            >
              What We Stand For
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: "16px",
            }}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "28px 24px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${v.color}08`;
                  e.currentTarget.style.borderColor = `${v.color}25`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-surface)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "14px" }}>{v.icon}</div>
                <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "var(--color-text-primary)", marginBottom: "8px" }}>
                  {v.title}
                </h4>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section style={{ padding: "clamp(60px,8vw,100px) 0" }}>
        <div className="container-zentrix">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              The Zentrix Journey
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "var(--color-text-muted)" }}>
              From day one to where we are today — every milestone, every breakthrough.
            </p>
          </div>
          <MilestoneTimeline />
        </div>
      </section>

      {/* Team */}
      <section
        style={{
          padding: "clamp(60px,8vw,100px) 0",
          background: "var(--color-bg)",
          borderTop: "1px solid var(--color-surface)",
        }}
      >
        <div className="container-zentrix" ref={teamRef}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.03em",
              }}
            >
              Meet the Team
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
              gap: "20px",
            }}
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  padding: "32px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-surface-2)",
                  borderRadius: "24px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${member.color}08`;
                  e.currentTarget.style.borderColor = `${member.color}30`;
                  e.currentTarget.style.transform = "translateY(-6px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-surface)";
                  e.currentTarget.style.borderColor = "var(--color-surface-2)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Avatar */}
                <div
                  className="step-circle"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `2px solid ${member.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    boxShadow: `0 0 25px ${member.color}15`,
                    background: `${member.color}05`,
                    position: "relative",
                  }}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: "2.5rem" }}>{member.emoji}</span>
                  )}
                </div>
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1.25rem", color: "var(--color-text-primary)", marginBottom: "4px" }}>
                  {member.name}
                </h4>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: member.color, fontWeight: 600, marginBottom: "16px" }}>
                  {member.role}
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.65, marginBottom: "20px" }}>
                  {member.bio}
                </p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
                  {member.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        padding: "3px 10px",
                        background: `${member.color}10`,
                        border: `1px solid ${member.color}20`,
                        borderRadius: "100px",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.7rem",
                        color: member.color,
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {member.portfolio && (
                  <Link
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: member.color,
                      textDecoration: "none",
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                  >
                    View Portfolio <Globe size={13} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "clamp(60px,8vw,100px) 0", textAlign: "center" }}>
        <div className="container-zentrix">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "16px", letterSpacing: "-0.02em" }}>
            Join the Zentrix journey
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", color: "var(--color-text-muted)", marginBottom: "32px" }}>
            Whether as a client, collaborator, or team member — we&apos;d love to connect.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
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
              <Zap size={18} /> Let&apos;s Work Together
            </Link>
            <Link
              href="/careers"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "15px 36px",
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
              <Users size={16} /> Join Our Team
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          [style*="grid-template-columns: 1fr 40px 1fr"] {
            grid-template-columns: 40px 1fr !important;
          }
          [style*="order: 0"][style*="textAlign: right"] { display: none !important; }
          [style*="order: 2"] { order: 0 !important; }
        }
        @media (max-width: 640px) {
          [style*="grid-template-columns: repeat(auto-fit, minmax(280px"] { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(auto-fill, minmax(260px"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
