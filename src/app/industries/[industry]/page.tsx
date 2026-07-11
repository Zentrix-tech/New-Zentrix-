import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config/site";
import IndustryClient from "./IndustryClient";

interface IndustryFAQ {
  q: string;
  a: string;
}

interface IndustryFeature {
  title: string;
  desc: string;
}

interface IndustryData {
  name: string;
  title: string;
  tagline: string;
  description: string;
  painPoint: string;
  solution: string;
  iconName: string;
  color: string;
  features: IndustryFeature[];
  faqs: IndustryFAQ[];
  metrics: { label: string; value: string }[];
}

const industryDetails: Record<string, IndustryData> = {
  hospitals: {
    name: "Hospitals",
    title: "AI Automation & Hospital Management Systems (HMS)",
    tagline: "Digitizing Patient Journeys & Automating Clinical Workflows",
    description: "We build custom Hospital Management Systems (HMS) that streamline outpatient queues, digitalize electronic medical records (EMR), automate pharmacy inventory, and facilitate secure online consultations. Our AI-driven scheduling reduces doctor fatigue and patient waiting times by up to 50%.",
    painPoint: "Hospitals struggle with manual patient records, billing delays, and unoptimized queue management which compromises patient care.",
    solution: "A unified cloud platform connecting billing, laboratory portals, patient history, and OPD/IPD flows with secure encryption.",
    iconName: "Hospital",
    color: "#EC4899",
    metrics: [
      { label: "Patient Wait Time", value: "-50%" },
      { label: "Billing Processing", value: "3x Faster" },
      { label: "Uptime SLA", value: "99.99%" }
    ],
    features: [
      { title: "EMR Digital Ledger", desc: "Access patient records instantly with encrypted doctor notes." },
      { title: "OPD/IPD Queue Flow", desc: "Automate token generation and real-time scheduling updates." },
      { title: "Integrated Billing", desc: "Process insurance claims, laboratory costs, and doctor fees instantly." },
      { title: "Smart Pharmacy Ledgers", desc: "Auto-alerts for stock expiration and purchase orders." }
    ],
    faqs: [
      { q: "Is your Hospital Management System compliant with data privacy laws?", a: "Yes, our custom HMS is built with end-to-end encryption, role-based access controls, and full auditing logs to ensure patient data remains private and secure." },
      { q: "Can it integrate with existing laboratory or radiology devices?", a: "Yes, we build custom HL7-compliant API layers to bridge laboratory devices, allowing report data to populate patient ledgers automatically." }
    ]
  },
  healthcare: {
    name: "Healthcare",
    title: "AI Solutions & Custom CRM for Healthcare Clinics",
    tagline: "Connecting Healthcare Providers with Modern Digital Operations",
    description: "We build telehealth portals, clinic appointment planners, patient intake apps, and AI diagnostic aids. We help specialized clinics automate patient retention, coordinate diagnostic reports, and deploy voice-based AI appointment booking agents.",
    painPoint: "Specialty clinics lose up to 30% of scheduled appointments due to lack of reminder automation.",
    solution: "AI messaging agents that automatically remind, reschedule, and qualify patients via WhatsApp and voice.",
    iconName: "Hospital",
    color: "#06B6D4",
    metrics: [
      { label: "Appointment Attendance", value: "+30%" },
      { label: "Staff Overhead Time", value: "-40%" },
      { label: "Patient Retention", value: "+25%" }
    ],
    features: [
      { title: "WhatsApp Reminders", desc: "Auto-remind patients with rescheduling links." },
      { title: "Voice Booking Agents", desc: "AI voice call automation for appointment setup." },
      { title: "Telehealth Platforms", desc: "Secure video consultations with automatic prescription generation." },
      { title: "Intelligent Diagnostic Aids", desc: "Track patient vitals history and flag high-risk fluctuations." }
    ],
    faqs: [
      { q: "Do you offer clinic booking automation via WhatsApp?", a: "Yes, we integrate with official WhatsApp APIs to allow patients to book appointments, receive reminders, and check laboratory report statuses." },
      { q: "Can patients download diagnostic reports from the app?", a: "Yes, our clinic portals include a secure patient intake panel where users can view and download records anytime." }
    ]
  },
  "real-estate": {
    name: "Real Estate",
    title: "AI Automation & Custom CRM for Real Estate Companies",
    tagline: "Auto-qualifying Leads, Booking Site Visits, & Managing Inventories",
    description: "We design high-converting property search platforms, interactive 3D site plan maps, and custom real estate CRMs. Our AI agents qualify incoming buyer leads on WhatsApp and Facebook, scheduling site visits for your sales team automatically.",
    painPoint: "Sales teams spend 80% of their time calling cold leads who never book site visits.",
    solution: "An AI-powered qualification funnel that scores leads on budget, intent, and location before passing them to agents.",
    iconName: "Building2",
    color: "#A37E36",
    metrics: [
      { label: "Lead Qualification Rate", value: "+240%" },
      { label: "Site Visit Bookings", value: "2.5x Rise" },
      { label: "Manual Agent Calls", value: "-60%" }
    ],
    features: [
      { title: "AI Lead Scoring", desc: "Scan lead messages and categorize by budget and urgency." },
      { title: "Interactive 3D Planners", desc: "Allow buyers to check apartment/plot availability in real time." },
      { title: "Automated WhatsApp Site Guides", desc: "Send property brochures, coordinates, and pricing sheets automatically." },
      { title: "Broker Management System", desc: "Manage broker networks, payouts, and lead attributions." }
    ],
    faqs: [
      { q: "Can your CRM manage broker and agent commission tracking?", a: "Yes, we build custom commissions and commission payouts modules for developers to track sales attributions dynamically." },
      { q: "Can we link our Meta/Facebook Lead Ads to the CRM?", a: "Yes, we build instant webhooks connecting Meta Ads, Google Ads, and local portals like Magicbricks or housing.com directly into the CRM." }
    ]
  },
  manufacturing: {
    name: "Manufacturing",
    title: "Custom Manufacturing ERP & AI Inventory Automation",
    tagline: "Optimizing Raw Material Flows, Scheduling Machines, & Reducing Wastage",
    description: "We engineer robust manufacturing ERP software that manages raw material procurement, bills of materials (BOM), automated machine loading schedules, and real-time inventory tracking. We integrate barcode and QR systems to track stock movement across multiple warehouses.",
    painPoint: "Stock inaccuracies and uncoordinated machine schedules cause delayed shipments and factory idle time.",
    solution: "A sharded ERP platform with live stock ledger alerts, automatic purchase ordering, and visual factory charts.",
    iconName: "Factory",
    color: "#6E5528",
    metrics: [
      { label: "Inventory Accuracy", value: "99.8%" },
      { label: "Order Fulfilment Time", value: "-35%" },
      { label: "Raw Material Wastage", value: "-20%" }
    ],
    features: [
      { title: "Dynamic BOM Builder", desc: "Track exact raw materials needed for every production run." },
      { title: "Barcode/QR Scanning", desc: "Scan materials in and out of warehouses with mobile app support." },
      { title: "Auto-Reorder Automation", desc: "Trigger Purchase Orders when raw stock drops below threshold." },
      { title: "Live Machine Diagnostics", desc: "Log active machine output to predict maintenance schedules." }
    ],
    faqs: [
      { q: "Can your ERP run offline if the factory internet goes down?", a: "Yes, our systems feature local offline data sync layers, allowing factory floors to continue scanning barcode data without interruption." },
      { q: "Do you support multiple factory locations in one system?", a: "Yes, our sharded multi-location DB architecture allows you to manage stocks across different cities in one central dashboard." }
    ]
  },
  hotels: {
    name: "Hotels",
    title: "AI Booking & PMS Software for Hotels & Resorts",
    tagline: "Maximizing Direct Bookings, Automating Check-ins, & Streamlining PMS",
    description: "We build high-performance hotel booking engines, room cleaners scheduling apps, custom PMS integrations, and WhatsApp guest concierge bots. We help hotels reduce dependence on OTAs (Booking.com, MakeMyTrip) and increase high-margin direct bookings.",
    painPoint: "High OTA commissions (15-20%) erode hotel profit margins on room bookings.",
    solution: "A conversion-optimized brand website with a fast booking engine and automatic guest WhatsApp follow-ups.",
    iconName: "Hotel",
    color: "#C4A15E",
    metrics: [
      { label: "Direct Booking Lift", value: "+45%" },
      { label: "OTA Commission Cost", value: "-30%" },
      { label: "Guest Satisfaction Rating", value: "4.9★" }
    ],
    features: [
      { title: "Direct Booking Engine", desc: "Blazing fast room selection with payment gateway integrations." },
      { title: "WhatsApp Virtual Concierge", desc: "Answer guest FAQs, request room service, and send bills via chat." },
      { title: "Room Cleaners Scheduler", desc: "Live dashboard tracking clean/dirty rooms for faster check-ins." },
      { title: "Dynamic Pricing Engine", desc: "Adjust room rates automatically based on occupancy and demand." }
    ],
    faqs: [
      { q: "Can your booking engine sync with Channel Managers?", a: "Yes, we integrate with standard channel managers (AxisRooms, Staah, etc.) to ensure room availability stays synced across all OTAs." },
      { q: "Can guests request room service via WhatsApp?", a: "Yes, our custom WhatsApp bots process guest service requests and route them directly to kitchen or housekeeping dashboards." }
    ]
  },
  retail: {
    name: "Retail",
    title: "E-Commerce Platforms & AI Customer Retention Systems",
    tagline: "Boosting Direct-to-Consumer Sales & Automating Loyalty Campaigns",
    description: "We develop high-converting e-commerce websites and custom retail management systems. We implement AI recommendations, cart abandonment automations, and unified omnichannel inventory managers.",
    painPoint: "Retailers lose up to 70% of potential revenue to cart abandonment.",
    solution: "AI-targeted cart recovery sequences across SMS, email, and WhatsApp that recover lost sales.",
    iconName: "ShoppingBag",
    color: "#A37E36",
    metrics: [
      { label: "Cart Recovery Rate", value: "+22%" },
      { label: "Average Order Value", value: "+18%" },
      { label: "Load speed", value: "<0.6s" }
    ],
    features: [
      { title: "Omnichannel Stock Manager", desc: "Sync inventory across physical stores and online portals." },
      { title: "AI Product Recommender", desc: "Recommend products based on buyer history and seasonal trends." },
      { title: "GST Billing Engine", desc: "Process credit card, UPI, and netbanking payments with instant invoice PDFs." },
      { title: "WhatsApp Loyalty Campaigns", desc: "Send personalized coupon offers to VIP customers." }
    ],
    faqs: [
      { q: "Can you handle high traffic spikes during seasonal sales?", a: "Yes, our retail platforms are built on serverless server setups (Vercel, AWS Lambda) that auto-scale dynamically." },
      { q: "Can we integrate this with our physical store POS?", a: "Yes, we build webhook synchronization bridges to push/pull stock counts from physical retail POS systems." }
    ]
  },
  education: {
    name: "Education",
    title: "School ERP & Online College Management Systems",
    tagline: "Digitizing Admissions, Automated Fee Tracking, & Parent Communication",
    description: "We build all-in-one educational ERP platforms covering student portals, online admission processing, fee tracking with automatic reminder alerts, and parent communication dashboards.",
    painPoint: "Institutions spend hundreds of hours calling parents for overdue tuition fees.",
    solution: "An automated SMS/WhatsApp fee scheduler with direct payment gateways.",
    iconName: "GraduationCap",
    color: "#6E5528",
    metrics: [
      { label: "Fee Collection Efficiency", value: "+95%" },
      { label: "Admin Work Hours", value: "-60%" },
      { label: "Online Registrations", value: "3x Rise" }
    ],
    features: [
      { title: "Fee Auto-Reminders", desc: "Schedule automated notifications with direct UPI payment links." },
      { title: "Student Ledger", desc: "Consolidate marks, attendance, and library data in one screen." },
      { title: "Online Admissions Portal", desc: "Handle applications, document checking, and fee collection." },
      { title: "Teacher Planner", desc: "Track lesson plans, grading progress, and timetables." }
    ],
    faqs: [
      { q: "Do parents get a dedicated mobile app?", a: "Yes, we develop custom web and mobile dashboards for parents to monitor marks, attendance, and fee status." },
      { q: "Is the online payment portal secure?", a: "Yes, we integrate with PCI-DSS compliant payment gateways (Razorpay, Cashfree) with instant invoice notifications." }
    ]
  },
  default: {
    name: "Enterprise",
    title: "AI Automation & Custom Software for Enterprise Systems",
    tagline: "Replacing Manual Operations with Scalable Custom Software",
    description: "We build bespoke software platforms, intelligent workflow automations, and data analytics tools for enterprises. We resolve operational inefficiencies by writing robust code that automates repetitive work.",
    painPoint: "Businesses waste up to 40% of their operational capacity on manual calculations.",
    solution: "Unified digital databases with automated processing API interfaces.",
    iconName: "Building2",
    color: "#A37E36",
    metrics: [
      { label: "Operational Error Rate", value: "-98%" },
      { label: "Task Processing Speed", value: "5x" },
      { label: "Operational Savings", value: "30%+" }
    ],
    features: [
      { title: "Custom DB Architecture", desc: "Design highly structured, sharded database systems." },
      { title: "Workflow Automation Bots", desc: "Connect business software to trigger notifications." },
      { title: "Detailed KPI Dashboards", desc: "Log system usage, errors, and business ROI." },
      { title: "Granular Security Auditing", desc: "Role-based credentials with strict activity log tracks." }
    ],
    faqs: [
      { q: "How long does a custom enterprise software build take?", a: "A standard custom enterprise build takes between 8 to 16 weeks depending on the number of systems, modules, and legacy integrations required." },
      { q: "Do you offer post-launch support and hosting maintenance?", a: "Yes, we provide SLA-backed maintenance contracts, security patches, performance tuning, and 24/7 server monitoring." }
    ]
  }
};

