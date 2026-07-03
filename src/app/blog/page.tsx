"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { ArrowRight, Clock, BookOpen, Search } from "lucide-react";

const posts = [
  {
    id: "future-of-ai-automation-2026",
    emoji: "🤖",
    category: "AI & Automation",
    title: "The Future of AI Automation: What Every Business Must Know in 2026",
    excerpt: "From document intelligence to predictive analytics — how AI is moving from experimental tech to a core business necessity, and how Zentrix is leading this transformation.",
    readTime: "8 min read",
    date: "July 1, 2026",
    color: "#7C3AED",
    featured: true,
  },
  {
    id: "why-custom-erp-beats-saas",
    emoji: "🏢",
    category: "Enterprise",
    title: "Why Custom ERP Always Beats Off-the-Shelf SaaS for Growing Businesses",
    excerpt: "Salesforce, SAP, and Zoho are great — until they're not. Here's why custom-built ERP systems deliver 10x the ROI for businesses with unique workflows.",
    readTime: "6 min read",
    date: "June 28, 2026",
    color: "#F59E0B",
    featured: true,
  },
  {
    id: "nextjs-vs-react-2026",
    emoji: "⚡",
    category: "Web Development",
    title: "Next.js 16 vs React 19: The Definitive Guide for Your 2026 Web Project",
    excerpt: "A deep technical comparison of the two most popular frontend frameworks — performance, developer experience, and which one to choose for your use case.",
    readTime: "10 min read",
    date: "June 25, 2026",
    color: "#06B6D4",
    featured: false,
  },
  {
    id: "mobile-app-flutter-react-native",
    emoji: "📱",
    category: "App Development",
    title: "Flutter vs React Native in 2026: Which One Should You Choose?",
    excerpt: "After building multiple apps with both frameworks, here's our honest, data-backed comparison — performance, ecosystem, cost, and developer experience.",
    readTime: "7 min read",
    date: "June 20, 2026",
    color: "#10B981",
    featured: false,
  },
  {
    id: "school-management-systems-complete-guide",
    emoji: "🎓",
    category: "Education",
    title: "Complete Guide to School Management Systems: What to Look for in 2026",
    excerpt: "Choosing a school ERP is a long-term decision. This guide covers everything — from key modules to questions to ask your vendor before signing.",
    readTime: "9 min read",
    date: "June 15, 2026",
    color: "#A855F7",
    featured: false,
  },
  {
    id: "hospital-management-digital-transformation",
    emoji: "🏥",
    category: "Healthcare",
    title: "Digital Transformation for Hospitals: A Step-by-Step Implementation Guide",
    excerpt: "How a 150-bed hospital in Tamil Nadu went from paper-based chaos to a fully digital HMS — without disrupting daily operations. A real case study.",
    readTime: "11 min read",
    date: "June 10, 2026",
    color: "#EC4899",
    featured: false,
  },
  {
    id: "gsap-animation-web-2026",
    emoji: "✨",
    category: "Design & UX",
    title: "Creating Cinematic Web Experiences with GSAP in 2026",
    excerpt: "How Awwwards-winning websites use GSAP for scroll-based storytelling, magnetic cursors, and text animations that make visitors stay 3x longer.",
    readTime: "12 min read",
    date: "June 5, 2026",
    color: "#F59E0B",
    featured: false,
  },
  {
    id: "seo-technical-guide-2026",
    emoji: "🔍",
    category: "Digital Marketing",
    title: "Technical SEO in 2026: The Complete Checklist for Developers",
    excerpt: "Core Web Vitals, structured data, JavaScript SEO, and everything else you need to dominate search rankings. An engineer's guide to SEO.",
    readTime: "14 min read",
    date: "June 1, 2026",
    color: "#10B981",
    featured: false,
  },
];

const categories = ["All", "AI & Automation", "Enterprise", "Web Development", "App Development", "Healthcare", "Education", "Design & UX", "Digital Marketing"];

