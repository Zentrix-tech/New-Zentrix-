"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Command, ChevronDown, ExternalLink, Zap } from "lucide-react";
import { siteConfig } from "@/lib/config/site";

const navLinks = siteConfig.navigation.main;

const servicesDropdown = [
  { name: "Web Development", href: "/services/web-development", desc: "React, Next.js, full-stack" },
  { name: "App Development", href: "/services/app-development", desc: "iOS, Android, Flutter" },
  { name: "AI Automation", href: "/services/ai-automation", desc: "ML, workflow automation" },
  { name: "Enterprise Software", href: "/services/enterprise-software", desc: "ERP, CRM, custom systems" },
  { name: "UI/UX Design", href: "/services/ui-ux-design", desc: "Brand, product, motion" },
  { name: "Digital Marketing", href: "/services/seo", desc: "SEO, Meta Ads, Google Ads" },
];

export default function Navbar() {
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 60);
  });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isScrolled ? "12px 0" : "20px 0",
          display: "flex",
          justifyContent: "center",
          transition: "padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: "calc(100% - 48px)",
            maxWidth: isScrolled ? "1100px" : "1400px",
            borderRadius: isScrolled ? "20px" : "24px",
            background: isScrolled
              ? "rgba(250, 247, 242, 0.85)"
              : "rgba(250, 247, 242, 0.65)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: isScrolled
              ? "1px solid rgba(184, 147, 75, 0.2)"
              : "1px solid rgba(108, 78, 49, 0.08)",
            boxShadow: isScrolled
              ? "0 10px 30px rgba(108, 78, 49, 0.08)"
              : "0 4px 20px rgba(108, 78, 49, 0.03)",
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "auto",
          }}
        >
          <div
            style={{
              padding: "0 clamp(16px, 3vw, 32px)",
              height: isScrolled ? "54px" : "68px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <img
                src="/logo_main.webp"
                alt="Zentrix Technology"
                style={{
                  height: isScrolled ? "38px" : "44px",
                  width: "auto",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                  transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
              className="hidden-mobile"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                if (link.name === "Services") {
                  return (
                    <div
                      key={link.name}
                      ref={dropdownRef}
                      style={{ position: "relative" }}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          background: servicesOpen || isActive ? "rgba(184, 147, 75, 0.12)" : "transparent",
                          border: "none",
                          color: servicesOpen || isActive ? "var(--color-violet)" : "var(--color-text-secondary)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {link.name}
                        <motion.div
                          animate={{ rotate: servicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={14} />
                        </motion.div>
                      </button>

                      {/* Dropdown */}
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              position: "absolute",
                              top: "calc(100% + 8px)",
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: "320px",
                              background: "var(--color-surface)",
                              border: "1px solid rgba(184, 147, 75, 0.15)",
                              borderRadius: "16px",
                              padding: "8px",
                              boxShadow: "0 20px 40px rgba(108, 78, 49, 0.12)",
                              backdropFilter: "blur(40px)",
                            }}
                          >
                            {servicesDropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                  padding: "10px 12px",
                                  borderRadius: "10px",
                                  textDecoration: "none",
                                  transition: "background 0.15s ease",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(184, 147, 75, 0.08)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                              >
                                <span style={{ color: "var(--color-text-primary)", fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600 }}>
                                  {item.name}
                                </span>
                                <span style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
                                  {item.desc}
                                </span>
                              </Link>
                            ))}
                            <div style={{ padding: "8px 12px", borderTop: "1px solid rgba(108, 78, 49, 0.08)", marginTop: "4px" }}>
                              <Link
                                href="/services"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  color: "var(--color-violet)",
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.8rem",
                                  fontWeight: 600,
                                  textDecoration: "none",
                                }}
                              >
                                View all services <ExternalLink size={12} />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    data-magnetic
                    style={{
                      padding: "8px 14px",
                      borderRadius: "8px",
                      background: isActive ? "rgba(184, 147, 75, 0.12)" : "transparent",
                      color: isActive ? "var(--color-violet)" : "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      textDecoration: "none",
                      transition: "all 0.25s var(--ease-out-expo)",
                      position: "relative",
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "var(--color-text-primary)";
                        e.currentTarget.style.background = "rgba(163,126,54,0.06)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "var(--color-text-secondary)";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 10px",
                  background: "rgba(108, 78, 49, 0.05)",
                  border: "1px solid rgba(108, 78, 49, 0.1)",
                  borderRadius: "8px",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <Command size={12} />
                <span>K</span>
              </button>

              <Link
                href="/contact"
                data-magnetic
                data-cursor-text="START"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: isScrolled ? "7px 16px" : "9px 20px",
                  background: "linear-gradient(135deg, var(--color-violet-light), var(--color-violet), var(--color-gold))",
                  backgroundSize: "200% auto",
                  color: "#fff",
                  borderRadius: "10px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(108, 78, 49, 0.22)",
                  transition: "all 0.35s var(--ease-out-expo)",
                  animation: "holographic-shift 5s ease infinite",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 10px 32px rgba(108, 78, 49, 0.35)";
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(108, 78, 49, 0.22)";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <Zap size={14} />
                <span className="hidden-mobile">Get Started</span>
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  display: "none",
                  width: 40,
                  height: 40,
                  borderRadius: "10px",
                  background: "rgba(108, 78, 49, 0.05)",
                  border: "1px solid rgba(108, 78, 49, 0.1)",
                  color: "var(--color-text-primary)",
                  cursor: "pointer",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="mobile-menu-btn"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: isScrolled ? "80px" : "96px",
              left: "24px",
              right: "24px",
              zIndex: 999,
              background: "rgba(250, 247, 242, 0.98)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(184, 147, 75, 0.2)",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 20px 40px rgba(108, 78, 49, 0.12)",
              transition: "top 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      style={{
                        display: "block",
                        padding: "14px 16px",
                        borderRadius: "12px",
                        background: isActive ? "rgba(184, 147, 75, 0.12)" : "transparent",
                        color: isActive ? "var(--color-violet)" : "var(--color-text-secondary)",
                        fontFamily: "var(--font-body)",
                        fontWeight: 600,
                        fontSize: "1rem",
                        textDecoration: "none",
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(108, 78, 49, 0.08)" }}>
              <Link
                href="/contact"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "14px",
                  background: "var(--gradient-primary)",
                  color: "#fff",
                  borderRadius: "12px",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <Zap size={16} /> Start Your Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
