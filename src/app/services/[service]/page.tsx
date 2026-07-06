"use client";

import { useEffect, useRef, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Globe, Smartphone, Bot, Building2, Eye, TrendingUp,
  Cpu, Shield, Sparkles, Layers, ArrowRight, Zap, Check
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  icon: any;
  image: string;
  color: string;
  tags: string[];
  features: Feature[];
  metrics: Metric[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "web-development": {
    title: "Web Development",
    tagline: "High-Performance Digital Flagships",
    description: "We engineer pixel-perfect, lightning-fast web applications. Utilizing modern SSR frameworks like Next.js and robust backend services, we ensure that your digital ecosystem is fast, responsive, and ready to scale with your business.",
    icon: Globe,
    image: "/services/web_development.png",
    color: "#A37E36",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
    features: [
      { title: "Server-Side Rendering", desc: "Optimal SEO indexation and near-instant initial page loads." },
      { title: "Static Site Generation", desc: "Global CDN caching for lightning-fast delivery." },
      { title: "Custom API Integrations", desc: "Robust data orchestration and secure backend microservices." },
      { title: "Responsive Layouts", desc: "Fluid experiences across mobile, tablet, and ultra-wide desktops." }
    ],
    metrics: [
      { label: "Performance Index", value: "99/100" },
      { label: "Load Velocity", value: "<0.8s" },
      { label: "Conversion Lift", value: "+32%" }
    ]
  },
  "app-development": {
    title: "App Development",
    tagline: "Native & Cross-Platform Mobile Architectures",
    description: "We build intuitive, high-performance mobile apps for iOS and Android. By leveraging tools like Flutter and React Native, we deliver native-speed performance with clean UX layouts, keeping your customers connected on the go.",
    icon: Smartphone,
    image: "/services/app_development.png",
    color: "#EC4899",
    tags: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
    features: [
      { title: "Single-Codebase Efficiency", desc: "Simultaneous iOS and Android development with zero feature lag." },
      { title: "Offline Capabilities", desc: "Local database sync lets users operate without internet connectivity." },
      { title: "Biometric Authentication", desc: "High-end security with FaceID, TouchID, and custom encryption." },
      { title: "Native Feature Bindings", desc: "Direct access to camera, Bluetooth, notifications, and location." }
    ],
    metrics: [
      { label: "Crash-Free Rate", value: "99.9%" },
      { label: "App Store Rating", value: "4.8★" },
      { label: "Engagement Lift", value: "+45%" }
    ]
  },
  "ai-automation": {
    title: "AI Automation",
    tagline: "Workflow Acceleration & Cognitive Computing",
    description: "We automate complex business workflows using advanced AI and Machine Learning. From intelligent classification pipelines to automated content synthesis, we help you save thousands of operational hours.",
    icon: Bot,
    image: "/services/ai_automation.png",
    color: "#10B981",
    tags: ["Python", "PyTorch", "HuggingFace", "FastAPI", "OpenAI"],
    features: [
      { title: "Intelligent Document Parsing", desc: "Extract unstructured text, invoices, and files automatically." },
      { title: "Predictive Analytics", desc: "Forecast demand patterns and user behaviors with high precision." },
      { title: "Automated Data Pipelines", desc: "Connect legacy systems to modern neural API layers." },
      { title: "Custom Agent Frameworks", desc: "Deploy cognitive agents capable of handling complex service tickets." }
    ],
    metrics: [
      { label: "Operation Overhead", value: "-60%" },
      { label: "Pipeline Speed", value: "10x" },
      { label: "Model Accuracy", value: "98.5%" }
    ]
  },
  "enterprise-software": {
    title: "Enterprise Software",
    tagline: "Scalable Systems & Mission-Critical Architecture",
    description: "We engineer resilient, large-scale custom systems (ERP, CRM, and bespoke business infrastructure). We focus on database integrity, secure API integrations, and intuitive administrative panels.",
    icon: Building2,
    image: "/services/enterprise_software.png",
    color: "#3B82F6",
    tags: ["Java", "Go", "PostgreSQL", "Docker", "AWS"],
    features: [
      { title: "Bespoke ERP & CRM Systems", desc: "Custom business management software built for your workflows." },
      { title: "High-Availability Database Design", desc: "Sharded and replicated structures for zero data loss." },
      { title: "Role-Based Access Control", desc: "Enterprise security architecture with granular permissions." },
      { title: "Automated Compliance Auditing", desc: "Keep track of all actions and modifications within the network." }
    ],
    metrics: [
      { label: "Uptime SLA Guarantee", value: "99.99%" },
      { label: "Throughput Capacity", value: "50K req/s" },
      { label: "Legacy Migration", value: "100% Sync" }
    ]
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    tagline: "High-End Visual Identity & Digital Finery",
    description: "We design websites and apps that wow at first glance. Using best practices in modern digital typography, layout geometry, custom motion frameworks, and interactive prototypes, we make your brand unforgettable.",
    icon: Eye,
    image: "/services/ui_ux_design.png",
    color: "#F59E0B",
    tags: ["Figma", "Adobe CC", "Spline", "Principle", "Lottie"],
    features: [
      { title: "Aesthetic Brand Direction", desc: "Cohesive typography, color guidelines, and brand systems." },
      { title: "High-Fidelity Prototyping", desc: "Interactive mockups that simulate final production code." },
      { title: "Custom Interaction Motion", desc: "Micro-animations that delight visitors and boost retention." },
      { title: "Accessibility Testing", desc: "Full WCAG compliance checks for contrast and screen reader support." }
    ],
    metrics: [
      { label: "Session Duration", value: "+240%" },
      { label: "User Delight Factor", value: "9.8/10" },
      { label: "Bounce Rate Reduction", value: "-35%" }
    ]
  },
  "seo": {
    title: "Digital Marketing & SEO",
    tagline: "Visibility, Lead Acceleration & Strategic Growth",
    description: "We boost search engine visibility and execute high-yielding lead generation campaigns. From deep technical SEO auditing to high-ROI Meta and Google Ads, we accelerate your digital traffic.",
    icon: TrendingUp,
    image: "/services/seo_marketing.png",
    color: "#EC4899",
    tags: ["SEO Core", "Meta Ads", "Google Ads", "Analytics", "Intake Pages"],
    features: [
      { title: "Technical SEO Audits", desc: "Wipe out crawl errors, schema problems, and slow load times." },
      { title: "Localized Ad Campaigns", desc: "Target specific cities, demographics, and high-value buyers." },
      { title: "Conversion Intake Optimization", desc: "Design landing pages optimized to turn visits into leads." },
      { title: "Comprehensive KPI Reporting", desc: "Clean attribution dashboards showing true ROI and cost per lead." }
    ],
    metrics: [
      { label: "Cost Per Lead Reduction", value: "-60%" },
      { label: "Organic Rank Lift", value: "3.5x" },
      { label: "Paid Campaign ROI", value: "4.8x" }
    ]
  }
};

interface PageProps {
  params: Promise<{ service: string }>;
}

export default function ServicePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const serviceSlug = resolvedParams.service;
  const service = serviceDetails[serviceSlug];

  if (!service) {
    notFound();
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const ServiceIcon = service.icon;

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
  }, [serviceSlug]);

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
