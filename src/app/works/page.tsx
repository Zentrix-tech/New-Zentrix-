"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ExternalLink, ArrowRight, Filter, Play, ChevronRight,
  Globe, Smartphone, Bot, Building2, GraduationCap, Hospital,
  TrendingUp, Shield, Zap, Check
} from "lucide-react";

const projects = [
  {
    id: "avs-engg-college",
    title: "AVS Engineering College Portal",
    client: "AVS Engineering College",
    category: "Education",
    year: "2026",
    link: "https://www.avsenggcollege.ac.in/",
    image: "/work_avs_engg.png",
    color: "#A37E36",
    gradient: "linear-gradient(135deg, rgba(163,126,54,0.15), rgba(163,126,54,0.03))",
    description: "Comprehensive web infrastructure for AVS Engineering College, supporting academic notices, placement portals, online admissions, and department sites.",
    problem: "An old legacy PHP site that was difficult to maintain and had sluggish load times.",
    solution: "Re-engineered the entire core platform on a modern, high-performance tech stack, simplifying management and boosting page speed by 75%.",
    result: "Easy content updating for departments, load times cut by 75%, secure database sync.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    metrics: [
      { label: "Load Time Reduction", value: "75%" },
      { label: "Admin Update Speed", value: "3x" },
      { label: "Mobile Responsiveness", value: "100%" },
    ],
    icon: GraduationCap,
  },
  {
    id: "sakthi-kailash-college",
    title: "Sakthi Kailash Women's College",
    client: "Sakthi Kailash College",
    category: "Education",
    year: "2026",
    link: "https://www.sakthikailashcollege.org/",
    image: "/work_sakthi_kailash.png",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, rgba(108,78,49,0.15), rgba(108,78,49,0.03))",
    description: "Custom institutional website for Sakthi Kailash Women's College, highlighting courses, placement records, achievements, and departments.",
    problem: "Outdated website design that did not represent the premium infrastructure and placement quality of the institution.",
    solution: "Built a stunning, accessible web experience showcasing placement success, departmental profiles, and student campus achievements with dynamic gallery nodes.",
    result: "Enhanced digital brand identity, increased parent-student web traffic by 180%, clean responsive design.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: [
      { label: "Web Inbound Traffic", value: "+180%" },
      { label: "Page Speed Optimized", value: "95%" },
      { label: "Mobile Engagement", value: "99%" },
    ],
    icon: GraduationCap,
  },
  {
    id: "avs-college-omalur",
    title: "AVS College of Arts & Science",
    client: "AVS College, Omalur",
    category: "Education",
    year: "2026",
    link: "https://www.avscollegeomalur.edu.in/",
    image: "/work_avs_omalur.png",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, rgba(184,147,75,0.15), rgba(184,147,75,0.03))",
    description: "Official institutional web platform and student portal for AVS College of Arts & Science, providing access to academic resources, admissions, and college news.",
    problem: "The institution required a modernized, highly performant, and secure platform to represent the college online and handle heavy student traffic during admissions.",
    solution: "Designed and engineered a premium web portal with fast page loads, clean interface architecture, administrative portal endpoints, and complete mobile responsiveness.",
    result: "Significant boost in enrollment queries, clean user interface, zero downtime during high-traffic results publication.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js"],
    metrics: [
      { label: "Performance Score", value: "98%" },
      { label: "Query Inbound Rise", value: "2.5x" },
      { label: "Downtime Reduced", value: "100%" },
    ],
    icon: GraduationCap,
  },
  {
    id: "hashprime",
    title: "HashPrime Platform",
    client: "HashPrime Technologies",
    category: "Technology",
    year: "2026",
    link: "https://www.hashprime.in/",
    image: "/work_hashprime.png",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.03))",
    description: "Advanced corporate website for HashPrime, showcasing services, technical consultation portfolio, and digital solutions.",
    problem: "Needed a corporate website that reflected their authority and technical capabilities in premium custom development.",
    solution: "Developed a high-end corporate portal featuring crisp typography, glass panels, dark modes, and modular case study builders.",
    result: "Direct inbound enterprise leads increased by 45%, high lead-to-conversion rates.",
    tags: ["React", "Next.js", "Tailwind CSS", "Prisma"],
    metrics: [
      { label: "Lead Increase", value: "+45%" },
      { label: "Conversion Rate", value: "+12%" },
      { label: "SEO Visibility", value: "85%" },
    ],
    icon: Globe,
  },
  {
    id: "valli-hospital",
    title: "Valli Hospital Web Platform",
    client: "Valli Hospital",
    category: "Healthcare",
    year: "2026",
    link: "https://www.vallihospital.in/",
    image: "/work_valli_hospital.png",
    color: "#06B6D4",
    gradient: "linear-gradient(135deg, rgba(108,78,49,0.15), rgba(108,78,49,0.03))",
    description: "A comprehensive online presence and patient booking consultation portal for Valli Hospital, facilitating seamless healthcare access.",
    problem: "Patients faced long queues for consultation appointments, and details on hospital specializations were scattered.",
    solution: "Created a clean, modern medical portal with patient booking features, doctor profiles, dynamic specialization pages, and emergency hotline connections.",
    result: "Streamlined consultation flows, automated patient inquiries, 40% reduction in phone-in booking workloads.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Queue Booking Speed", value: "4x" },
      { label: "Manual Booking Workload", value: "-40%" },
      { label: "Monthly Web Visits", value: "15K+" },
    ],
    icon: Hospital,
  },
  {
    id: "reiz",
    title: "Reiz Platform",
    client: "Reiz LLC",
    category: "Technology",
    year: "2026",
    link: "https://reiz-six.vercel.app/",
    image: "/work_reiz.png",
    color: "#10B981",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.03))",
    description: "A premium, state-of-the-art interactive digital experience showcasing brand identity, futuristic layouts, and interactive animations.",
    problem: "The client wanted an Awwwards-caliber landing experience to captivate high-profile target clients.",
    solution: "Built a pixel-perfect, highly immersive landing platform utilizing GSAP timeline transitions, custom canvases, and fluid glassmorphism.",
    result: "Selected in premium CSS design galleries, average session duration increased to 4 minutes.",
    tags: ["Next.js", "GSAP", "Three.js", "Tailwind CSS"],
    metrics: [
      { label: "Avg Session Length", value: "4m" },
      { label: "UI Rating Index", value: "9.5/10" },
      { label: "SEO Optimization", value: "100%" },
    ],
    icon: Globe,
  },
  {
    id: "valli-meta-ads",
    title: "Valli Hospital Meta Ads Campaign",
    client: "Valli Hospital",
    category: "Marketing",
    year: "2026",
    link: "https://www.vallihospital.in/",
    image: "/work_valli_meta_ads.png",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.03))",
    description: "Strategic lead-generation digital marketing campaign executing meta ads targeting Salem and surrounding regions for Valli Hospital.",
    problem: "Traditional outdoor advertising was yield-inefficient and hard to track for patient acquisition.",
    solution: "Deployed localized Meta Ads targeting specific demographics, optimizing ad creatives for local hospital treatments, and utilizing clean intake landing pages.",
    result: "Acquired over 350+ validated patient inquiries, lowering acquisition costs by 60% compared to traditional billboards.",
    tags: ["Meta Ads", "Audience Targeting", "Ad Creative", "Lead Generation"],
    metrics: [
      { label: "Patient Inquiries", value: "350+" },
      { label: "Acquisition Cost", value: "-60%" },
      { label: "Ad ROI Factor", value: "4.8x" },
    ],
    icon: TrendingUp,
  },
  {
    id: "speech-to-text-model",
    title: "Speech-to-Text Python Model",
    client: "Open Source Engine",
    category: "Technology",
    year: "2026",
    link: "https://github.com/Zentrix-tech",
    image: "/work_speech_to_text.png",
    color: "#A37E36",
    gradient: "linear-gradient(135deg, rgba(163,126,54,0.15), rgba(163,126,54,0.03))",
    description: "A high-performance offline speech-to-text model designed for Windows and macOS environments using Python and Whisper integrations.",
    problem: "Commercial transcription APIs are expensive and present privacy concerns for desktop users and sensitive corporate communications.",
    solution: "Built a localized Python-based transcription desktop engine utilizing advanced HuggingFace/Whisper models, optimized CPU/GPU execution, and global shortcut hooks.",
    result: "100% private offline speech processing with real-time text injection, supporting 99+ languages.",
    tags: ["Python", "Whisper", "HuggingFace", "PySide6", "PyInstaller"],
    metrics: [
      { label: "Word Accuracy", value: "98.7%" },
      { label: "Latency Offset", value: "<0.3s" },
      { label: "Offline Privacy", value: "100%" },
    ],
    icon: Bot,
  },
];

