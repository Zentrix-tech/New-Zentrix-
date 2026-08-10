import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import {
  Hospital, Building2, Factory, Hotel, ShoppingBag,
  GraduationCap, Landmark, HardHat, Plane, ArrowRight, Zap, CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: `Industry Solutions — Specialized Enterprise Software & AI | ${siteConfig.name}`,
  description: "Zentrix Technology builds bespoke software, HMS, manufacturing ERP, real estate CRM, and AI automation tailored for key industries across India.",
  alternates: {
    canonical: `${siteConfig.url}/industries`,
  },
};

const industries = [
  {
    id: "hospitals",
    name: "Hospitals & Healthcare",
    tagline: "HMS, EMR, & OPD Queue Automation",
    description: "Streamline patient management, automate medical records, integrate laboratory portals, and accelerate insurance claims.",
    icon: Hospital,
    color: "#EC4899",
    stats: "50% Wait Time Reduction",
  },
  {
    id: "healthcare",
    name: "Specialty Clinics",
    tagline: "Clinic CRM & Telehealth Systems",
    description: "Connect healthcare providers with automated patient reminders, diagnostic report delivery, and voice AI appointment booking.",
    icon: Hospital,
    color: "#06B6D4",
    stats: "30% Attendance Lift",
  },
  {
    id: "real-estate",
    name: "Real Estate & Builders",
    tagline: "Property CRMs & AI Lead Qualification",
    description: "Auto-qualify property leads on WhatsApp, schedule site visits, manage broker commissions, and display interactive 3D floor plans.",
    icon: Building2,
    color: "#A37E36",
    stats: "2.5x Site Visits",
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Factories",
    tagline: "Custom Manufacturing ERP & Inventory",
    description: "Optimize raw material procurement, track multi-warehouse inventory with barcodes/QR, and monitor machine maintenance.",
    icon: Factory,
    color: "#6E5528",
    stats: "99.8% Stock Accuracy",
  },
  {
    id: "hotels",
    name: "Hotels & Hospitality",
    tagline: "Direct Booking Engine & Hotel PMS",
    description: "Reduce OTA commissions with direct web booking, room cleaners scheduling, and WhatsApp guest virtual concierge bots.",
    icon: Hotel,
    color: "#C4A15E",
    stats: "+45% Direct Bookings",
  },
  {
    id: "retail",
    name: "Retail & E-Commerce",
    tagline: "Omnichannel Retail Systems",
    description: "High-converting web portals, AI cart recovery, unified inventory ledgers, and automated GST billing engines.",
    icon: ShoppingBag,
    color: "#10B981",
    stats: "+22% Cart Recovery",
  },
  {
    id: "education",
    name: "Education & Institutions",
    tagline: "School & College Management ERP",
    description: "Digitize student admissions, fee reminders via UPI/WhatsApp, parent portals, and administrative mark ledgers.",
    icon: GraduationCap,
    color: "#8B5CF6",
    stats: "+95% Fee Collection",
  },
  {
    id: "finance",
    name: "Finance & Banking",
    tagline: "Secure FinTech & Loan Portals",
    description: "Bespoke compliance dashboards, customer KYC automation, loan origination systems, and secure API gateways.",
    icon: Landmark,
    color: "#3B82F6",
    stats: "100% Audit Compliance",
  },
  {
    id: "construction",
    name: "Construction & Infrastructure",
    tagline: "Site Inventory & Material Tracking",
    description: "Track site material usage, contractor billing, equipment logs, and project timeline milestones in real time.",
    icon: HardHat,
    color: "#F59E0B",
    stats: "Zero Delay Logging",
  },
  {
    id: "travel",
    name: "Travel & Logistics",
    tagline: "Fleet & Reservation Systems",
    description: "Automated booking dispatch, GPS route tracking, passenger notification bots, and dynamic pricing engines.",
    icon: Plane,
    color: "#06B6D4",
    stats: "3x Dispatch Speed",
  },
];

export default function IndustriesIndexPage() {
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
            <Zap size={14} /> Industry Expertise
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
            Engineered for Your Industry&apos;s Specific Workflows
          </h1>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
            }}
          >
            We don&apos;t build generic software. We engineer specialized platforms designed around the exact operational demands of healthcare, manufacturing, real estate, education, and retail.
          </p>
        </div>

        {/* Industry Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "24px",
            marginBottom: "80px",
          }}
        >
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <Link
                key={ind.id}
                href={`/industries/${ind.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "32px",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "24px",
                  textDecoration: "none",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      background: `${ind.color}15`,
                      border: `1px solid ${ind.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: ind.color,
                    }}
                  >
                    <Icon size={24} />
                  </div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "JetBrains Mono, monospace",
                      padding: "4px 10px",
                      borderRadius: "100px",
                      background: "rgba(108, 78, 49, 0.05)",
                      color: "var(--color-text-secondary)",
                      border: "1px solid rgba(108, 78, 49, 0.1)",
                    }}
                  >
                    {ind.stats}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    marginBottom: "6px",
                  }}
                >
                  {ind.name}
                </h3>

                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: ind.color,
                    marginBottom: "12px",
                  }}
                >
                  {ind.tagline}
                </div>

                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                    flexGrow: 1,
                  }}
                >
                  {ind.description}
                </p>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                  }}
                >
                  Explore Industry Solutions <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            padding: "48px",
            background: "linear-gradient(135deg, rgba(184, 147, 75, 0.08), rgba(108, 78, 49, 0.05))",
            border: "1px solid rgba(184, 147, 75, 0.2)",
            borderRadius: "32px",
            textAlign: "center",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "1.8rem",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              marginBottom: "12px",
            }}
          >
            Don&apos;t See Your Industry Listed?
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              color: "var(--color-text-muted)",
              marginBottom: "24px",
              maxWidth: "600px",
              margin: "0 auto 24px",
            }}
          >
            We engineer bespoke software architecture for custom business workflows across all sectors. Tell us about your operational challenges.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              background: "var(--gradient-primary)",
              color: "#fff",
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(108, 78, 49, 0.2)",
            }}
          >
            Schedule a Custom Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
