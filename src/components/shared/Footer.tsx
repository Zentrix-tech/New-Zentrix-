"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin,
  Zap, Heart
} from "lucide-react";

// Custom SVG social icons (lucide-react doesn't include brand icons)
const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
import { siteConfig } from "@/lib/config/site";

const footerLinks = siteConfig.navigation.footer;

function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108, 78, 49, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(184, 147, 75, ${0.15 * (1 - dist / 100)})`;
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
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}
    />
  );
}

const socialLinks = [
  { icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: GithubIcon, href: siteConfig.social.github, label: "GitHub" },
  { icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-surface)",
        overflow: "hidden",
      }}
    >
      <ConstellationCanvas />

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184, 147, 75, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 clamp(24px, 4vw, 80px)",
        }}
      >
        {/* CTA Banner */}
        <div
          style={{
            padding: "clamp(48px, 8vw, 80px) clamp(24px, 4vw, 60px)",
            margin: "0 -20px",
            background: "linear-gradient(135deg, rgba(184,147,75,0.1) 0%, rgba(108,78,49,0.05) 100%)",
            border: "1px solid rgba(184,147,75,0.2)",
            borderRadius: "32px",
            textAlign: "center",
            marginBottom: "60px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "400px",
              height: "200px",
              background: "radial-gradient(circle, rgba(184,147,75,0.3) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.875rem",
              color: "#B8934B",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            Ready to build something extraordinary?
          </p>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
            }}
          >
            Let&apos;s Create Your
            <br />
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Digital Future
            </span>
          </h2>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 36px",
              background: "var(--gradient-primary)",
              color: "#fff",
              borderRadius: "100px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "0.9375rem",
              textDecoration: "none",
              boxShadow: "0 20px 60px var(--color-violet-glow)",
            }}
          >
            <Zap size={18} />
            Start Your Project Today
          </Link>
        </div>

        {/* Main footer grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "clamp(32px, 4vw, 60px)",
            paddingBottom: "48px",
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <img
                src="/logo_main.png"
                alt="Zentrix Technology"
                style={{
                  height: "48px",
                  width: "auto",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: "300px", marginBottom: "24px" }}>
              {siteConfig.shortDescription}
            </p>
            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { icon: Mail, text: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
                { icon: Phone, text: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
                { icon: MapPin, text: siteConfig.location.address, href: "#" },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "var(--color-text-muted)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.8125rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                >
                  <Icon size={14} style={{ color: "var(--color-violet)", flexShrink: 0 }} />
                  {text}
                </a>
              ))}
            </div>
            {/* Social links */}
            <div style={{ display: "flex", gap: "8px", marginTop: "20px" }}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-surface-2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-text-muted)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(184, 147, 75, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(184, 147, 75, 0.3)";
                    e.currentTarget.style.color = "#B8934B";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--color-surface)";
                    e.currentTarget.style.borderColor = "var(--color-surface-2)";
                    e.currentTarget.style.color = "var(--color-text-muted)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text-primary)", marginBottom: "16px", letterSpacing: "0.05em" }}>
              Company
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8125rem",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text-primary)", marginBottom: "16px", letterSpacing: "0.05em" }}>
              Services
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8125rem",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text-primary)", marginBottom: "16px", letterSpacing: "0.05em" }}>
              Legal
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.8125rem",
                      color: "var(--color-text-secondary)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--color-surface)",
            paddingTop: "24px",
            paddingBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8rem",
              color: "#334155",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            © {new Date().getFullYear()} Zentrix Technology. Made with{" "}
            <Heart size={12} style={{ color: "#EC4899", fill: "#EC4899" }} /> in Salem, India.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "#334155" }}>
              v1.0.0
            </span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#334155" }}>
              Designed for the future
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          footer [style*="grid-template-columns: 2fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          footer [style*="grid-template-columns: 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
