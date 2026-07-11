"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "140px 0 100px" }}>
      <div className="container-zentrix" style={{ maxWidth: "800px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "32px" }}>
          <Link href="/" style={{ color: "var(--color-text-muted)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <span style={{ color: "var(--color-violet)", fontWeight: 600 }}>Privacy Policy</span>
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "16px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "40px" }}>
          LAST UPDATED: JULY 11, 2026
        </p>

        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.8, color: "var(--color-text-secondary)", display: "flex", flexDirection: "column", gap: "28px" }}>
          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>1. Introduction</h2>
            <p>
              Welcome to Zentrix Technology (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal info, please contact us at <a href={`mailto:${siteConfig.contact.email}`} style={{ color: "var(--color-violet)", fontWeight: 600 }}>{siteConfig.contact.email}</a>.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us. This includes:
            </p>
            <ul style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li><strong>Contact Data:</strong> Name, email address, phone number, and business details.</li>
              <li><strong>Operational Data:</strong> Detailed requirements you provide via our lead forms or WhatsApp inquiries.</li>
              <li><strong>Device Info:</strong> IP address, browser type, and cookies logged via website analytics (e.g. Google Analytics).</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>3. How We Use Your Info</h2>
            <p>
              We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. Specifically, we use it to:
            </p>
            <ul style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Provide, operate, and maintain our custom software services.</li>
              <li>Respond to inquiries, qualify sales leads, and book consultation calls.</li>
              <li>Analyze website performance and optimize user experience metrics.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal info, transmission of personal data to and from our Website is at your own risk.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>5. Contact Us</h2>
            <p>
              If you have questions or comments about this policy, you may email us at <a href={`mailto:${siteConfig.contact.email}`} style={{ color: "var(--color-violet)", fontWeight: 600 }}>{siteConfig.contact.email}</a> or call us directly at <a href={`tel:${siteConfig.contact.phone}`} style={{ color: "var(--color-violet)", fontWeight: 600 }}>{siteConfig.contact.phone}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
