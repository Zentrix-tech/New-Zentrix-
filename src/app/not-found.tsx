"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const quickLinks = [
    { href: "/services", label: "Services" },
    { href: "/works", label: "Portfolio" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Careers" },
  ];

  return (
    <div
      style={{
        background: "var(--color-bg)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(184,147,75,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(108,78,49,0.08) 0%, transparent 50%)
          `,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(var(--color-surface) 1px, transparent 1px), linear-gradient(90deg, var(--color-surface) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 2, padding: "40px 24px" }}>
        {/* Giant 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(8rem, 20vw, 18rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: "-0.06em",
            background: "linear-gradient(135deg, rgba(184,147,75,0.2), rgba(108,78,49,0.2), rgba(108,78,49,0.15))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "20px",
            userSelect: "none",
          }}
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "Syne, sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.03em",
            marginBottom: "12px",
          }}
        >
          This page got lost in the matrix
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "1rem",
            color: "var(--color-text-muted)",
            maxWidth: "400px",
            margin: "0 auto 40px",
            lineHeight: 1.65,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              background: "linear-gradient(135deg, #6C4E31, #B8934B)",
              color: "#fff",
              borderRadius: "100px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 16px 40px rgba(184,147,75,0.35)",
            }}
          >
            <Home size={16} /> Go Home
          </Link>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "13px 28px",
              background: "transparent",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-muted)",
              borderRadius: "100px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              fontSize: "0.95rem",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> Contact Us
          </Link>
        </motion.div>

        {/* Quick nav links — using CSS class for hover, no inline handlers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{ marginTop: "60px" }}
        >
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#334155", marginBottom: "16px" }}>
            Popular Pages
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {quickLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="not-found-link"
                style={{
                  padding: "6px 16px",
                  borderRadius: "100px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.8rem",
                  textDecoration: "none",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .not-found-link {
          background: var(--color-surface);
          border: 1px solid var(--color-surface-2);
          color: var(--color-text-muted);
          transition: all 0.2s ease;
        }
        .not-found-link:hover {
          border-color: rgba(184,147,75,0.4);
          color: #B8934B;
          background: rgba(184,147,75,0.06);
        }
      `}</style>
    </div>
  );
}
