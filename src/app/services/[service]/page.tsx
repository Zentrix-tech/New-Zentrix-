import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config/site";
import ServiceDetailClient from "./ServiceDetailClient";

interface Feature {
  title: string;
  desc: string;
}

interface Metric {
  label: string;
  value: string;
}

interface ServiceDetail {
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  color: string;
  tags: string[];
  features: Feature[];
  metrics: Metric[];
  faqs: { q: string; a: string }[];
}

const serviceDetails: Record<string, ServiceDetail> = {
  "web-development": {
    title: "Web Development",
    tagline: "High-Performance Digital Flagships",
    description: "We engineer pixel-perfect, lightning-fast web applications. Utilizing modern SSR frameworks like Next.js and robust backend services, we ensure that your digital ecosystem is fast, responsive, and ready to scale with your business.",
    iconName: "Globe",
    image: "/work_avs_engg.webp",
    color: "#A37E36",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
    features: [
      { title: "Server-Side Rendering", desc: "Optimal SEO indexation and near-instant initial page loads." },
      { title: "Static Site Generation", desc: "Global CDN caching for lightning-fast delivery." },
      { title: "Custom API Integrations", desc: "Robust data orchestration and secure backend microservices." },
      { title: "Responsive Layouts", desc: "Fluid experiences across mobile, tablet, and ultra-wide desktops." }
    ],
    metrics: [
      { label: "Performance Index", value: "99/100" },
      { label: "Load Velocity", value: "<0.8s" },
      { label: "Conversion Lift", value: "+32%" }
    ],
    faqs: [
      { q: "What is your main technology stack for web development?", a: "We primarily build on Next.js, React, TypeScript, Node.js, and Tailwind CSS. This stack guarantees maximum performance and search visibility." },
      { q: "Will our website be SEO optimized out of the box?", a: "Yes, every site we build features built-in structured JSON-LD schema, perfect Core Web Vitals scores, semantic HTML, and clean meta tag optimization." }
    ]
  },
  "app-development": {
    title: "App Development",
    tagline: "Native & Cross-Platform Mobile Architectures",
    description: "We build intuitive, high-performance mobile apps for iOS and Android. By leveraging tools like Flutter and React Native, we deliver native-speed performance with clean UX layouts, keeping your customers connected on the go.",
    iconName: "Smartphone",
    image: "/work_sakthi_kailash.webp",
    color: "#EC4899",
    tags: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase"],
    features: [
      { title: "Single-Codebase Efficiency", desc: "Simultaneous iOS and Android development with zero feature lag." },
      { title: "Offline Capabilities", desc: "Local database sync lets users operate without internet connectivity." },
      { title: "Biometric Authentication", desc: "High-end security with FaceID, TouchID, and custom encryption." },
      { title: "Native Feature Bindings", desc: "Direct access to camera, Bluetooth, notifications, and location." }
    ],
    metrics: [
      { label: "Crash-Free Rate", value: "99.9%" },
      { label: "App Store Rating", value: "4.8★" },
      { label: "Engagement Lift", value: "+45%" }
    ],
    faqs: [
      { q: "Should we choose Flutter or React Native?", a: "Both are excellent. We recommend Flutter for highly customized design layouts, and React Native if you want to share code with an existing React web application." },
      { q: "How do you handle App Store reviews and submissions?", a: "We manage the entire submission process, including building assets, writing descriptions, setting up privacy policies, and resolving App Store review requests." }
    ]
  },
  "ai-automation": {
    title: "AI Automation",
    tagline: "Workflow Acceleration & Cognitive Computing",
    description: "We automate complex business workflows using advanced AI and Machine Learning. From intelligent classification pipelines to automated content synthesis, we help you save thousands of operational hours.",
    iconName: "Bot",
    image: "/work_speech_to_text.webp",
    color: "#10B981",
    tags: ["Python", "PyTorch", "HuggingFace", "FastAPI", "OpenAI"],
    features: [
      { title: "Intelligent Document Parsing", desc: "Extract unstructured text, invoices, and files automatically." },
      { title: "Predictive Analytics", desc: "Forecast demand patterns and user behaviors with high precision." },
      { title: "Automated Data Pipelines", desc: "Connect legacy systems to modern neural API layers." },
      { title: "Custom Agent Frameworks", desc: "Deploy cognitive agents capable of handling complex service tickets." }
    ],
    metrics: [
      { label: "Operation Overhead", value: "-60%" },
      { label: "Pipeline Speed", value: "10x" },
      { label: "Model Accuracy", value: "98.5%" }
    ],
    faqs: [
      { q: "Can AI automation work with our existing ERP or database?", a: "Yes, we build custom bridge APIs and RPA connectors to allow modern AI models to read and write data to legacy local systems securely." },
      { q: "What security measures do you take with company data?", a: "We run models locally on private servers or use enterprise API wrappers with strict zero-data-retention agreements to protect proprietary information." }
    ]
  },
  "enterprise-software": {
    title: "Enterprise Software",
    tagline: "Scalable Systems & Mission-Critical Architecture",
    description: "We engineer resilient, large-scale custom systems (ERP, CRM, and bespoke business infrastructure). We focus on database integrity, secure API integrations, and intuitive administrative panels.",
    iconName: "Building2",
    image: "/work_valli_hospital.webp",
    color: "#3B82F6",
    tags: ["Java", "Go", "PostgreSQL", "Docker", "AWS"],
    features: [
      { title: "Bespoke ERP & CRM Systems", desc: "Custom business management software built for your workflows." },
      { title: "High-Availability Database Design", desc: "Sharded and replicated structures for zero data loss." },
      { title: "Role-Based Access Control", desc: "Enterprise security architecture with granular permissions." },
      { title: "Automated Compliance Auditing", desc: "Keep track of all actions and modifications within the network." }
    ],
    metrics: [
      { label: "Uptime SLA Guarantee", value: "99.99%" },
      { label: "Throughput Capacity", value: "50K req/s" },
      { label: "Legacy Migration", value: "100% Sync" }
    ],
    faqs: [
      { q: "What is the difference between custom software and off-the-shelf SaaS?", a: "Off-the-shelf software forces you to change your processes to match the tool. Custom software is built around your workflows, providing 10x the efficiency and eliminating monthly per-user licensing fees." },
      { q: "How do you handle hosting and server scalability?", a: "We deploy on fully scalable cloud infrastructures (AWS/Azure) with auto-scaling rules and automatic database backups, backed by a 99.99% uptime SLA." }
    ]
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    tagline: "High-End Visual Identity & Digital Finery",
    description: "We design websites and apps that wow at first glance. Using best practices in modern digital typography, layout geometry, custom motion frameworks, and interactive prototypes, we make your brand unforgettable.",
    iconName: "Eye",
    image: "/work_avs_omalur.webp",
    color: "#F59E0B",
    tags: ["Figma", "Adobe CC", "Spline", "Principle", "Lottie"],
    features: [
      { title: "Aesthetic Brand Direction", desc: "Cohesive typography, color guidelines, and brand systems." },
      { title: "High-Fidelity Prototyping", desc: "Interactive mockups that simulate final production code." },
      { title: "Custom Interaction Motion", desc: "Micro-animations that delight visitors and boost retention." },
      { title: "Accessibility Testing", desc: "Full WCAG compliance checks for contrast and screen reader support." }
    ],
    metrics: [
      { label: "Session Duration", value: "+240%" },
      { label: "User Delight Factor", value: "9.8/10" },
      { label: "Bounce Rate Reduction", value: "-35%" }
    ],
    faqs: [
      { q: "Do we get edit access to design files?", a: "Yes, we work entirely within Figma. You will receive live access to the design canvas, allowing your team to review, comment, and inspect design components in real time." },
      { q: "How many revisions do you allow?", a: "We believe in iterative collaboration. We don't restrict revisions; we refine the design until it perfectly aligns with your vision and brand direction." }
    ]
  },
  "seo": {
    title: "Digital Marketing & SEO",
    tagline: "Visibility, Lead Acceleration & Strategic Growth",
    description: "We boost search engine visibility and execute high-yielding lead generation campaigns. From deep technical SEO auditing to high-ROI Meta and Google Ads, we accelerate your digital traffic.",
    iconName: "TrendingUp",
    image: "/work_valli_meta_ads.webp",
    color: "#EC4899",
    tags: ["SEO Core", "Meta Ads", "Google Ads", "Analytics", "Intake Pages"],
    features: [
      { title: "Technical SEO Audits", desc: "Wipe out crawl errors, schema problems, and slow load times." },
      { title: "Localized Ad Campaigns", desc: "Target specific cities, demographics, and high-value buyers." },
      { title: "Conversion Intake Optimization", desc: "Design landing pages optimized to turn visits into leads." },
      { title: "Comprehensive KPI Reporting", desc: "Clean attribution dashboards showing true ROI and cost per lead." }
    ],
    metrics: [
      { label: "Cost Per Lead Reduction", value: "-60%" },
      { label: "Organic Rank Lift", value: "3.5x" },
      { label: "Paid Campaign ROI", value: "4.8x" }
    ],
    faqs: [
      { q: "How long does it take to see organic SEO results?", a: "Technical SEO optimizations can show indexation improvements within 2 to 4 weeks. High-intent competitive keyword rankings typically take 3 to 6 months of consistent optimization." },
      { q: "Do you manage both search ads and social media ads?", a: "Yes, we coordinate unified search campaigns (Google Search, YouTube) and visual social campaigns (Meta, Instagram, LinkedIn) to maximize buyer touchpoints." }
    ]
  },
  "ai-agents": {
    title: "AI Agents",
    tagline: "Autonomous Cognitive Staff for 24/7 Operations",
    description: "We design and deploy autonomous AI agents capable of resolving tickets, qualifying buyers, scheduling appointments, and managing database updates. Our agents read context, follow business rules, and execute APIs with human-like reasoning.",
    iconName: "Cpu",
    image: "/work_speech_to_text.webp",
    color: "#6C4E31",
    tags: ["LangChain", "OpenAI API", "Vector Databases", "Function Calling", "Python"],
    features: [
      { title: "Cognitive Reasoning", desc: "AI agents that understand context and resolve complex user issues." },
      { title: "Action API Triggers", desc: "Allow agents to read/write database values, book calendars, or trigger emails." },
      { title: "Knowledge Base Integration", desc: "Embed company PDFs, manuals, and FAQs for accurate responses." },
      { title: "Self-Improving Logic", desc: "Feedback loop metrics that allow agent prompts to optimize over time." }
    ],
    metrics: [
      { label: "Ticket Resolution Rate", value: "85%" },
      { label: "Response Delay", value: "<1.2s" },
      { label: "Operating Savings", value: "70%+" }
    ],
    faqs: [
      { q: "What systems can your AI agents integrate with?", a: "Our agents connect to CRMs (Salesforce, HubSpot, custom), email systems, Slack, databases, and any tool that exposes an HTTP API." },
      { q: "Can the AI agent be trained on our private documents?", a: "Yes, we use secure RAG (Retrieval-Augmented Generation) frameworks to feed your private guides, pricing sheets, and PDFs into the agent without exposing them to public models." }
    ]
  },
  "voice-ai": {
    title: "Voice AI Agents",
    tagline: "Human-grade AI Call Automation",
    description: "We deploy real-time voice AI agents that handle inbound support calls and execute outbound qualification calls. Replicating natural human speech patterns, tones, and interruptions, our voice bots ensure your business never misses a call.",
    iconName: "MessageSquare",
    image: "/work_speech_to_text.webp",
    color: "#A37E36",
    tags: ["WebSockets", "Vapi / Retell", "ElevenLabs", "Twilio", "FastAPI"],
    features: [
      { title: "Ultra-Low Latency Calls", desc: "Under 800ms response time for natural-feeling dialogue." },
      { title: "Emotion & Tone Control", desc: "Set warm, professional, or direct voices that handle frustrated buyers calmly." },
      { title: "Live System Updates", desc: "Let voice agents log customer requirements directly in your ERP mid-call." },
      { title: "Multi-Language Support", desc: "Deploy voice agents conversing fluently in English, Tamil, and Hindi." }
    ],
    metrics: [
      { label: "Latency Lag", value: "<600ms" },
      { label: "Call Abandonment", value: "-95%" },
      { label: "Agent Booking Conversion", value: "+40%" }
    ],
    faqs: [
      { q: "Does the voice bot sound like a robot?", a: "No, we use state-of-the-art voice synthesizers (ElevenLabs, Play.ht) that replicate natural breathing patterns, pauses, and speech modulations." },
      { q: "Can we route calls from our existing phone lines?", a: "Yes, we integrate with your existing Twilio accounts or local SIP trunks to route calls seamlessly." }
    ]
  },
  "chatbots": {
    title: "Intelligent Chatbots",
    tagline: "Qualify Leads & Answer Questions on WhatsApp & Web",
    description: "We build smart customer support and sales qualification chatbots for WhatsApp, Instagram, Telegram, and websites. Fully customized to follow your brand guidelines, our bots guide users to checkout, capture contact details, and resolve FAQs instantly.",
    iconName: "Bot",
    image: "/work_valli_meta_ads.webp",
    color: "#10B981",
    tags: ["WhatsApp API", "Tailwind CSS", "Vector Search", "FastAPI", "React"],
    features: [
      { title: "WhatsApp Business API", desc: "Send automated alerts, billing, and booking updates directly on chat." },
      { title: "Interactive Rich Menus", desc: "Custom buttons, lists, and quick-reply options for frictionless chat." },
      { title: "Hybrid Human-Agent Handoff", desc: "Instantly alert human staff when a high-value customer needs support." },
      { title: "Unified Chat Dashboard", desc: "Monitor all user interactions across channels in one admin view." }
    ],
    metrics: [
      { label: "Customer FAQ Resolved", value: "92%" },
      { label: "Leads Qualified / day", value: "1000+" },
      { label: "Support Wait Time", value: "0s" }
    ],
    faqs: [
      { q: "Do you set up the WhatsApp Business API?", a: "Yes, we handle the Meta Business verification, display name setup, and message template approvals." },
      { q: "Can the chatbot process payments?", a: "Yes, we build chatbots that generate UPI payment links and verify payments dynamically inside the chat window." }
    ]
  },
  "workflow-automation": {
    title: "Workflow Automation",
    tagline: "Wipe Out Repetitive Admin Bottlenecks",
    description: "We connect your CRM, accounting tools, spreadsheets, and databases using automated workflows. From triggering immediate WhatsApp invoice alerts to routing leads to appropriate sales reps, we optimize your business operations.",
    iconName: "Layers",
    image: "/work_valli_hospital.webp",
    color: "#06B6D4",
    tags: ["Make.com / n8n", "Zapier", "Rest APIs", "Node.js", "Serverless"],
    features: [
      { title: "Lead Routing Automation", desc: "Instantly parse new leads and route to reps based on location." },
      { title: "Auto-Invoicing", desc: "Trigger billing PDFs and payment link updates automatically." },
      { title: "Data Synchronization", desc: "Eliminate double-entry by syncing spreadsheets, CRMs, and accounting." },
      { title: "Operational Logs", desc: "Monitor all automation logs and flag any error runs instantly." }
    ],
    metrics: [
      { label: "Manual Work Hours", value: "-80%" },
      { label: "Data Entry Errors", value: "0%" },
      { label: "Process Velocity", value: "Instant" }
    ],
    faqs: [
      { q: "Should we use Make.com, n8n, or custom code?", a: "We choose based on cost and flexibility. Make.com is great for rapid deployment, n8n for privacy-focused self-hosting, and custom Node.js/Python for highly complex rules." },
      { q: "How do we monitor if a workflow fails?", a: "We build automated monitoring alerts that ping your Slack or WhatsApp the second an API error is caught, ensuring zero lost leads." }
    ]
  },
  "crm-development": {
    title: "CRM Development",
    tagline: "Custom Customer Relationship Pipelines Built for ROI",
    description: "We develop custom CRM solutions tailored specifically for your sales workflows, pipeline stages, and reporting metrics. Fully owned by you with zero monthly license fees, our CRMs convert leads faster.",
    iconName: "Users",
    image: "/work_reiz.webp",
    color: "#F59E0B",
    tags: ["React / Next.js", "PostgreSQL", "Tailwind CSS", "REST APIs", "NodeJS"],
    features: [
      { title: "Kanban Pipeline Tracker", desc: "Drag and drop leads across customized stages easily." },
      { title: "Live Activity Tracking", desc: "Log every call, email, and meeting automatically." },
      { title: "Dynamic Lead Assignment", desc: "Assign prospects using round-robin or value-based logic." },
      { title: "Detailed Win/Loss Analytics", desc: "Understand exactly where deals fall out and optimize." }
    ],
    metrics: [
      { label: "Lead Conversion Rate", value: "+32%" },
      { label: "Sales Cycle Duration", value: "-40%" },
      { label: "Monthly SaaS License Fee", value: "$0" }
    ],
    faqs: [
      { q: "Can we import our existing customer sheets?", a: "Yes, we handle the entire data migration process, cleaning up duplicate contacts and maintaining activity logs." },
      { q: "Is the CRM mobile-responsive?", a: "Yes, we optimize the layout so your sales reps can update pipeline stages, log notes, and call leads on the go." }
    ]
  },
  "erp-development": {
    title: "ERP Development",
    tagline: "Consolidated Enterprise Dashboards Under One Roof",
    description: "We design and deploy custom ERP solutions covering raw materials procurement, manufacturing lines, warehouse stocks, HR payroll, and multi-branch accounting. Custom-built to give you full visibility.",
    iconName: "LayoutDashboard",
    image: "/work_avs_omalur.webp",
    color: "#3B82F6",
    tags: ["NextJS", "Go / Golang", "Docker", "PostgreSQL", "AWS Sharding"],
    features: [
      { title: "Inventory Ledger", desc: "Live stock count with barcode scanning and auto-reorder alerts." },
      { title: "HR & Payroll Engine", desc: "Automate biometric logs, attendance, PF/ESI deductions, and payslips." },
      { title: "Consolidated Accounting", desc: "Track GST reports, cash flow, multi-branch ledgers, and profit sheets." },
      { title: "Secure Data Backups", desc: "Auto-replicated sharded databases backing up hourly." }
    ],
    metrics: [
      { label: "Procurement Waste", value: "-25%" },
      { label: "Audit Prep Duration", value: "-75%" },
      { label: "System Uptime", value: "99.99%" }
    ],
    faqs: [
      { q: "Can you build specific modules for our niche industry?", a: "Yes, our custom ERPs are modular. We write clean code templates allowing you to add manufacturing, fleet, or client portals easily." },
      { q: "Is the database secure from local device failures?", a: "Yes, our servers run on AWS cloud with automatic hourly database snapshots and sharding." }
    ]
  },
  "meta-ads": {
    title: "Meta Ads & Lead Generation",
    tagline: "High-ROI Customer Acquisition Campaigns",
    description: "We plan, build, and optimize high-converting Meta (Facebook & Instagram) ad campaigns. From writing premium ad copy and designing creative assets to custom audience research, we scale inquiries.",
    iconName: "Megaphone",
    image: "/work_valli_meta_ads.webp",
    color: "#EC4899",
    tags: ["Facebook Ads Manager", "Conversion APIs", "Custom Audiences", "A/B Testing", "Figma"],
    features: [
      { title: "High-Intent targeting", desc: "Pinpoint buyers based on specific interests, behaviors, and regions." },
      { title: "Meta Conversion API Integration", desc: "Accurate tracking bypassing iOS ad-block limits." },
      { title: "A/B Creative testing", desc: "Constantly test ad layouts and hooks to lower cost per lead." },
      { title: "Direct Lead Form Webhooks", desc: "Route new lead inquiries into your CRM within seconds." }
    ],
    metrics: [
      { label: "Cost Per Lead", value: "-45%" },
      { label: "Ad Click-through Rate", value: "+3.5%" },
      { label: "Return on Ad Spend", value: "4.5x" }
    ],
    faqs: [
      { q: "What budget do we need to start Meta Ads?", a: "We recommend starting with at least ₹500 to ₹1000 per day to gather enough conversion data to optimize." },
      { q: "Who designs the ad creatives and writes the copy?", a: "Our creative team handles everything — writing hooks, designing layouts in Figma, and filming video assets." }
    ]
  },
  "google-ads": {
    title: "Google Ads & PPC Campaigns",
    tagline: "Target High-Intent Search Intent Buyers",
    description: "We optimize Google Ads search, performance max, and display campaigns. By targeting precise buyer intent keywords, we ensure your business lands at the top of search results the moment prospects search.",
    iconName: "Search",
    image: "/work_valli_meta_ads.webp",
    color: "#C4A15E",
    tags: ["Google Keyword Planner", "Google Analytics 4", "Search Ads", "PMax Campaigns", "Conversion Setup"],
    features: [
      { title: "Keyword Match Optimization", desc: "Filter out irrelevant searches and target converting keywords only." },
      { title: "Negative Keyword Audits", desc: "Ensure your ad budget is never wasted on job seekers or competitors." },
      { title: "Premium Landing Pages", desc: "Fast, single-purpose landing pages built to convert search clicks." },
      { title: "Dynamic Search Ads", desc: "Auto-generate ad headlines to match user search intent." }
    ],
    metrics: [
      { label: "Search Impression Share", value: "85%+" },
      { label: "Click Conversion Rate", value: "+15%" },
      { label: "Cost Per Acquisition", value: "-30%" }
    ],
    faqs: [
      { q: "Should we run Google Ads or SEO first?", a: "Google Ads is perfect for immediate leads and testing keyword conversions. SEO is a long-term strategy to gain free organic traffic for those same keywords." },
      { q: "Do you set up negative keyword tracking?", a: "Yes, we perform weekly audits to add negative keywords, keeping search clicks highly qualified." }
    ]
  }
};

