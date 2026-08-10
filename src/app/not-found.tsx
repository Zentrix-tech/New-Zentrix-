"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Home, ArrowRight, Compass, Globe, Smartphone, Bot, Building2,
  Sparkles, Search, MessageSquare, PhoneCall, CheckCircle2
} from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const featuredSolutions = [
    {
      title: "Web & Next.js Platforms",
      desc: "High-performance digital flagships, SSR web applications, and fast landing platforms.",
      href: "/services/web-development",
      icon: Globe,
      color: "#A37E36",
    },
    {
      title: "Mobile App Development",
      desc: "Native-grade iOS & Android applications built with Flutter & React Native.",
      href: "/services/app-development",
      icon: Smartphone,
      color: "#EC4899",
    },
    {
      title: "AI & Workflow Automation",
      desc: "Cognitive AI agents, voice call bots, and automated business data pipelines.",
      href: "/services/ai-automation",
      icon: Bot,
      color: "#10B981",
    },
    {
      title: "Enterprise ERP & HMS",
      desc: "Custom hospital management systems, school ERPs, and multi-location business ledgers.",
      href: "/services/enterprise-software",
      icon: Building2,
      color: "#3B82F6",
    },
  ];

  const exploreSections = [
    { label: "Our Works & Case Studies", href: "/works" },
    { label: "Innovation Lab", href: "/innovation-lab" },
    { label: "Industry Solutions", href: "/industries" },
    { label: "Regional Locations", href: "/locations" },
    { label: "About Zentrix", href: "/about" },
    { label: "Tech Blog", href: "/blog" },
  ];

  return (
    <div
      style={{
        background: "var(--color-bg)",
        minHeight: "100vh",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(184,147,75,0.1) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(108,78,49,0.08) 0%, transparent 50%)
          `,
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 18px",
              background: "rgba(184, 147, 75, 0.1)",
              border: "1px solid rgba(184, 147, 75, 0.25)",
              borderRadius: "100px",
              color: "var(--color-violet)",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "20px",
            }}
          >
            <Compass size={16} /> Zentrix Discovery Center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Looking for Zentrix Technology Solutions?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.05rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
            }}
          >
            The specific link you followed might have moved or been updated. Here are our top software solutions, portfolio highlights, and quick access links to help you find what you need immediately.
          </motion.p>
        </div>

        {/* Featured Solutions Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
            gap: "20px",
            marginBottom: "50px",
          }}
        >
          {featuredSolutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <Link
                key={sol.title}
                href={sol.href}
                style={{
                  padding: "28px",
                  background: "var(--color-surface)",
                  border: `1px solid ${sol.color}25`,
                  borderRadius: "20px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    background: `${sol.color}15`,
                    color: sol.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Icon size={22} />
                </div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    marginBottom: "8px",
                  }}
                >
                  {sol.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    flexGrow: 1,
                    marginBottom: "16px",
                  }}
                >
                  {sol.desc}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.85rem", fontWeight: 600, color: sol.color }}>
                  Explore Solution <ArrowRight size={14} />
                </div>
              </Link>
            );
          })}
        </motion.div>

        {/* Quick Navigation Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          style={{
            padding: "32px",
            background: "rgba(250, 247, 242, 0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(108, 78, 49, 0.1)",
            borderRadius: "24px",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "16px" }}>
            Explore Popular Sections
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {exploreSections.map((sec) => (
              <Link
                key={sec.href}
                href={sec.href}
                style={{
                  padding: "8px 18px",
                  background: "var(--color-surface)",
                  border: "1px solid rgba(184, 147, 75, 0.2)",
                  borderRadius: "100px",
                  color: "var(--color-text-primary)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {sec.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              background: "var(--gradient-primary)",
              color: "#fff",
              borderRadius: "100px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(108, 78, 49, 0.2)",
            }}
          >
            <Home size={16} /> Return to Homepage
          </Link>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              background: "transparent",
              border: "1px solid rgba(184, 147, 75, 0.3)",
              color: "var(--color-text-primary)",
              borderRadius: "100px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            <MessageSquare size={16} /> Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
