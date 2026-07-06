"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Globe, Smartphone, Building2, LayoutDashboard, Users, Hospital,
  GraduationCap, Package, Receipt, Bot, Workflow, Code2, Cloud,
  Server, Palette, TrendingUp, Megaphone, Search, Image, Video,
  Sparkles, Film, ArrowRight, Check, Zap, Shield, Rocket, Star
} from "lucide-react";

const services = [
  {
    id: "web-development",
    icon: Globe,
    color: "#6C4E31",
    gradient: "from-violet-600/10 to-violet-900/5",
    category: "Development",
    title: "Web Development",
    tagline: "Blazing-fast websites & web apps",
    description: "We build high-performance websites and web applications using React, Next.js, and modern technologies that rank on Google, load in milliseconds, and convert visitors into clients.",
    features: ["React & Next.js", "TypeScript", "SEO Optimized", "Core Web Vitals", "PWA Ready", "CMS Integration"],
    forWhom: "Startups, enterprises, and businesses that need a powerful online presence.",
  },
  {
    id: "app-development",
    icon: Smartphone,
    color: "#06B6D4",
    gradient: "from-cyan-600/10 to-cyan-900/5",
    category: "Development",
    title: "App Development",
    tagline: "Native-quality cross-platform apps",
    description: "From iOS to Android, we develop cross-platform mobile applications with Flutter and React Native that deliver smooth, native-quality experiences.",
    features: ["Flutter / React Native", "iOS & Android", "App Store Deployment", "Push Notifications", "Offline Support", "Real-time Sync"],
    forWhom: "Businesses wanting to reach customers on mobile with a premium app experience.",
  },
  {
    id: "enterprise-software",
    icon: Building2,
    color: "#EC4899",
    gradient: "from-pink-600/10 to-pink-900/5",
    category: "Enterprise",
    title: "Enterprise Software",
    tagline: "Scalable systems for growing companies",
    description: "Custom enterprise software solutions built to handle thousands of users, complex workflows, and mission-critical operations with 99.9% uptime.",
    features: ["Custom Architecture", "Role-based Access", "Audit Trails", "API Integration", "High Availability", "Enterprise Security"],
    forWhom: "Large organizations and scaling companies needing robust, custom-built software.",
  },
  {
    id: "erp",
    icon: LayoutDashboard,
    color: "#F59E0B",
    gradient: "from-amber-600/10 to-amber-900/5",
    category: "Enterprise",
    title: "Custom ERP",
    tagline: "Enterprise Resource Planning, your way",
    description: "End-to-end ERP systems covering HR, finance, inventory, production, and reporting — tailored to your exact business processes.",
    features: ["HR & Payroll", "Finance & Accounting", "Inventory", "Production", "Reporting", "Multi-branch"],
    forWhom: "Manufacturing, trading, and service companies that need unified business management.",
  },
  {
    id: "crm",
    icon: Users,
    color: "#10B981",
    gradient: "from-emerald-600/10 to-emerald-900/5",
    category: "Enterprise",
    title: "CRM Development",
    tagline: "Turn leads into loyal customers",
    description: "Custom CRM platforms that manage your entire customer journey — from lead capture to deal closing to long-term retention.",
    features: ["Lead Management", "Pipeline Tracking", "Email Automation", "Analytics", "Mobile CRM", "Integrations"],
    forWhom: "Sales-driven businesses and agencies wanting full control over their customer data.",
  },
  {
    id: "hospital-management",
    icon: Hospital,
    color: "#06B6D4",
    gradient: "from-cyan-600/10 to-cyan-900/5",
    category: "Healthcare",
    title: "Hospital Management System",
    tagline: "Digital health, simplified",
    description: "Comprehensive HMS covering OPD/IPD management, patient records, billing, pharmacy, lab integration, and doctor scheduling.",
    features: ["Patient Records", "Billing & Insurance", "Pharmacy Module", "Lab Integration", "Doctor Portal", "Reports & Analytics"],
    forWhom: "Hospitals, clinics, and healthcare organizations modernizing their operations.",
  },
  {
    id: "school-management",
    icon: GraduationCap,
    color: "#B8934B",
    gradient: "from-violet-500/10 to-violet-900/5",
    category: "Education",
    title: "School Management System",
    tagline: "Smart education management",
    description: "All-in-one school ERP covering admissions, attendance, timetable, exams, fees, library, and parent communication.",
    features: ["Admissions", "Attendance", "Exams & Marks", "Fee Management", "Parent App", "Library Module"],
    forWhom: "Schools, colleges, and educational institutions going digital.",
  },
  {
    id: "inventory",
    icon: Package,
    color: "#F59E0B",
    gradient: "from-amber-600/10 to-amber-900/5",
    category: "Enterprise",
    title: "Inventory Management",
    tagline: "Never lose track of stock again",
    description: "Smart inventory systems with barcode scanning, multi-warehouse support, purchase orders, and real-time stock tracking.",
    features: ["Barcode / QR", "Multi-warehouse", "Purchase Orders", "Stock Alerts", "Supplier Management", "Reports"],
    forWhom: "Retailers, wholesalers, and manufacturers managing physical inventory.",
  },
  {
    id: "billing",
    icon: Receipt,
    color: "#EC4899",
    gradient: "from-pink-600/10 to-pink-900/5",
    category: "Enterprise",
    title: "Billing Software",
    tagline: "Invoicing made effortless",
    description: "Professional billing and invoicing software with GST compliance, recurring invoices, payment tracking, and financial reports.",
    features: ["GST Compliance", "Recurring Invoices", "Payment Tracking", "Multi-currency", "PDF Export", "Client Portal"],
    forWhom: "Service providers, freelancers, and businesses needing streamlined billing.",
  },
  {
    id: "ai-automation",
    icon: Bot,
    color: "#6C4E31",
    gradient: "from-violet-600/10 to-violet-900/5",
    category: "AI & Automation",
    title: "AI Automation",
    tagline: "Work smarter with intelligent systems",
    description: "Machine learning pipelines, intelligent chatbots, data processing automation, and AI-powered decision systems built for scale.",
    features: ["ML Models", "NLP / Chatbots", "Data Processing", "Predictive Analytics", "Computer Vision", "Model Training"],
    forWhom: "Businesses ready to leverage AI to save time, reduce errors, and make smarter decisions.",
  },
  {
    id: "workflow-automation",
    icon: Workflow,
    color: "#06B6D4",
    gradient: "from-cyan-600/10 to-cyan-900/5",
    category: "AI & Automation",
    title: "Workflow Automation",
    tagline: "Automate repetitive tasks at scale",
    description: "End-to-end workflow automation connecting your tools, apps, and processes so your team can focus on what matters.",
    features: ["Process Mapping", "RPA Bots", "API Orchestration", "Notification Systems", "Approval Flows", "Analytics"],
    forWhom: "Operations-heavy businesses wanting to eliminate manual, repetitive work.",
  },
  {
    id: "api-development",
    icon: Code2,
    color: "#10B981",
    gradient: "from-emerald-600/10 to-emerald-900/5",
    category: "Development",
    title: "API Development",
    tagline: "Rock-solid APIs for any platform",
    description: "RESTful and GraphQL APIs built with Node.js, Python, and modern frameworks — documented, secured, and built to last.",
    features: ["REST & GraphQL", "Authentication / JWT", "Rate Limiting", "Documentation", "Webhooks", "SDK Generation"],
    forWhom: "SaaS products, mobile apps, and businesses needing reliable backend APIs.",
  },
  {
    id: "cloud-solutions",
    icon: Cloud,
    color: "#F59E0B",
    gradient: "from-amber-600/10 to-amber-900/5",
    category: "Cloud & DevOps",
    title: "Cloud Solutions",
    tagline: "Scalable infrastructure on demand",
    description: "AWS, GCP, and Azure cloud architecture that scales with your business — from startup MVPs to enterprise platforms.",
    features: ["AWS / GCP / Azure", "Serverless", "Auto-scaling", "CDN Setup", "Cost Optimization", "Migration"],
    forWhom: "Growing businesses moving to cloud or scaling their existing infrastructure.",
  },
  {
    id: "devops",
    icon: Server,
    color: "#B8934B",
    gradient: "from-violet-500/10 to-violet-900/5",
    category: "Cloud & DevOps",
    title: "DevOps",
    tagline: "Deploy faster, ship with confidence",
    description: "CI/CD pipelines, Docker containerization, Kubernetes orchestration, and infrastructure as code for modern development teams.",
    features: ["CI/CD Pipelines", "Docker / K8s", "Monitoring", "Infrastructure as Code", "Zero-downtime Deploys", "Security Scanning"],
    forWhom: "Engineering teams wanting faster, more reliable deployment workflows.",
  },
  {
    id: "ui-ux-design",
    icon: Palette,
    color: "#EC4899",
    gradient: "from-pink-600/10 to-pink-900/5",
    category: "Design & Marketing",
    title: "UI/UX Design",
    tagline: "Designs that people love to use",
    description: "Awwwards-level UI/UX design — research-backed, pixel-perfect interfaces that delight users and drive conversions.",
    features: ["User Research", "Wireframing", "Figma Design", "Prototyping", "Design Systems", "Usability Testing"],
    forWhom: "Products and companies that want their software to look and feel world-class.",
  },
  {
    id: "seo",
    icon: TrendingUp,
    color: "#10B981",
    gradient: "from-emerald-600/10 to-emerald-900/5",
    category: "Design & Marketing",
    title: "SEO Optimization",
    tagline: "Rank higher, get found faster",
    description: "Technical SEO, content strategy, and link building that sustainably grows your organic traffic and domain authority.",
    features: ["Technical SEO", "Keyword Strategy", "Content Audit", "Link Building", "Local SEO", "Monthly Reports"],
    forWhom: "Businesses that want to grow organically without depending entirely on paid ads.",
  },
  {
    id: "meta-ads",
    icon: Megaphone,
    color: "#6C4E31",
    gradient: "from-violet-600/10 to-violet-900/5",
    category: "Design & Marketing",
    title: "Meta Ads Management",
    tagline: "Facebook & Instagram ads that convert",
    description: "Expert Meta advertising across Facebook and Instagram — audience targeting, creative testing, and ROAS-focused optimization.",
    features: ["Campaign Strategy", "Audience Targeting", "Creative Design", "A/B Testing", "Retargeting", "ROI Reporting"],
    forWhom: "E-commerce, service businesses, and brands wanting to grow through social advertising.",
  },
  {
    id: "google-ads",
    icon: Search,
    color: "#F59E0B",
    gradient: "from-amber-600/10 to-amber-900/5",
    category: "Design & Marketing",
    title: "Google Ads",
    tagline: "Show up when customers search",
    description: "Google Search, Display, Shopping, and YouTube campaigns managed for maximum clicks, leads, and conversions at optimal cost.",
    features: ["Search Campaigns", "Display Network", "Shopping Ads", "YouTube Ads", "Conversion Tracking", "Budget Optimization"],
    forWhom: "Businesses wanting immediate traffic and leads through Google&apos;s advertising ecosystem.",
  },
  {
    id: "poster-design",
    icon: Image,
    color: "#06B6D4",
    gradient: "from-cyan-600/10 to-cyan-900/5",
    category: "Design & Marketing",
    title: "Poster Designing",
    tagline: "Visuals that stop the scroll",
    description: "Eye-catching poster and graphic designs for social media, print, events, and marketing campaigns that make your brand stand out.",
    features: ["Social Media Posts", "Print Materials", "Event Posters", "Infographics", "Brand Consistency", "Quick Turnaround"],
    forWhom: "Brands and businesses needing high-quality visual content consistently.",
  },
  {
    id: "video-editing",
    icon: Video,
    color: "#B8934B",
    gradient: "from-violet-500/10 to-violet-900/5",
    category: "Design & Marketing",
    title: "Video Editing",
    tagline: "Videos that tell your story",
    description: "Professional video editing for social media reels, corporate videos, product demos, and marketing content that engages your audience.",
    features: ["Reels & Shorts", "Corporate Videos", "Product Demos", "Motion Text", "Color Grading", "Subtitles"],
    forWhom: "Content creators, brands, and businesses wanting video to drive engagement.",
  },
  {
    id: "brand-identity",
    icon: Sparkles,
    color: "#EC4899",
    gradient: "from-pink-600/10 to-pink-900/5",
    category: "Design & Marketing",
    title: "Brand Identity",
    tagline: "A brand that commands respect",
    description: "Complete brand identity design — logo, color system, typography, guidelines, and all brand touchpoints that make you unforgettable.",
    features: ["Logo Design", "Color & Typography", "Brand Guidelines", "Business Cards", "Stationery", "Brand Strategy"],
    forWhom: "New businesses and companies rebranding for a premium market position.",
  },
  {
    id: "motion-graphics",
    icon: Film,
    color: "#6C4E31",
    gradient: "from-violet-600/10 to-violet-900/5",
    category: "Design & Marketing",
    title: "Motion Graphics",
    tagline: "Animate your brand to life",
    description: "Dynamic motion graphics and animated content for video intros, explainer animations, UI animations, and social media content.",
    features: ["Logo Animation", "Explainer Videos", "UI Animations", "Transition Effects", "Lower Thirds", "Social Content"],
    forWhom: "Brands wanting to stand out with animated, memorable visual content.",
  },
];