interface PageProps {
  params: Promise<{ industry: string }>;
}

export default async function IndustryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const industrySlug = resolvedParams.industry;
  const industry = industryDetails[industrySlug] || {
    ...industryDetails.default,
    name: industrySlug.charAt(0).toUpperCase() + industrySlug.slice(1)
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `Custom Software & AI for ${industry.name}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Zentrix Technology",
      "image": `${siteConfig.url}/logo_main.png`,
      "telephone": siteConfig.contact.phone
    },
    "description": industry.description,
    "areaServed": "IN"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": industry.faqs.map((faq) => ({
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
      <IndustryClient industry={industry} industrySlug={industrySlug} />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { industry: "hospitals" },
    { industry: "healthcare" },
    { industry: "real-estate" },
    { industry: "manufacturing" },
    { industry: "hotels" },
    { industry: "retail" },
    { industry: "education" },
    { industry: "finance" },
    { industry: "construction" },
    { industry: "travel" }
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const industrySlug = resolvedParams.industry;
  const industry = industryDetails[industrySlug];
  if (!industry) return {};

  return {
    title: `${industry.title} | ${siteConfig.name}`,
    description: industry.description,
    alternates: {
      canonical: `${siteConfig.url}/industries/${industrySlug}`,
    },
    openGraph: {
      title: `${industry.title} | ${siteConfig.name}`,
      description: industry.description,
      url: `${siteConfig.url}/industries/${industrySlug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} | ${siteConfig.name}`,
      description: industry.description,
    }
  };
}
