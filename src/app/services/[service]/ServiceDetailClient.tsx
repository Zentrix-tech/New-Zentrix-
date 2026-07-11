"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Globe, Smartphone, Bot, Building2, Eye, TrendingUp,
  Cpu, MessageSquare, Layers, Users, LayoutDashboard, Megaphone, Search,
  Zap, ArrowRight, Check, HelpCircle
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap = {
  "Globe": Globe,
  "Smartphone": Smartphone,
  "Bot": Bot,
  "Building2": Building2,
  "Eye": Eye,
  "TrendingUp": TrendingUp,
  "Cpu": Cpu,
  "MessageSquare": MessageSquare,
  "Layers": Layers,
  "Users": Users,
  "LayoutDashboard": LayoutDashboard,
  "Megaphone": Megaphone,
  "Search": Search
};

interface Feature {
  title: string;
  desc: string;
}

interface Metric {
  label: string;
  value: string;
}

interface ServiceDetail {
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  color: string;
  tags: string[];
  features: Feature[];
  metrics: Metric[];
  faqs: { q: string; a: string }[];
}

interface ServiceDetailClientProps {
  service: ServiceDetail;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const ServiceIcon = iconMap[service.iconName as keyof typeof iconMap] || Globe;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero sections entry
      gsap.fromTo(".hero-reveal", 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power4.out" }
      );

      // Features cards reveal on scroll
      if (gridRef.current) {
        gsap.fromTo(".feature-card-anim",
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Image clip-path expansion
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { clipPath: "inset(10% 10% round 32px)", scale: 0.95 },
          {
            clipPath: "inset(0% 0% round 24px)",
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
          }
        );
      }

      // CTA reveal
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [service]);

  return (
    <div ref={containerRef} style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "140px 0 100px" }}>
      <div className="container-zentrix">
        {/* Breadcrumb */}
        <div className="hero-reveal" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "32px" }}>
          <Link href="/services" style={{ color: "var(--color-text-muted)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-violet)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>Services</Link>
          <span>/</span>
          <span style={{ color: "var(--color-violet)", fontWeight: 600 }}>{service.title}</span>
        </div>

        {/* Hero Split Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "64px", alignItems: "center", marginBottom: "96px" }}>
          {/* Content Block */}
          <div ref={headerRef}>
            <div className="hero-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px", borderRadius: "100px", background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-violet)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "24px" }}>
              <ServiceIcon size={16} />
              <span>{service.tagline}</span>
            </div>

            <h1 className="hero-reveal" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.1, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "28px" }}>
              {service.title}
            </h1>

            <p className="hero-reveal" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(1rem, 1.2vw, 1.25rem)", lineHeight: 1.6, color: "var(--color-text-secondary)", marginBottom: "36px" }}>
              {service.description}
            </p>

            {/* Metrics Row */}
            <div className="hero-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "24px 0", marginBottom: "36px" }}>
              {service.metrics.map((m, idx) => (
                <div key={idx}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 600, color: "var(--color-violet)" }}>
                    {m.value}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Badges */}
            <div className="hero-reveal" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual Block */}
          <div
            ref={imageRef}
            className="project-visual-container"
            style={{
              width: "100%",
              aspectRatio: "4/3",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 20px 50px rgba(110, 85, 40, 0.04)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src={service.image}
              alt={service.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="service-image-hover"
            />
            {/* Ambient gold glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at center, rgba(163, 126, 54, 0.08) 0%, transparent 80%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>

        {/* Detailed Features Grid */}
        <div style={{ marginBottom: "120px" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "16px" }}>
              Key Specializations & Strategy
            </h2>
            <p style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)", fontSize: "1rem", maxWidth: "600px", margin: "0 auto" }}>
              Every feature we deliver is crafted for scalability, bulletproof performance, and premium business outcomes.
            </p>
          </div>

          <div ref={gridRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {service.features.map((f, i) => (
              <div
                key={i}
                className="feature-card-anim"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  padding: "32px",
                  boxShadow: "0 10px 30px rgba(110, 85, 40, 0.02)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(163, 126, 54, 0.3)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(163, 126, 54, 0.06)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(110, 85, 40, 0.02)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(163, 126, 54, 0.08)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "var(--color-violet)", marginBottom: "20px" }}>
                  <Check size={18} />
                </div>
                <h3 style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "12px" }}>
                  {f.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.5, color: "var(--color-text-secondary)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: "800px", margin: "0 auto 120px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--color-text-primary)", textAlign: "center", marginBottom: "48px" }}>
            Service Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {service.faqs.map((faq, idx) => (
              <div key={idx} style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "16px", padding: "28px" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px", color: "var(--color-text-primary)" }}>
                  <HelpCircle size={18} style={{ color: "var(--color-violet)", flexShrink: 0, marginTop: "2px" }} />
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1.05rem" }}>{faq.q}</h3>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--color-text-secondary)", paddingLeft: "30px" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          style={{
            background: "var(--color-surface-2)",
            border: "1px solid var(--color-border)",
            borderRadius: "24px",
            padding: "64px 32px",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(110, 85, 40, 0.02)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient gold glow */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background: "radial-gradient(circle at center, rgba(163, 126, 54, 0.04) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "20px", position: "relative", zIndex: 1 }}>
            Ready to Build Something Extraordinary?
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--color-text-secondary)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.6, position: "relative", zIndex: 1 }}>
            Let's discuss how we can accelerate your digital vision and build a high-performance ecosystem for your business.
          </p>

          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 28px",
              background: "var(--gradient-primary)",
              color: "#fff",
              borderRadius: "12px",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 8px 25px rgba(110, 85, 40, 0.15)",
              transition: "all 0.3s ease",
              position: "relative",
              zIndex: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(110, 85, 40, 0.25)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(110, 85, 40, 0.15)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Zap size={16} /> Get Started Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx global>{`
        .service-image-hover:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
