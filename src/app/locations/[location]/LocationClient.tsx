"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  MapPin, MessageSquare, Check, Zap, ArrowRight, Star, HelpCircle, Info
} from "lucide-react";
import { siteConfig } from "@/lib/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LocalFAQ {
  q: string;
  a: string;
}

interface LocalTestimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

interface LocationData {
  name: string;
  title: string;
  tagline: string;
  description: string;
  marketContext: string;
  landmarks: string[];
  lat: number;
  lng: number;
  phone: string;
  address: string;
  testimonials: LocalTestimonial[];
  faqs: LocalFAQ[];
  specialties: string[];
}

interface LocationClientProps {
  location: LocationData;
  locationSlug: string;
}

export default function LocationClient({ location, locationSlug }: LocationClientProps) {
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
  }, [location]);

  return (
    <div ref={containerRef} style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "140px 0 100px" }}>
      <div className="container-zentrix" ref={contentRef}>
        {/* Breadcrumb */}
        <div className="fade-in-reveal" style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "32px" }}>
          <Link href="/" style={{ color: "var(--color-text-muted)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-violet)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-muted)"}>Home</Link>
          <span>/</span>
          <span style={{ color: "var(--color-text-muted)" }}>Locations</span>
          <span>/</span>
          <span style={{ color: "var(--color-violet)", fontWeight: 600 }}>{location.name}</span>
        </div>

        {/* Hero split */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "40px", alignItems: "center", marginBottom: "64px" }}>
          <div>
            <div className="fade-in-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "100px", background: "var(--color-surface-2)", border: "1px solid var(--color-border)", color: "var(--color-violet)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "24px" }}>
              <MapPin size={14} />
              <span>Zentrix {location.name}</span>
            </div>

            <h1 className="fade-in-reveal" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 4.5vw, 4.2rem)", lineHeight: 1.1, fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "24px" }}>
              {location.title}
            </h1>

            <p className="fade-in-reveal" style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", lineHeight: 1.65, color: "var(--color-text-secondary)", marginBottom: "32px" }}>
              {location.description}
            </p>

            <div className="fade-in-reveal" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px",
                  background: "var(--gradient-primary)", color: "#fff", borderRadius: "12px",
                  fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 25px var(--color-violet-glow)"
                }}
              >
                <Zap size={16} /> Free consultation <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hi Zentrix! I'd like to discuss a software project in ${location.name}.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px",
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                  color: "#10B981", borderRadius: "12px", fontWeight: 600, textDecoration: "none"
                }}
              >
                <MessageSquare size={16} /> WhatsApp Inquiry
              </a>
            </div>
          </div>

          {/* Market context card */}
          <div className="fade-in-reveal" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "24px", padding: "40px", boxShadow: "0 20px 40px rgba(110, 85, 40, 0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--color-violet)", marginBottom: "16px" }}>
              <Info size={20} />
              <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1.1rem" }}>Local Market Context</h3>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.65, color: "var(--color-text-secondary)", marginBottom: "24px" }}>
              {location.marketContext}
            </p>
            <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "20px" }}>
              <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "12px" }}>Serviced Hubs & landmarks</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {location.landmarks.map((l) => (
                  <li key={l} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--color-text-primary)", fontWeight: 500 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--color-violet)" }} />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* City specialties */}
        <div style={{ marginBottom: "96px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--color-text-primary)", textAlign: "center", marginBottom: "48px" }}>
            Targeted AI & Software Solutions for {location.name}
          </h2>
          <div className="grid-trigger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {location.specialties.map((spec, i) => (
              <div key={i} className="card-reveal" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "16px", padding: "28px", boxShadow: "0 10px 30px rgba(110,85,40,0.02)" }}>
                <div style={{ width: 36, height: 36, borderRadius: "8px", background: "rgba(163,126,54,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-violet)", marginBottom: "16px" }}>
                  <Check size={16} />
                </div>
                <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem", color: "var(--color-text-primary)", marginBottom: "8px" }}>{spec}</h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  Bespoke, enterprise-ready implementation optimized specifically to target local business requirements.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Local Testimonials */}
        <div style={{ marginBottom: "96px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--color-text-primary)", textAlign: "center", marginBottom: "48px" }}>
            Client Success in {location.name}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "24px" }}>
            {location.testimonials.map((t, idx) => (
              <div key={idx} style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRadius: "20px", padding: "32px", boxShadow: "0 10px 30px rgba(110,85,40,0.01)" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />)}
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "20px", fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.9rem", color: "var(--color-text-primary)" }}>{t.name}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{t.role} @ {t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: "800px", margin: "0 auto 80px" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 3.5vw, 2.8rem)", color: "var(--color-text-primary)", textAlign: "center", marginBottom: "48px" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {location.faqs.map((faq, idx) => (
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

        {/* Map mockup */}
        <div style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)", borderRadius: "24px", padding: "40px 32px", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <MapPin size={36} style={{ color: "var(--color-violet)", margin: "0 auto 20px" }} />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>Visit Zentrix {location.name}</h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--color-text-secondary)", marginBottom: "20px" }}>{location.address}</p>
            <div style={{ display: "inline-flex", gap: "24px", flexWrap: "wrap", justifyContent: "center", fontSize: "0.8rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
              <span>LATITUDE: {location.lat}</span>
              <span>LONGITUDE: {location.lng}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