const categories = ["All", "Development", "Enterprise", "Healthcare", "Education", "AI & Automation", "Cloud & DevOps", "Design & Marketing"];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `linear-gradient(135deg, ${service.color}10, ${service.color}04)` : "var(--color-surface)",
        border: `1px solid ${hovered ? service.color + "35" : "var(--color-surface-2)"}`,
        borderRadius: "24px",
        padding: "36px",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? `0 24px 60px ${service.color}15` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Category badge */}
      <div style={{ marginBottom: "16px" }}>
        <span
          style={{
            padding: "3px 10px",
            background: `${service.color}12`,
            border: `1px solid ${service.color}22`,
            borderRadius: "100px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: service.color,
          }}
        >
          {service.category}
        </span>
      </div>

      {/* Icon */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "16px",
          background: `${service.color}12`,
          border: `1px solid ${service.color}25`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          transition: "all 0.3s ease",
          boxShadow: hovered ? `0 0 25px ${service.color}25` : "none",
        }}
      >
        <Icon size={26} style={{ color: service.color }} />
      </div>

      <h3
        style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: "1.25rem",
          color: "var(--color-text-primary)",
          marginBottom: "6px",
          letterSpacing: "-0.01em",
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.8rem",
          color: service.color,
          fontWeight: 600,
          marginBottom: "12px",
          letterSpacing: "0.01em",
        }}
      >
        {service.tagline}
      </p>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "0.875rem",
          color: "var(--color-text-muted)",
          lineHeight: 1.65,
          marginBottom: "20px",
        }}
      >
        {service.description}
      </p>

      {/* Features */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
        {service.features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Check size={12} style={{ color: service.color }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{f}</span>
          </div>
        ))}
      </div>

      <Link
        href={`/services/${service.id}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "Inter, sans-serif",
          fontSize: "0.875rem",
          fontWeight: 600,
          color: service.color,
          textDecoration: "none",
        }}
      >
        View Details <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filtered =
    activeCategory === "All"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        style={{
          padding: "160px 0 80px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
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
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />

        <div className="container-zentrix" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              border: "1px solid rgba(184, 147, 75, 0.3)",
              borderRadius: "100px",
              marginBottom: "24px",
              background: "rgba(184, 147, 75, 0.08)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8934B" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8934B" }}>
              22 Premium Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.8rem, 7vw, 7rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "24px",
            }}
          >
            <span style={{ color: "var(--color-text-primary)" }}>Everything You Need</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6C4E31, #B8934B, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Under One Roof
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "580px",
              margin: "0 auto 48px",
            }}
          >
            From web development to AI automation, enterprise software to brand identity — Zentrix Technology is your end-to-end digital transformation partner.
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{
              display: "flex",
              gap: "clamp(20px, 4vw, 48px)",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "22", label: "Services Offered" },
              { value: "7+", label: "Projects Delivered" },
              { value: "100%", label: "Satisfaction Rate" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#B8934B" }}>{s.value}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <div
        style={{
          position: "sticky",
          top: "64px",
          zIndex: 10,
          background: "rgba(5,5,8,0.9)",
          backdropFilter: "blur(40px)",
          borderBottom: "1px solid var(--color-surface)",
          padding: "16px 0",
        }}
      >
        <div className="container-zentrix">
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "100px",
                  border: activeCategory === cat ? "1px solid rgba(184,147,75,0.5)" : "1px solid var(--color-surface-2)",
                  background: activeCategory === cat ? "rgba(184,147,75,0.15)" : "transparent",
                  color: activeCategory === cat ? "#B8934B" : "var(--color-text-muted)",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <section style={{ padding: "60px 0 clamp(80px,10vw,140px)" }}>
        <div className="container-zentrix">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "20px",
            }}
          >
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(60px,8vw,100px) 0",
          background: "var(--color-bg)",
          textAlign: "center",
          borderTop: "1px solid var(--color-surface)",
        }}
      >
        <div className="container-zentrix">
          <h2
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            Not sure which service you need?
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", color: "var(--color-text-muted)", marginBottom: "32px" }}>
            Let&apos;s have a free consultation call — we&apos;ll map out the perfect solution for your business.
          </p>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 40px",
              background: "linear-gradient(135deg, #6C4E31, #B8934B)",
              color: "#fff",
              borderRadius: "100px",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              textDecoration: "none",
              boxShadow: "0 20px 60px rgba(184,147,75,0.35)",
            }}
          >
            <Zap size={18} /> Book Free Consultation
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 640px) {
          [style*="grid-template-columns: repeat(auto-fill, minmax(340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
