"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Hospital, Building2, Factory, Hotel, ShoppingBag, GraduationCap,
  Check, Zap, ArrowRight, Star, HelpCircle, Info
} from "lucide-react";
import { siteConfig } from "@/lib/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap = {
  "Hospital": Hospital,
  "Building2": Building2,
  "Factory": Factory,
  "Hotel": Hotel,
  "ShoppingBag": ShoppingBag,
  "GraduationCap": GraduationCap
};

interface IndustryFAQ {
  q: string;
  a: string;
}

interface IndustryFeature {
  title: string;
  desc: string;
}

interface IndustryData {
  name: string;
  title: string;
  tagline: string;
  description: string;
  painPoint: string;
  solution: string;
  iconName: string;
  color: string;
  features: IndustryFeature[];
  faqs: IndustryFAQ[];
  metrics: { label: string; value: string }[];
}

interface IndustryClientProps {
  industry: IndustryData;
  industrySlug: string;
}

export default function IndustryClient({ industry, industrySlug }: IndustryClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".fade-in-reveal",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(".card-reveal",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".grid-trigger",
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [industry]);

  const IndustryIcon = iconMap[industry.iconName as keyof typeof iconMap] || Building2;

  return (
    <div ref={containerRef} style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "140px 0 100px" }}>
      <div className="container-zentrix" ref={contentRef}>
        {/* Breadcrumb */}
        <div className="fade-in-reveal" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "32px" }}>
          <Link href="/" style={{ color: "var(--color-text-muted)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-violet)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>Home</Link>
          <span>/</span>
          <span style={{ color: "var(--color-text-muted)" }}>Industries</span>
          <span>/</span>
          <span style={{ color: "var(--color-violet)", fontWeight: 600 }}>{industry.name}</span>
        </div>

        {/* Hero split */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "40px", alignItems: "center", marginBottom: "64px" }}>
          <div>
            <div className="fade-in-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "100px", background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-violet)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "24px" }}>
              <IndustryIcon size={14} style={{ marginRight: 4 }} />
              <span>Focus Area</span>
            </div>

            <h1 className="fade-in-reveal" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4.5vw, 4.2rem)", lineHeight: 1.1, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "24px" }}>
              {industry.title}
            </h1>

            <p className="fade-in-reveal" style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.65, color: "var(--color-text-secondary)", marginBottom: "32px" }}>
              {industry.description}
            </p>

            {/* Metrics */}
            <div className="fade-in-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)", padding: "24px 0", marginBottom: "36px" }}>
              {industry.metrics.map((m, idx) => (
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

            <div className="fade-in-reveal" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px",
                  background: "var(--gradient-primary)", color: "#fff", borderRadius: "12px",
                  fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 25px var(--color-violet-glow)"
                }}
              >
                <Zap size={16} /> Consult with Founders <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Pain Point vs Solution block */}
          <div className="fade-in-reveal" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "24px", padding: "40px", boxShadow: "0 20px 40px rgba(110, 85, 40, 0.02)" }}>
            <div style={{ marginBottom: "28px" }}>
              <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--color-error)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "8px" }}>The Operational Pain Point</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
                {industry.painPoint}
              </p>
            </div>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "28px" }}>
              <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--color-success)", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "8px" }}>The Zentrix Solution</div>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.6, color: "var(--color-text-primary)", fontWeight: 500 }}>
                {industry.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div style={{ marginBottom: "96px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--color-text-primary)", textAlign: "center", marginBottom: "48px" }}>
            Key Software Capabilities
          </h2>
          <div className="grid-trigger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {industry.features.map((feat, i) => (
              <div key={i} className="card-reveal" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "16px", padding: "32px", boxShadow: "0 10px 30px rgba(110,85,40,0.02)" }}>
                <div style={{ width: 40, height: 40, borderRadius: "10px", background: "rgba(163,126,54,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-violet)", marginBottom: "20px" }}>
                  <Check size={18} />
                </div>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1.1rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>{feat.title}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: "800px", margin: "0 auto 80px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--color-text-primary)", textAlign: "center", marginBottom: "48px" }}>
            Industry Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {industry.faqs.map((faq, idx) => (
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
      </div>
    </div>
  );
}