const aliases: Record<string, string> = {
  "website-development": "web-development",
  "mobile-app-development": "app-development",
  "custom-software": "enterprise-software",
  "digital-marketing": "seo",
  "seo-optimization": "seo",
  "erp": "erp-development",
  "crm": "crm-development"
};

interface PageProps {
  params: Promise<{ service: string }>;
}

export default function ServicePage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <ServiceContent params={params} />
    </Suspense>
  );
}
async function ServiceContent({ params }: PageProps) {
  const resolvedParams = await params;
  const rawServiceSlug = resolvedParams.service;
  const serviceSlug = aliases[rawServiceSlug] || rawServiceSlug;

  const formattedTitle = rawServiceSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const service: ServiceDetail = serviceDetails[serviceSlug] || {
    title: formattedTitle,
    tagline: `Enterprise Grade ${formattedTitle} Solutions`,
    description: `Zentrix Technology provides high-performance ${formattedTitle.toLowerCase()} solutions. We engineer scalable, production-ready software systems with Next.js, TypeScript, and modern cloud architecture.`,
    iconName: "Globe",
    image: "/work_avs_engg.webp",
    color: "#A37E36",
    tags: ["Next.js", "TypeScript", "Node.js", "Cloud APIs", "Enterprise"],
    features: [
      { title: "Custom Engineering", desc: "Built precisely around your core business processes." },
      { title: "High Throughput & Speed", desc: "Near-instant response times and global CDN delivery." },
      { title: "Security & Compliance", desc: "Role-based access control and end-to-end data encryption." },
      { title: "SLA Support", desc: "Continuous performance monitoring and dedicated technical assistance." }
    ],
    metrics: [
      { label: "Performance Score", value: "99/100" },
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Operation Lift", value: "3.5x" }
    ],
    faqs: [
      { q: `How does Zentrix deliver ${formattedTitle}?`, a: "We analyze your exact requirements, build custom Next.js/React & Node architectures with zero bloated templates, and deploy with complete test coverage." }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Zentrix Technology",
      "image": `${siteConfig.url}/logo_main.webp`,
      "telephone": siteConfig.contact.phone
    },
    "description": service.description,
    "areaServed": "IN"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServiceDetailClient service={service} />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { service: "web-development" },
    { service: "app-development" },
    { service: "ai-automation" },
    { service: "enterprise-software" },
    { service: "ui-ux-design" },
    { service: "seo" },
    { service: "ai-agents" },
    { service: "voice-ai" },
    { service: "chatbots" },
    { service: "workflow-automation" },
    { service: "crm-development" },
    { service: "erp-development" },
    { service: "meta-ads" },
    { service: "google-ads" },
    { service: "website-development" },
    { service: "mobile-app-development" },
    { service: "custom-software" },
    { service: "digital-marketing" }
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const rawServiceSlug = resolvedParams.service;
  const serviceSlug = aliases[rawServiceSlug] || rawServiceSlug;

  const formattedTitle = rawServiceSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const service = serviceDetails[serviceSlug] || {
    title: formattedTitle,
    tagline: `Enterprise Grade ${formattedTitle} Solutions`,
    description: `Zentrix Technology provides high-performance ${formattedTitle.toLowerCase()} solutions. We engineer scalable, production-ready software systems with Next.js, TypeScript, and modern cloud architecture.`,
  };

  return {
    title: `${service.title} — ${service.tagline} | ${siteConfig.name}`,
    description: service.description,
    alternates: {
      canonical: `${siteConfig.url}/services/${serviceSlug}`,
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.name}`,
      description: service.description,
      url: `${siteConfig.url}/services/${serviceSlug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | ${siteConfig.name}`,
      description: service.description,
    }
  };
}
