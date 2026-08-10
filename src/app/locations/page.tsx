import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { MapPin, ArrowRight, Building2, Zap, Phone, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Software Development Locations — Salem, Chennai, Coimbatore & Tamil Nadu | ${siteConfig.name}`,
  description: "Zentrix Technology provides software engineering, AI automation, HMS, and enterprise ERP development across Salem, Chennai, Coimbatore, Madurai, Trichy, and Tamil Nadu.",
  alternates: {
    canonical: `${siteConfig.url}/locations`,
  },
};

const locations = [
  {
    id: "salem",
    name: "Salem",
    tagline: "Headquarters & Engineering Hub",
    description: "Born in Salem — delivering hospital management systems, school ERPs, steel & textile ERPs, and custom software for local SMEs and institutions.",
    badge: "Main Office",
    highlight: true,
  },
  {
    id: "chennai",
    name: "Chennai",
    tagline: "SaaS & Automotive Enterprise Hub",
    description: "Empowering Chennai's SaaS startups, automotive manufacturers, and healthcare networks with scalable Next.js systems and AI agents.",
    badge: "Regional Hub",
    highlight: true,
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    tagline: "Industrial & Manufacturing ERP Center",
    description: "Engineering custom manufacturing ERP, barcode stock scanning, and supply chain automation for Coimbatore's industrial leaders.",
    badge: "Industrial Hub",
    highlight: true,
  },
  {
    id: "madurai",
    name: "Madurai",
    tagline: "Commercial & Educational Tech Hub",
    description: "Digitizing wholesale trade portals, college admissions, fee collection engines, and mobile apps across Southern Tamil Nadu.",
    badge: "Commercial Hub",
    highlight: true,
  },
  { id: "trichy", name: "Trichy", tagline: "Education & Public Enterprise", description: "Custom web development and institutional management portals." },
  { id: "erode", name: "Erode", tagline: "Textile & Agriculture ERP", description: "B2B order booking portals, inventory tracking, and billing automation." },
  { id: "namakkal", name: "Namakkal", tagline: "Logistics & Poultry Systems", description: "Fleet tracking software, poultry ledger automation, and localized ERPs." },
  { id: "tiruppur", name: "Tiruppur", tagline: "Export & Apparel ERP", description: "Production tracking software, buyer order ledgers, and export compliance tools." },
  { id: "hosur", name: "Hosur", tagline: "Electronics & Auto Tech", description: "High-speed API engineering, IoT machine logging, and supply chain platforms." },
  { id: "vellore", name: "Vellore", tagline: "Healthcare & Campus Tech", description: "Hospital portals, clinical appointment apps, and university management software." },
  { id: "tirunelveli", name: "Tirunelveli", tagline: "Regional Business Software", description: "Enterprise software, digital marketing, and local SEO acceleration." },
  { id: "thanjavur", name: "Thanjavur", tagline: "Agricultural & Institutional Tech", description: "Custom web applications and digital transformation portals." },
  { id: "karur", name: "Karur", tagline: "Textile Export Management", description: "Order tracking ledgers, export billing engines, and corporate websites." },
  { id: "dindigul", name: "Dindigul", tagline: "Manufacturing & Retail", description: "Inventory management software, GST billing, and Meta ad campaigns." },
  { id: "kanchipuram", name: "Kanchipuram", tagline: "Silk & Handloom Systems", description: "E-commerce web portals, inventory management, and digital identity." },
  { id: "cuddalore", name: "Cuddalore", tagline: "Industrial & Commercial Tech", description: "Custom business software, API development, and IT consulting." },
];

export default function LocationsIndexPage() {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "140px 0 100px" }}>
      <div className="container-zentrix">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 60px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              background: "rgba(184, 147, 75, 0.08)",
              border: "1px solid rgba(184, 147, 75, 0.2)",
              borderRadius: "100px",
              color: "var(--color-violet)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            <MapPin size={14} /> Regional Presence
          </div>
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}
          >
            Delivering Global-Grade Tech Directly to Local Hubs
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
            }}
          >
            With our primary engineering center in Salem and regional coverage across Chennai, Coimbatore, Madurai, and all key industrial hubs, Zentrix Technology supports businesses throughout South India.
          </p>
        </div>

        {/* Major Cities Section */}
        <div style={{ marginBottom: "60px" }}>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              marginBottom: "24px",
            }}
          >
            Primary Operational Hubs
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
              gap: "24px",
            }}
          >
            {locations.filter(l => l.highlight).map((loc) => (
              <Link
                key={loc.id}
                href={`/locations/${loc.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "32px",
                  background: "var(--color-surface)",
                  border: "1px solid rgba(184, 147, 75, 0.25)",
                  borderRadius: "24px",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: "0 10px 30px rgba(108, 78, 49, 0.05)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: "100px",
                      background: "rgba(184, 147, 75, 0.12)",
                      color: "var(--color-violet)",
                      textTransform: "uppercase",
                    }}
                  >
                    {loc.badge}
                  </span>
                  <MapPin size={20} style={{ color: "var(--color-violet)" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {loc.name}
                </h3>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-violet)", marginBottom: "12px" }}>
                  {loc.tagline}
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.6, flexGrow: 1, marginBottom: "20px" }}>
                  {loc.description}
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)" }}>
                  View {loc.name} Services <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Regional Coverage */}
        <div>
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              marginBottom: "24px",
            }}
          >
            All Cities & Districts Serviced
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))",
              gap: "16px",
            }}
          >
            {locations.filter(l => !l.highlight).map((loc) => (
              <Link
                key={loc.id}
                href={`/locations/${loc.id}`}
                style={{
                  padding: "20px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "16px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <MapPin size={16} style={{ color: "var(--color-text-secondary)" }} />
                  <span style={{ fontFamily: "Syne, sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)" }}>
                    {loc.name}
                  </span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", lineHeight: 1.4 }}>
                  {loc.tagline}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
