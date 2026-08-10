import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import {
  ExternalLink, ArrowLeft, CheckCircle2, Zap, Shield, Globe,
  GraduationCap, Hospital, Bot, Building2, TrendingUp
} from "lucide-react";

interface ProjectData {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  link?: string;
  image: string;
  color: string;
  description: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  architecture: string[];
}

const projectsData: Record<string, ProjectData> = {
  "avs-engg-college": {
    id: "avs-engg-college",
    title: "AVS Engineering College Portal",
    client: "AVS Engineering College",
    category: "Education",
    year: "2026",
    link: "https://www.avsenggcollege.ac.in/",
    image: "/work_avs_engg.webp",
    color: "#A37E36",
    description: "Comprehensive web infrastructure for AVS Engineering College, supporting academic notices, placement portals, online admissions, and department sites.",
    problem: "An old legacy PHP site that was difficult to maintain and had sluggish load times during admissions and exam result announcements.",
    solution: "Re-engineered the entire core platform on a modern Next.js tech stack, simplifying management and boosting page speed by 75%.",
    result: "Easy content updating for departments, load times cut by 75%, secure database sync across campuses.",
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    metrics: [
      { label: "Load Time Reduction", value: "75%" },
      { label: "Admin Update Speed", value: "3x" },
      { label: "Mobile Responsiveness", value: "100%" },
    ],
    architecture: [
      "Server-Side Rendering (SSR) for optimal search indexation",
      "CDN edge caching for high student traffic concurrency",
      "Role-based administrative portal for department updates",
      "Automated SSL security and SSL certificate monitoring"
    ]
  },
  "sakthi-kailash-college": {
    id: "sakthi-kailash-college",
    title: "Sakthi Kailash Women's College",
    client: "Sakthi Kailash College",
    category: "Education",
    year: "2026",
    link: "https://www.sakthikailashcollege.org/",
    image: "/work_sakthi_kailash.webp",
    color: "#EC4899",
    description: "Custom institutional website for Sakthi Kailash Women's College, highlighting courses, placement records, achievements, and departments.",
    problem: "Outdated website design that did not represent the premium infrastructure and placement quality of the institution.",
    solution: "Built a stunning, accessible web experience showcasing placement success, departmental profiles, and student campus achievements.",
    result: "Enhanced digital brand identity, increased parent-student web traffic by 180%, clean responsive design.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    metrics: [
      { label: "Web Inbound Traffic", value: "+180%" },
      { label: "Page Speed Optimized", value: "95%" },
      { label: "Mobile Engagement", value: "99%" },
    ],
    architecture: [
      "Fluid micro-animations highlighting placement statistics",
      "Dynamic gallery components for campus events",
      "Structured schema markup for college course SEO",
      "Optimized WebP image pipelines"
    ]
  },
  "avs-college-omalur": {
    id: "avs-college-omalur",
    title: "AVS College of Arts & Science",
    client: "AVS College, Omalur",
    category: "Education",
    year: "2026",
    link: "https://www.avscollegeomalur.edu.in/",
    image: "/work_avs_omalur.webp",
    color: "#8B5CF6",
    description: "Official institutional web platform and student portal for AVS College of Arts & Science, providing access to academic resources, admissions, and college news.",
    problem: "The institution required a modernized, highly performant, and secure platform to represent the college online and handle heavy student traffic.",
    solution: "Designed and engineered a premium web portal with fast page loads, clean interface architecture, and administrative endpoints.",
    result: "Significant boost in enrollment queries, clean user interface, zero downtime during high-traffic result releases.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js"],
    metrics: [
      { label: "Performance Score", value: "98%" },
      { label: "Query Inbound Rise", value: "2.5x" },
      { label: "Downtime Reduced", value: "100%" },
    ],
    architecture: [
      "Next.js App Router for instant page transitions",
      "Custom lead intake forms for admissions department",
      "High-availability server infrastructure",
      "Responsive accessibility compliance"
    ]
  },
  "hashprime": {
    id: "hashprime",
    title: "HashPrime Platform",
    client: "HashPrime Technologies",
    category: "Technology",
    year: "2026",
    link: "https://www.hashprime.in/",
    image: "/work_hashprime.webp",
    color: "#F59E0B",
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
    architecture: [
      "Glassmorphic design system with HSL dynamic palette",
      "Prisma ORM data management layer",
      "SEO structured JSON-LD integration",
      "Optimized responsive layout grid"
    ]
  },
  "valli-hospital": {
    id: "valli-hospital",
    title: "Valli Hospital Web Platform",
    client: "Valli Hospital",
    category: "Healthcare",
    year: "2026",
    link: "https://www.vallihospital.in/",
    image: "/work_valli_hospital.webp",
    color: "#06B6D4",
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
    architecture: [
      "Patient appointment intake workflows",
      "Doctor roster and OPD time schedule portal",
      "Emergency hotline click-to-call integration",
      "HIPAA-compliant encrypted data transport"
    ]
  },
  "reiz": {
    id: "reiz",
    title: "Reiz Platform",
    client: "Reiz LLC",
    category: "Technology",
    year: "2026",
    link: "https://reiz-six.vercel.app/",
    image: "/work_reiz.webp",
    color: "#10B981",
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
    architecture: [
      "GSAP ScrollTrigger timeline orchestrations",
      "Web Native Canvas 3D particle systems",
      "Smooth Lenis inertia scrolling",
      "Custom cursor magnetic state triggers"
    ]
  },
  "valli-meta-ads": {
    id: "valli-meta-ads",
    title: "Valli Hospital Meta Ads Campaign",
    client: "Valli Hospital",
    category: "Marketing",
    year: "2026",
    link: "https://www.vallihospital.in/",
    image: "/work_valli_meta_ads.webp",
    color: "#3B82F6",
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
    architecture: [
      "Meta Conversion API webhooks for accurate tracking",
      "A/B creative testing matrix across demographics",
      "Localized Salem radius intent targeting",
      "Fast lead intake webhook integrations"
    ]
  },
  "speech-to-text-model": {
    id: "speech-to-text-model",
    title: "Speech-to-Text Python Model",
    client: "Open Source Engine",
    category: "Technology",
    year: "2026",
    link: "https://github.com/Zentrix-tech",
    image: "/work_speech_to_text.webp",
    color: "#A37E36",
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
    architecture: [
      "Whisper neural transcription engine optimization",
      "Zero-external API data retention privacy model",
      "Global OS keyboard listener for instant text pasting",
      "Lightweight PySide GUI execution"
    ]
  }
};

