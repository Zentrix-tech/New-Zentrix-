"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

export default function TermsOfServicePage() {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "140px 0 100px" }}>
      <div className="container-zentrix" style={{ maxWidth: "800px" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "32px" }}>
          <Link href="/" style={{ color: "var(--color-text-muted)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <span style={{ color: "var(--color-violet)", fontWeight: 600 }}>Terms of Service</span>
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 500, color: "var(--color-text-primary)", marginBottom: "16px" }}>
          Terms of Service
        </h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "40px" }}>
          LAST UPDATED: JULY 11, 2026
        </p>

        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", lineHeight: 1.8, color: "var(--color-text-secondary)", display: "flex", flexDirection: "column", gap: "28px" }}>
          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&ldquo;you&rdquo;) and Zentrix Technology (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), concerning your access to and use of the <a href={siteConfig.url} style={{ color: "var(--color-violet)" }}>{siteConfig.url}</a> website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Website and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Website (collectively, the &ldquo;Content&rdquo;) and the trademarks, service marks, and logos contained therein (the &ldquo;Marks&rdquo;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>3. Custom Software Delivery</h2>
            <p>
              For clients engaging our software engineering services (e.g. ERP, CRM, custom web apps, or AI agent development):
            </p>
            <ul style={{ paddingLeft: "20px", marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li><strong>Scope of Work:</strong> All project deliverables, timelines, and payment milestone terms are outlined in individual signed Service Level Agreements (SLA).</li>
              <li><strong>IP Ownership:</strong> Upon full payment of the project fee, the custom source code ownership transfers entirely to the client, unless specified otherwise.</li>
              <li><strong>SLA Support:</strong> Post-deployment maintenance and updates are governed by the specific SLA package purchased by the client.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>4. Governing Law</h2>
            <p>
              These Terms and your use of the Website are governed by and construed in accordance with the laws of India, applicable to agreements made and to be entirely performed within the State of Tamil Nadu, without regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--color-text-primary)", marginBottom: "12px" }}>5. Contact Us</h2>
            <p>
              In order to resolve a complaint regarding the Website or to receive further info regarding use of the Website, please contact us at <a href={`mailto:${siteConfig.contact.email}`} style={{ color: "var(--color-violet)", fontWeight: 600 }}>{siteConfig.contact.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
