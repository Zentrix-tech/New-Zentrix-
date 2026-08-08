"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail, Phone, MapPin, Send, Clock, MessageSquare,
  Star, Check, Zap, Calendar, Shield
} from "lucide-react";
import { siteConfig } from "@/lib/config/site";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  budget: z.string().min(1, "Please select a budget range"),
  projectType: z.string().min(1, "Please select a project type"),
  timeline: z.string().min(1, "Please select a timeline"),
  message: z.string().min(20, "Please provide more details (at least 20 characters)"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
});

type ContactForm = z.infer<typeof contactSchema>;

const serviceOptions = [
  "Web Development", "App Development", "AI Automation", "Enterprise Software",
  "ERP / CRM", "Hospital Management", "School Management", "UI/UX Design",
  "Digital Marketing", "SEO", "Cloud & DevOps", "Other",
];

const budgetOptions = [
  "Under ₹50K", "₹50K – ₹1L", "₹1L – ₹5L", "₹5L – ₹20L", "₹20L+", "Let's discuss",
];

const timelineOptions = [
  "ASAP (< 1 month)", "1–2 months", "3–6 months", "6+ months", "Ongoing / Retainer",
];

const projectTypes = [
  "New Project", "Redesign / Rebuild", "Feature Addition", "Bug Fixes", "Consultation", "Maintenance",
];