const defaultProject: ProjectData = {
  id: "custom-project",
  title: "Zentrix Enterprise Client Project",
  client: "Enterprise Client",
  category: "Software Engineering",
  year: "2026",
  image: "/work_avs_engg.webp",
  color: "#A37E36",
  description: "Custom software engineering and digital transformation project designed and deployed by Zentrix Technology.",
  problem: "Complex operational bottlenecks requiring custom backend architecture and modern user interfaces.",
  solution: "Engineered a high-availability, responsive system featuring clean code, database sharding, and automated APIs.",
  result: "Dramatically improved efficiency, automated admin tasks, and enhanced security.",
  tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
  metrics: [
    { label: "Uptime SLA", value: "99.99%" },
    { label: "Processing Speed", value: "5x" },
    { label: "User Delight", value: "9.8/10" }
  ],
  architecture: [
    "Next.js App Router with Server-Side Rendering",
    "Tailwind CSS responsive design tokens",
    "PostgreSQL database synchronization",
    "Automated CI/CD deployment pipelines"
  ]
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const project = projectsData[id] || {
    ...defaultProject,
    id,
    title: id.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " Solution",
  };

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "140px 0 100px" }}>
      <div className="container-zentrix">
        {/* Back Link */}
        <Link
          href="/works"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--color-text-secondary)",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: "32px",
          }}
        >
          <ArrowLeft size={16} /> Back to All Projects
        </Link>

        {/* Hero Card */}
        <div
          style={{
            background: "var(--color-surface)",
            border: `1px solid ${project.color}30`,
            borderRadius: "32px",
            overflow: "hidden",
            marginBottom: "48px",
          }}
        >
          <div style={{ position: "relative", height: "360px", width: "100%" }}>
            <img
              src={project.image}
              alt={project.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 30%, rgba(26,22,18,0.85) 100%)",
              }}
            />
            <div style={{ position: "absolute", bottom: "32px", left: "32px", right: "32px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
                <span
                  style={{
                    padding: "4px 14px",
                    borderRadius: "100px",
                    background: "rgba(250, 247, 242, 0.9)",
                    color: "var(--color-text-primary)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "#fff",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {project.year}
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                {project.title}
              </h1>
            </div>
          </div>

          <div style={{ padding: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}>
              <div>
                <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "4px" }}>Client</div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-text-primary)" }}>{project.client}</div>
              </div>
              {project.link && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    background: project.color,
                    color: "#fff",
                    borderRadius: "12px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Visit Live Project <ExternalLink size={16} />
                </Link>
              )}
            </div>

            {/* Metrics Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                gap: "16px",
                marginBottom: "40px",
              }}
            >
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    padding: "20px",
                    background: `${project.color}08`,
                    border: `1px solid ${project.color}20`,
                    borderRadius: "16px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.8rem", fontWeight: 800, color: project.color }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginTop: "4px" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Overview & Solutions */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "32px", marginBottom: "40px" }}>
              <div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "12px" }}>
                  The Challenge
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
                  {project.problem}
                </p>
              </div>
              <div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "12px" }}>
                  The Zentrix Solution
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div style={{ marginBottom: "32px" }}>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "16px" }}>
                Key Technical Highlights
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "12px" }}>
                {project.architecture.map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 16px",
                      background: "rgba(108, 78, 49, 0.04)",
                      border: "1px solid rgba(108, 78, 49, 0.08)",
                      borderRadius: "12px",
                      fontSize: "0.875rem",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: project.color, flexShrink: 0 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {project.tags.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "6px 14px",
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "100px",
                    fontSize: "0.8rem",
                    color: "var(--color-text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: "1.8rem", fontWeight: 800, color: "var(--color-text-primary)", marginBottom: "16px" }}>
            Want a Similar Result for Your Business?
          </h3>
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
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Start Your Project <Zap size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { id: "avs-engg-college" },
    { id: "sakthi-kailash-college" },
    { id: "avs-college-omalur" },
    { id: "hashprime" },
    { id: "valli-hospital" },
    { id: "reiz" },
    { id: "valli-meta-ads" },
    { id: "speech-to-text-model" }
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const project = projectsData[id] || defaultProject;
  return {
    title: `${project.title} — Case Study | ${siteConfig.name}`,
    description: project.description,
  };
}
