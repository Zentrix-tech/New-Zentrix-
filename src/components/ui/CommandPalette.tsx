"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ArrowRight, Code2, Globe, Smartphone, Bot, Palette, Mail, Info, Briefcase, BookOpen, FlaskConical, X } from "lucide-react";

const commands = [
  { id: "home", label: "Go to Home", shortcut: "H", href: "/", icon: Globe, category: "Navigation" },
  { id: "services", label: "View Services", shortcut: "S", href: "/services", icon: Code2, category: "Navigation" },
  { id: "works", label: "See Our Works", shortcut: "W", href: "/works", icon: Briefcase, category: "Navigation" },
  { id: "about", label: "About Zentrix", shortcut: "A", href: "/about", icon: Info, category: "Navigation" },
  { id: "blog", label: "Read Blog", shortcut: "B", href: "/blog", icon: BookOpen, category: "Navigation" },
  { id: "innovation", label: "Innovation Lab", shortcut: "I", href: "/innovation-lab", icon: FlaskConical, category: "Navigation" },
  { id: "contact", label: "Contact Us", shortcut: "C", href: "/contact", icon: Mail, category: "Navigation" },
  { id: "web-dev", label: "Web Development", href: "/services/web-development", icon: Globe, category: "Services" },
  { id: "app-dev", label: "App Development", href: "/services/app-development", icon: Smartphone, category: "Services" },
  { id: "ai", label: "AI Automation", href: "/services/ai-automation", icon: Bot, category: "Services" },
  { id: "ui-ux", label: "UI/UX Design", href: "/services/ui-ux-design", icon: Palette, category: "Services" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = commands.filter(
    (c) =>
      c.label.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
    setSelected(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const execute = useCallback(
    (href: string) => {
      router.push(href);
      close();
    },
    [router, close]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? close() : open();
      }
      if (e.key === "Escape") close();
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelected((s) => Math.min(s + 1, filtered.length - 1));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelected((s) => Math.max(s - 1, 0));
        }
        if (e.key === "Enter" && filtered[selected]) {
          execute(filtered[selected].href);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, open, close, execute, filtered, selected]);

  const categories = [...new Set(filtered.map((c) => c.category))];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="command-overlay"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="command-palette"
            style={{ margin: "0 20px" }}
          >
            {/* Search input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                borderBottom: "1px solid var(--color-surface-2)",
              }}
            >
              <Search size={18} style={{ color: "var(--color-text-secondary)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                placeholder="Search pages, services..."
                style={{
                  flex: 1,
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "var(--color-text-primary)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1rem",
                }}
              />
              <button onClick={close} style={{ color: "var(--color-text-secondary)", cursor: "pointer", background: "none", border: "none" }}>
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            <div style={{ maxHeight: "360px", overflowY: "auto", padding: "8px" }}>
              {categories.map((category) => (
                <div key={category}>
                  <div
                    style={{
                      padding: "8px 12px 4px",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {category}
                  </div>
                  {filtered
                    .filter((c) => c.category === category)
                    .map((cmd, i) => {
                      const globalIndex = filtered.indexOf(cmd);
                      const Icon = cmd.icon;
                      return (
                        <motion.button
                          key={cmd.id}
                          whileHover={{ x: 4 }}
                          onClick={() => execute(cmd.href)}
                          onMouseEnter={() => setSelected(globalIndex)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "10px",
                            background: globalIndex === selected ? "rgba(184, 147, 75, 0.15)" : "transparent",
                            border: globalIndex === selected ? "1px solid rgba(184, 147, 75, 0.3)" : "1px solid transparent",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            textAlign: "left",
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: globalIndex === selected ? "rgba(184, 147, 75, 0.2)" : "var(--color-surface)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={16} style={{ color: globalIndex === selected ? "#B8934B" : "var(--color-text-muted)" }} />
                          </div>
                          <span style={{ flex: 1, color: "var(--color-text-primary)", fontSize: "0.9rem", fontFamily: "Inter, sans-serif" }}>
                            {cmd.label}
                          </span>
                          {globalIndex === selected && <ArrowRight size={14} style={{ color: "#B8934B" }} />}
                        </motion.button>
                      );
                    })}
                </div>
              ))}
              {filtered.length === 0 && (
                <div
                  style={{
                    padding: "40px 20px",
                    textAlign: "center",
                    color: "var(--color-text-secondary)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  No results for &ldquo;{query}&rdquo;
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "10px 20px",
                borderTop: "1px solid var(--color-surface-2)",
                display: "flex",
                gap: "16px",
                fontSize: "0.7rem",
                color: "var(--color-text-secondary)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>Esc Close</span>
              <span style={{ marginLeft: "auto" }}>⌘K Toggle</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