const filterCategories = ["All", "Education", "Healthcare", "Technology", "Marketing"];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? project.gradient : "var(--color-surface)",
        border: `1px solid ${hovered ? project.color + "35" : "var(--color-surface-2)"}`,
        borderRadius: "24px",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: hovered ? `0 30px 80px ${project.color}15` : "none",
      }}
    >
      {/* Visual header */}
      {/* Visual header with screenshot */}
      <div
        style={{
          height: "220px",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        {/* Soft gradient overlay to merge nicely */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(26,22,18,0.05) 0%, rgba(26,22,18,0.3) 100%)",
            opacity: hovered ? 0.7 : 0.4,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />
        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            padding: "4px 12px",
            background: "rgba(250, 247, 242, 0.9)",
            backdropFilter: "blur(8px)",
            border: `1px solid ${project.color}30`,
            borderRadius: "100px",
            fontFamily: "var(--font-body)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--color-text-primary)",
            zIndex: 2,
          }}
        >
          {project.category}
        </div>
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            padding: "4px 12px",
            background: "rgba(250, 247, 242, 0.9)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--color-border)",
            borderRadius: "100px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-text-muted)",
            zIndex: 2,
          }}
        >
          {project.year}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "28px" }}>
        <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
          {project.client}
        </div>
        <h3
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "var(--color-text-primary)",
            letterSpacing: "-0.01em",
            marginBottom: "10px",
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.65,
            marginBottom: "20px",
          }}
        >
          {project.description}
        </p>

        {/* Metrics */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          {project.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                textAlign: "center",
                padding: "8px 14px",
                background: `${project.color}08`,
                border: `1px solid ${project.color}18`,
                borderRadius: "10px",
              }}
            >
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.1rem", color: project.color }}>
                {m.value}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.65rem", color: "var(--color-text-secondary)" }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
          {project.tags.map((t) => (
            <span
              key={t}
              style={{
                padding: "3px 10px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-surface-2)",
                borderRadius: "100px",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.7rem",
                color: "var(--color-text-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <Link
          href={project.link || `/works/${project.id}`}
          target={project.link ? "_blank" : undefined}
          rel={project.link ? "noopener noreferrer" : undefined}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.85rem",
            fontWeight: 600,
            color: project.color,
            textDecoration: "none",
          }}
        >
          View Live Site <ExternalLink size={14} style={{ marginLeft: 2 }} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const filtered =
    activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

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
              radial-gradient(ellipse at 40% 40%, rgba(108,78,49,0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 70%, rgba(184,147,75,0.08) 0%, transparent 50%)
            `,
          }}
        />
        <div className="container-zentrix" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              border: "1px solid rgba(108,78,49,0.3)",
              borderRadius: "100px",
              marginBottom: "24px",
              background: "rgba(108,78,49,0.06)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#06B6D4" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#06B6D4" }}>
              Our Portfolio
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
            <span style={{ color: "var(--color-text-primary)" }}>Work That</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #06B6D4, #22D3EE, #6C4E31)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Speaks for Itself
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
              maxWidth: "560px",
              margin: "0 auto 48px",
            }}
          >
            Real projects, real results. Every case study is a story of transformation — from complex problems to elegant, high-impact digital solutions.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            style={{ display: "flex", gap: "clamp(20px,4vw,48px)", justifyContent: "center", flexWrap: "wrap" }}
          >
            {[
              { v: "7+", l: "Projects Delivered" },
              { v: "6", l: "Industries Served" },
              { v: "100%", l: "On-time Delivery" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: "2rem", fontWeight: 800, color: "#06B6D4" }}>{s.v}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
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
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "100px",
                  border: activeFilter === cat ? "1px solid rgba(108,78,49,0.5)" : "1px solid var(--color-surface-2)",
                  background: activeFilter === cat ? "rgba(108,78,49,0.12)" : "transparent",
                  color: activeFilter === cat ? "#06B6D4" : "var(--color-text-muted)",
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

      {/* Projects Grid */}
      <section style={{ padding: "60px 0 clamp(80px,10vw,140px)" }}>
        <div className="container-zentrix">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "20px",
              }}
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
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
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to be our next success story?
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem", color: "var(--color-text-muted)", marginBottom: "32px" }}>
            Let&apos;s discuss your project and build something remarkable together.
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
            <Zap size={18} /> Start a Project
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
