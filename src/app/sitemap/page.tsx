import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { MapPin, Globe, ArrowRight, Shield, FileText, Layers, Briefcase, Bot } from "lucide-react";

export const metadata: Metadata = {
  title: `HTML Sitemap — All Pages & Solutions | ${siteConfig.name}`,
  description: "Browse all services, industry solutions, locations, case studies, and corporate resources of Zentrix Technology.",
  alternates: {
    canonical: `${siteConfig.url}/sitemap`,
  },
};

export default function VisualSitemapPage() {
  const mainPages = siteConfig.navigation.main;
  const services = siteConfig.services;

  const locations = [
    { id: "salem", name: "Salem (HQ)" },
    { id: "chennai", name: "Chennai" },
    { id: "coimbatore", name: "Coimbatore" },
    { id: "madurai", name: "Madurai" },
    { id: "trichy", name: "Trichy" },
    { id: "erode", name: "Erode" },
    { id: "namakkal", name: "Namakkal" },
    { id: "tiruppur", name: "Tiruppur" },
    { id: "hosur", name: "Hosur" },
    { id: "vellore", name: "Vellore" },
    { id: "tirunelveli", name: "Tirunelveli" },
    { id: "thanjavur", name: "Thanjavur" },
    { id: "karur", name: "Karur" },
    { id: "dindigul", name: "Dindigul" },
    { id: "kanchipuram", name: "Kanchipuram" },
    { id: "cuddalore", name: "Cuddalore" },
  ];

  const industries = [
    { id: "hospitals", name: "Hospitals & HMS" },
    { id: "healthcare", name: "Healthcare Clinics" },
    { id: "real-estate", name: "Real Estate & CRMs" },
    { id: "manufacturing", name: "Manufacturing ERP" },
    { id: "hotels", name: "Hotels & PMS" },
    { id: "retail", name: "Retail & E-Commerce" },
    { id: "education", name: "Education & School ERP" },
    { id: "finance", name: "Finance & FinTech" },
    { id: "construction", name: "Construction Site ERP" },
    { id: "travel", name: "Travel & Fleet Systems" },
  ];

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "140px 0 100px" }}>
      <div className="container-zentrix">
        <div style={{ textAlign: "center", maxWidth: "700px", margin: "0 auto 60px" }}>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              marginBottom: "16px",
            }}
          >
            Directory & Sitemap
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "var(--color-text-muted)" }}>
            Explore all available pages, services, regional locations, and industry solutions across Zentrix Technology.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "32px" }}>
          {/* Core Navigation */}
          <div style={{ padding: "32px", background: "var(--color-surface)", borderRadius: "24px", border: "1px solid var(--color-border)" }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "20px" }}>
              Core Pages
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {mainPages.map((p) => (
                <Link key={p.href} href={p.href} style={{ color: "var(--color-violet)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 600 }}>
                  {p.name} →
                </Link>
              ))}
              <Link href="/careers" style={{ color: "var(--color-violet)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 600 }}>
                Careers →
              </Link>
              <Link href="/privacy-policy" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.875rem" }}>
                Privacy Policy
              </Link>
              <Link href="/terms" style={{ color: "var(--color-text-muted)", textDecoration: "none", fontSize: "0.875rem" }}>
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Services */}
          <div style={{ padding: "32px", background: "var(--color-surface)", borderRadius: "24px", border: "1px solid var(--color-border)" }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "20px" }}>
              Services & Capabilities
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {services.map((s) => (
                <Link key={s.id} href={`/services/${s.id}`} style={{ color: "var(--color-text-primary)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
                  {s.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Industry Solutions */}
          <div style={{ padding: "32px", background: "var(--color-surface)", borderRadius: "24px", border: "1px solid var(--color-border)" }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "20px" }}>
              Industry Solutions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/industries" style={{ color: "var(--color-violet)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 700, marginBottom: "6px" }}>
                View All Industries →
              </Link>
              {industries.map((ind) => (
                <Link key={ind.id} href={`/industries/${ind.id}`} style={{ color: "var(--color-text-primary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  {ind.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div style={{ padding: "32px", background: "var(--color-surface)", borderRadius: "24px", border: "1px solid var(--color-border)" }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "20px" }}>
              Locations Serviced
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Link href="/locations" style={{ color: "var(--color-violet)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 700, marginBottom: "6px" }}>
                View All Locations →
              </Link>
              {locations.map((loc) => (
                <Link key={loc.id} href={`/locations/${loc.id}`} style={{ color: "var(--color-text-primary)", textDecoration: "none", fontSize: "0.9rem" }}>
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