function PostCard({ post, index, featured = false }: { post: typeof posts[0]; index: number; featured?: boolean }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: featured ? "24px" : "20px",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        gridColumn: featured && index === 0 ? "span 2" : "span 1",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${post.color}35`;
        e.currentTarget.style.background = `linear-gradient(135deg, ${post.color}08, transparent)`;
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 20px 60px ${post.color}15`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Visual header */}
      <div
        style={{
          height: featured && index === 0 ? "220px" : "140px",
          background: `linear-gradient(135deg, ${post.color}18, ${post.color}05)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: featured && index === 0 ? "5rem" : "3.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <span style={{ position: "relative", zIndex: 1 }}>{post.emoji}</span>
      </div>

      {/* Content */}
      <div style={{ padding: featured && index === 0 ? "32px" : "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px", flexWrap: "wrap" }}>
          <span
            style={{
              padding: "3px 10px",
              background: `${post.color}12`,
              border: `1px solid ${post.color}25`,
              borderRadius: "100px",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: post.color,
            }}
          >
            {post.category}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Clock size={12} style={{ color: "#475569" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#475569" }}>{post.readTime}</span>
          </div>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#334155" }}>{post.date}</span>
        </div>

        <h3
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: featured && index === 0 ? "1.35rem" : "1.05rem",
            color: "#F8FAFC",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            marginBottom: "12px",
          }}
        >
          {post.title}
        </h3>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.875rem",
            color: "#94A3B8",
            lineHeight: 1.65,
            marginBottom: "20px",
          }}
        >
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.id}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.875rem",
            fontWeight: 600,
            color: post.color,
            textDecoration: "none",
          }}
        >
          Read Article <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = posts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const featured = filtered.filter((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

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
              radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 60%, rgba(6,182,212,0.07) 0%, transparent 50%)
            `,
          }}
        />
        <div className="container-zentrix" style={{ position: "relative", zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              border: "1px solid rgba(124,58,237,0.3)",
              borderRadius: "100px",
              marginBottom: "24px",
              background: "rgba(124,58,237,0.08)",
            }}
          >
            <BookOpen size={13} style={{ color: "#A855F7" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A855F7" }}>
              Zentrix Insights
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2.5rem, 7vw, 6.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "20px",
            }}
          >
            <span style={{ color: "#F8FAFC" }}>Knowledge That</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #7C3AED, #A855F7, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Drives Decisions
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.1rem",
              color: "#94A3B8",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto 36px",
            }}
          >
            Technical deep-dives, industry insights, and real-world case studies from the Zentrix engineering and strategy team.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ position: "relative", maxWidth: "400px", margin: "0 auto" }}
          >
            <Search
              size={16}
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#475569", zIndex: 1 }}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "13px 16px 13px 44px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "100px",
                color: "#F8FAFC",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
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
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          padding: "14px 0",
        }}
      >
        <div className="container-zentrix">
          <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "2px" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "6px 16px",
                  borderRadius: "100px",
                  border: activeCategory === cat ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.06)",
                  background: activeCategory === cat ? "rgba(124,58,237,0.15)" : "transparent",
                  color: activeCategory === cat ? "#A855F7" : "#94A3B8",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  fontSize: "0.8rem",
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

      {/* Posts */}
      <section style={{ padding: "48px 0 clamp(80px,10vw,120px)" }}>
        <div className="container-zentrix">
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#475569", fontFamily: "Inter, sans-serif" }}>
              No articles found. Try a different search or category.
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured.length > 0 && (
                <div style={{ marginBottom: "40px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
                    {featured.map((post, i) => (
                      <PostCard key={post.id} post={post} index={i} featured />
                    ))}
                  </div>
                </div>
              )}
              {/* Regular */}
              {rest.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                  {rest.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section
        style={{
          padding: "clamp(60px,8vw,100px) 0",
          background: "var(--color-bg)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          textAlign: "center",
        }}
      >
        <div className="container-zentrix">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, color: "#F8FAFC", marginBottom: "12px", letterSpacing: "-0.02em" }}>
            Stay ahead of the curve
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "#94A3B8", marginBottom: "28px" }}>
            Get the latest insights, case studies, and tech news from Zentrix — straight to your inbox.
          </p>
          <div style={{ display: "flex", gap: "12px", maxWidth: "440px", margin: "0 auto" }}>
            <input
              type="email"
              placeholder="Enter your email..."
              style={{
                flex: 1,
                padding: "13px 18px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "100px",
                color: "#F8FAFC",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                outline: "none",
              }}
            />
            <button
              style={{
                padding: "13px 24px",
                background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                color: "#fff",
                border: "none",
                borderRadius: "100px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