const reviews = [
  { name: "Arun Kumar", role: "CEO, HealthFirst Clinic", text: "Zentrix delivered an incredible HMS that transformed our hospital. The quality and attention to detail is extraordinary. 100% recommended!", rating: 5, color: "#6C4E31" },
  { name: "Priya Sharma", role: "Director, Excel School", text: "The school management system they built is world-class. Parents, teachers, and admin all love it. They exceeded every expectation.", rating: 5, color: "#06B6D4" },
  { name: "Rajesh Nair", role: "Founder, AutoFlow", text: "Their AI automation cut our manual work by 80%. Delivered on time, under budget. The team is incredibly professional and responsive.", rating: 5, color: "#B8934B" },
  { name: "Kavitha Devi", role: "CTO, RetailPro", text: "Best agency we've worked with. The website and inventory system they built drives real results every day. True partners, not just vendors.", rating: 5, color: "#10B981" },
  { name: "Mohammed Farhan", role: "MD, FarhanTraders", text: "The billing and inventory software they built for us is perfect. Saved us hours every day. Professional, fast, and excellent support.", rating: 5, color: "#F59E0B" },
  { name: "Sangeetha R.", role: "Principal, Bright Future", text: "Our school's digital transformation was seamless thanks to Zentrix. The parent app especially has been a game-changer for communication.", rating: 5, color: "#EC4899" },
];

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: "28px",
        background: "var(--color-surface)",
        border: "1px solid var(--color-surface-2)",
        borderRadius: "20px",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${review.color}30`;
        e.currentTarget.style.background = `${review.color}05`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-surface-2)";
        e.currentTarget.style.background = "var(--color-surface)";
      }}
    >
      <div style={{ display: "flex", gap: "3px", marginBottom: "14px" }}>
        {Array(review.rating).fill(0).map((_, i) => (
          <Star key={i} size={14} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
        ))}
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: "var(--color-text-muted)", lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic" }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: `${review.color}20`,
            border: `1px solid ${review.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            color: review.color,
          }}
        >
          {review.name[0]}
        </div>
        <div>
          <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text-primary)" }}>{review.name}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{review.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { services: [] },
  });

  const toggleService = (service: string) => {
    const updated = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setSelectedServices(updated);
    setValue("services", updated);
  };

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Something went wrong while sending your message. Please try again or email us at zentrixtech01@gmail.com.");
    } finally {
      setSubmitting(false);
    }
  };

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
              radial-gradient(ellipse at 30% 50%, rgba(184,147,75,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 70% 30%, rgba(108,78,49,0.08) 0%, transparent 50%)
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
              border: "1px solid rgba(184,147,75,0.3)",
              borderRadius: "100px",
              marginBottom: "24px",
              background: "rgba(184,147,75,0.08)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8934B", animation: "pulse-glow 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8934B" }}>
              Let&apos;s Build Together
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
              marginBottom: "24px",
            }}
          >
            <span style={{ color: "var(--color-text-primary)" }}>Start Your</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #6C4E31, #B8934B, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Project Today
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
              margin: "0 auto",
            }}
          >
            Fill the form below and we&apos;ll get back to you within 24 hours with a tailored proposal. No obligations, just a conversation.
          </motion.p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: "0 0 clamp(80px,10vw,120px)" }}>
        <div
          className="container-zentrix"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "clamp(32px,4vw,60px)",
            alignItems: "start",
          }}
        >
          {/* Left — Contact info */}
          <div ref={ref}>
            {/* Office card */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "32px",
                background: "rgba(184,147,75,0.06)",
                border: "1px solid rgba(184,147,75,0.2)",
                borderRadius: "20px",
                marginBottom: "16px",
              }}
            >
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--color-text-primary)", marginBottom: "20px" }}>
                Get in Touch
              </h3>
              {[
                { icon: Mail, label: "Email", value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
                { icon: Phone, label: "Phone / WhatsApp", value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phone}` },
                { icon: MapPin, label: "Location", value: siteConfig.location.address, href: "#" },
                { icon: Clock, label: "Business Hours", value: "Mon–Sat, 9AM–7PM IST", href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "16px",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      background: "rgba(184,147,75,0.12)",
                      border: "1px solid rgba(184,147,75,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} style={{ color: "#B8934B" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.7rem", color: "var(--color-text-secondary)", marginBottom: "2px" }}>{label}</div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>{value}</div>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* WhatsApp quick connect */}
            <motion.a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                background: "rgba(37,211,102,0.08)",
                border: "1px solid rgba(37,211,102,0.25)",
                borderRadius: "16px",
                textDecoration: "none",
                marginBottom: "16px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(37,211,102,0.08)"; }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "12px",
                  background: "rgba(37,211,102,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MessageSquare size={18} style={{ color: "#25D366" }} />
              </div>
              <div>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text-primary)" }}>WhatsApp Us</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>Quick response guaranteed</div>
              </div>
            </motion.a>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "20px",
                background: "var(--color-surface)",
                border: "1px solid var(--color-surface-2)",
                borderRadius: "16px",
              }}
            >
              {[
                { icon: Shield, text: "NDA & Confidentiality Protected", color: "#10B981" },
                { icon: Zap, text: "Response within 24 hours", color: "#F59E0B" },
                { icon: Check, text: "Free initial consultation", color: "#06B6D4" },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <Icon size={14} style={{ color }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "var(--color-surface)",
              border: "1px solid rgba(184,147,75,0.15)",
              borderRadius: "24px",
              padding: "clamp(24px,4vw,48px)",
              backdropFilter: "blur(20px)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🎉</div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>
                  Message Sent!
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: "var(--color-text-muted)", marginBottom: "24px" }}>
                  Thank you for reaching out. We&apos;ll review your project and get back to you within 24 hours.
                </p>
                <Link
                  href="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, #6C4E31, #B8934B)",
                    color: "#fff",
                    borderRadius: "100px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "var(--color-text-primary)", marginBottom: "28px" }}>
                  Tell us about your project
                </h3>

                {/* Name + Company row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", display: "block", marginBottom: "6px" }}>
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      className="input-zentrix"
                      style={{
                        width: "100%",
                        background: "var(--color-surface)",
                        border: errors.name ? "1px solid #EF4444" : "1px solid var(--color-surface-2)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        color: "var(--color-text-primary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                    {errors.name && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#EF4444", marginTop: "4px" }}>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", display: "block", marginBottom: "6px" }}>
                      Company (optional)
                    </label>
                    <input
                      {...register("company")}
                      placeholder="Company name"
                      style={{
                        width: "100%",
                        background: "var(--color-surface)",
                        border: "1px solid var(--color-surface-2)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        color: "var(--color-text-primary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", display: "block", marginBottom: "6px" }}>Email *</label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@company.com"
                      style={{
                        width: "100%",
                        background: "var(--color-surface)",
                        border: errors.email ? "1px solid #EF4444" : "1px solid var(--color-surface-2)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        color: "var(--color-text-primary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                    {errors.email && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#EF4444", marginTop: "4px" }}>{errors.email.message}</p>}
                  </div>
                  <div>
                    <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", display: "block", marginBottom: "6px" }}>Phone / WhatsApp *</label>
                    <input
                      {...register("phone")}
                      placeholder="+91 98765 43210"
                      style={{
                        width: "100%",
                        background: "var(--color-surface)",
                        border: errors.phone ? "1px solid #EF4444" : "1px solid var(--color-surface-2)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        color: "var(--color-text-primary)",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.9rem",
                        outline: "none",
                      }}
                    />
                    {errors.phone && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#EF4444", marginTop: "4px" }}>{errors.phone.message}</p>}
                  </div>
                </div>

                {/* Budget + Project Type + Timeline */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                  {[
                    { label: "Budget Range *", name: "budget" as const, options: budgetOptions },
                    { label: "Project Type *", name: "projectType" as const, options: projectTypes },
                    { label: "Timeline *", name: "timeline" as const, options: timelineOptions },
                  ].map(({ label, name, options }) => (
                    <div key={name}>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", display: "block", marginBottom: "6px" }}>{label}</label>
                      <select
                        {...register(name)}
                        style={{
                          width: "100%",
                          background: "var(--color-bg-secondary)",
                          border: errors[name] ? "1px solid #EF4444" : "1px solid var(--color-surface-2)",
                          borderRadius: "10px",
                          padding: "12px 16px",
                          color: "var(--color-text-muted)",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.875rem",
                          outline: "none",
                          cursor: "pointer",
                        }}
                      >
                        <option value="">Select...</option>
                        {options.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                {/* Services */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", display: "block", marginBottom: "10px" }}>
                    Services Interested In * (select all that apply)
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {serviceOptions.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        style={{
                          padding: "7px 14px",
                          borderRadius: "100px",
                          border: selectedServices.includes(service)
                            ? "1px solid rgba(184,147,75,0.5)"
                            : "1px solid var(--color-surface-2)",
                          background: selectedServices.includes(service)
                            ? "rgba(184,147,75,0.15)"
                            : "var(--color-surface)",
                          color: selectedServices.includes(service) ? "#B8934B" : "var(--color-text-muted)",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.8rem",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  {errors.services && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#EF4444", marginTop: "6px" }}>{errors.services.message}</p>}
                </div>

                {/* Message */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "var(--color-text-muted)", display: "block", marginBottom: "6px" }}>
                    Project Details *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your project — what you're building, key requirements, any existing systems, and your goals..."
                    style={{
                      width: "100%",
                      background: "var(--color-surface)",
                      border: errors.message ? "1px solid #EF4444" : "1px solid var(--color-surface-2)",
                      borderRadius: "10px",
                      padding: "14px 16px",
                      color: "var(--color-text-primary)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.6,
                    }}
                  />
                  {errors.message && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "#EF4444", marginTop: "4px" }}>{errors.message.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: submitting ? "rgba(184,147,75,0.5)" : "linear-gradient(135deg, #6C4E31, #B8934B)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: submitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: submitting ? "none" : "0 16px 40px rgba(184,147,75,0.35)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {submitting ? (
                    <>
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTop: "2px solid white",
                          borderRadius: "50%",
                          animation: "spin-slow 0.8s linear infinite",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message — Get Free Quote
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Reviews section */}
      <section
        style={{
          padding: "clamp(60px,8vw,100px) 0",
          background: "var(--color-bg)",
          borderTop: "1px solid var(--color-surface)",
        }}
        id="reviews"
      >
        <div className="container-zentrix">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={20} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
              ))}
            </div>
            <h2
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(2rem,4vw,3rem)",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.03em",
                marginBottom: "12px",
              }}
            >
              Trusted by Visionary Clients
            </h2>
            <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
              {[
                { v: "5.0", l: "Average Rating" },
                { v: "6+", l: "Happy Clients" },
                { v: "100%", l: "Satisfaction" },
              ].map((s) => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#F59E0B" }}>{s.v}</div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} index={i} />
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 1024px) {
          section > [style*="grid-template-columns: 1fr 2fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          [style*="grid-template-columns: 1fr 1fr"],[style*="grid-template-columns: 1fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          [style*="grid-template-columns: repeat(auto-fill, minmax(300px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
