"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

export interface BlogPostData {
  id: string;
  emoji: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  color: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: {
    introduction: string;
    keyTakeaways: string[];
    sections: {
      heading: string;
      body: string;
    }[];
    conclusion: string;
  };
}

export default function BlogDetailClient({ post, relatedPosts }: { post: BlogPostData; relatedPosts: BlogPostData[] }) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : `${siteConfig.url}/blog/${post.id}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.excerpt, url: shareUrl }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      alert("Article link copied to clipboard!");
    }
  };

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: "100px" }}>
      {/* Top Banner / Hero */}
      <section
        style={{
          padding: "160px 0 60px",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(180deg, ${post.color}0D 0%, var(--color-bg) 100%)`,
        }}
      >
        <div className="container-zentrix" style={{ position: "relative", zIndex: 2 }}>
          {/* Back link */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: "24px" }}>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-violet)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
            >
              <ArrowLeft size={16} /> Back to All Articles
            </Link>
          </motion.div>

          {/* Meta badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
            <span
              style={{
                padding: "4px 14px",
                background: `${post.color}15`,
                border: `1px solid ${post.color}30`,
                borderRadius: "100px",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: post.color,
              }}
            >
              {post.category}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "Syne, sans-serif",
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
              marginBottom: "24px",
            }}
          >
            {post.title}
          </motion.h1>

          {/* Subtitle / Excerpt */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: "800px",
              marginBottom: "36px",
            }}
          >
            {post.excerpt}
          </p>

          {/* Author info & Share button */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              paddingTop: "20px",
              borderTop: "1px solid var(--color-surface-2)",
              maxWidth: "900px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: `${post.color}20`,
                  border: `2px solid ${post.color}35`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  color: post.color,
                  fontSize: "1.1rem",
                }}
              >
                {post.author.avatar}
              </div>
              <div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, color: "var(--color-text-primary)", fontSize: "0.95rem" }}>
                  {post.author.name}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: "var(--color-text-secondary)" }}>
                  {post.author.role}
                </div>
              </div>
            </div>

            <button
              onClick={handleShare}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 18px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-surface-2)",
                borderRadius: "100px",
                color: "var(--color-text-primary)",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = post.color;
                e.currentTarget.style.color = post.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-surface-2)";
                e.currentTarget.style.color = "var(--color-text-primary)";
              }}
            >
              <Share2 size={16} /> Share Article
            </button>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="container-zentrix" style={{ marginTop: "40px" }}>
        <div style={{ maxWidth: "840px", margin: "0 auto" }}>
          {/* Key Takeaways Box */}
          {post.content.keyTakeaways && post.content.keyTakeaways.length > 0 && (
            <div
              style={{
                padding: "28px",
                background: `linear-gradient(135deg, ${post.color}0A, ${post.color}04)`,
                border: `1px solid ${post.color}25`,
                borderRadius: "20px",
                marginBottom: "40px",
              }}
            >
              <h3
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: post.color,
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Sparkles size={18} /> Key Takeaways
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {post.content.keyTakeaways.map((item, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                    <CheckCircle2 size={18} style={{ color: post.color, flexShrink: 0, marginTop: "3px" }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Introduction */}
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1.1rem",
              color: "var(--color-text-primary)",
              lineHeight: 1.8,
              marginBottom: "36px",
            }}
          >
            {post.content.introduction}
          </div>

          {/* Dynamic Content Sections */}
          {post.content.sections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: "40px" }}>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  color: "var(--color-text-primary)",
                  marginBottom: "16px",
                  lineHeight: 1.25,
                }}
              >
                {section.heading}
              </h2>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.8,
                  whiteSpace: "pre-line",
                }}
              >
                {section.body}
              </div>
            </div>
          ))}

          {/* Conclusion Box */}
          <div
            style={{
              padding: "32px",
              background: "var(--color-surface)",
              border: "1px solid var(--color-surface-2)",
              borderRadius: "20px",
              marginTop: "48px",
              marginBottom: "60px",
            }}
          >
            <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>
              Conclusion & Next Steps
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.98rem", color: "var(--color-text-muted)", lineHeight: 1.7, margin: 0 }}>
              {post.content.conclusion}
            </p>
          </div>

          {/* CTA Banner */}
          <div
            style={{
              padding: "40px 32px",
              background: `linear-gradient(135deg, ${post.color}15, rgba(6,182,212,0.05))`,
              border: `1px solid ${post.color}30`,
              borderRadius: "24px",
              textAlign: "center",
              marginBottom: "80px",
            }}
          >
            <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>
              Ready to Engineer Your Business Future?
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: "var(--color-text-muted)", maxWidth: "560px", margin: "0 auto 24px" }}>
              Talk to our technology architects at Zentrix to build custom AI, web, or mobile solutions tailored for your business.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "14px 32px",
                background: post.color,
                color: "#FFFFFF",
                borderRadius: "100px",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: `0 10px 30px ${post.color}40`,
                transition: "transform 0.2s ease",
              }}
            >
              Get Free Consultation
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.4rem", color: "var(--color-text-primary)", marginBottom: "24px" }}>
                Related Articles
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.id}`}
                    style={{
                      display: "block",
                      padding: "24px",
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-surface-2)",
                      borderRadius: "16px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{rel.emoji}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 700, color: rel.color, textTransform: "uppercase", marginBottom: "6px" }}>
                      {rel.category}
                    </div>
                    <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--color-text-primary)", lineHeight: 1.3 }}>
                      {rel.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
