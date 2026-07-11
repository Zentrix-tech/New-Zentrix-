import { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/config/site";
import LocationClient from "./LocationClient";

interface LocalFAQ {
  q: string;
  a: string;
}

interface LocalTestimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

interface LocationData {
  name: string;
  title: string;
  tagline: string;
  description: string;
  marketContext: string;
  landmarks: string[];
  lat: number;
  lng: number;
  phone: string;
  address: string;
  testimonials: LocalTestimonial[];
  faqs: LocalFAQ[];
  specialties: string[];
}

const locationDetails: Record<string, LocationData> = {
  chennai: {
    name: "Chennai",
    title: "AI Automation & Custom Software Development in Chennai",
    tagline: "Empowering Chennai's SaaS, Automotive, & Enterprise Hubs with Cognitive AI",
    description: "Zentrix Technology delivers custom software engineering, AI agents, and enterprise ERP/CRM development in Chennai. We support the city's booming SaaS startups, automotive giants, and multi-specialty healthcare networks with secure, high-performance tech infrastructure.",
    marketContext: "As the SaaS capital and automotive hub of South India, Chennai businesses require top-tier, scalable systems with high availability. We build bespoke software that automates administrative bottlenecks, integrates legacy databases, and optimizes customer pipelines.",
    landmarks: ["Tidel Park, OMR", "Guindy Industrial Estate", "Nungambakkam Business Districts"],
    lat: 13.0827,
    lng: 80.2707,
    phone: siteConfig.contact.phone,
    address: "Regus business centre, Guindy, Chennai, Tamil Nadu, India",
    specialties: ["AI Agent Development", "SaaS Scalability & Next.js", "Healthcare Custom CRM", "Automotive Inventory Systems"],
    testimonials: [
      { name: "Suresh Raman", role: "CTO", company: "Metro Retailers Chennai", text: "Zentrix built our multi-store inventory automation system. They integrated it with our legacy accounting tools seamlessly. Outstanding engineering!", rating: 5 },
      { name: "Dr. Anjali Bose", role: "Director", company: "MedCare Multispecialty", text: "Their customized Hospital Management System transformed our patient queue flow and automated insurance claims processing. 10/10 service.", rating: 5 }
    ],
    faqs: [
      { q: "Why should Chennai startups choose Zentrix for custom software?", a: "Zentrix provides custom software development built on Next.js, Node.js, and high-performance databases. We don't use templates. Our code is optimized for SEO, speed, and AI search indexing, helping startups achieve both engineering excellence and market visibility." },
      { q: "Do you offer on-site consulting for enterprises in Chennai?", a: "Yes, our engineering team provides on-site consultation, systems audit, and database planning sessions for enterprise clients across OMR, Guindy, and Chennai's major industrial areas." },
      { q: "How long does it take to deploy an AI agent for business automation in Chennai?", a: "A custom cognitive AI agent for customer support or lead qualification usually takes between 3 to 6 weeks from workflow mapping to staging deployment." }
    ]
  },
  coimbatore: {
    name: "Coimbatore",
    title: "AI Automation & Custom ERP Development in Coimbatore",
    tagline: "Accelerating Coimbatore's Manufacturing, Textile, & Pump Industries",
    description: "Zentrix Technology builds enterprise ERP systems, AI workflow automation, and custom manufacturing software in Coimbatore. We optimize logistics, streamline stock tracking, and implement intelligent scheduling for Coimbatore's industrial leaders.",
    marketContext: "Coimbatore's status as a manufacturing powerhouse requires highly optimized operations. Our custom ERP solutions are built specifically to solve raw material wastage, machine downtime, and manual logistics logging.",
    landmarks: ["CODISSIA Complex", "Peelamedu Industrial Hub", "Ganapathy Pump Industry Zone"],
    lat: 11.0168,
    lng: 76.9558,
    phone: siteConfig.contact.phone,
    address: "Avanashi Road, Peelamedu, Coimbatore, Tamil Nadu, India",
    specialties: ["Custom ERP for Manufacturing", "Inventory & Barcode Scanning", "RPA for Supply Chains", "Local SEO & Lead Generation"],
    testimonials: [
      { name: "K. Rangaraj", role: "Managing Director", company: "Apex Pump Engineering", text: "The custom manufacturing ERP built by Zentrix helped us track inventory across three warehouses in real time. Our order delay rate dropped by 90%.", rating: 5 },
      { name: "Meera Krishnan", role: "Founder", company: "Kovai Textiles", text: "Zentrix upgraded our old website into a blazing-fast Next.js platform and optimized our Local SEO. We now receive regular B2B inquiries.", rating: 5 }
    ],
    faqs: [
      { q: "What custom ERP modules do you offer for Coimbatore factories?", a: "Our custom ERP includes HR/Payroll, Raw Material Inventory, Machine Scheduling, Purchase Order Automation, multi-branch bookkeeping, and GST-compliant invoicing." },
      { q: "Can your software connect with our existing factory machines?", a: "Yes, we build custom API interfaces and IoT connectors to read output logs from manufacturing machinery, feeding live production metrics directly into your ERP dashboard." },
      { q: "How does Zentrix optimize Local SEO for B2B exporters in Coimbatore?", a: "We build fast, schema-enriched websites that load in under 1 second, targeting specific buyer intent keywords locally and globally, increasing inquiries on search and AI overviews." }
    ]
  },
  salem: {
    name: "Salem",
    title: "AI Automation & Software Development Company in Salem",
    tagline: "Proudly Born in Salem — Driving Salem's Industrial & Digital Growth",
    description: "As Salem's premier software engineering company, Zentrix Technology builds custom software, school ERPs, hospital systems, and AI automation for local businesses, schools, and healthcare clinics.",
    marketContext: "Salem is a growing industrial city with vibrant textile, steel, sago, and agriculture businesses. We support local SMEs by replacing manual books with secure, accessible cloud portals and automation bots.",
    landmarks: ["Five Roads", "Shevaroys Hill View", "Salem Steel Plant Zone"],
    lat: 11.6643,
    lng: 78.146,
    phone: siteConfig.contact.phone,
    address: "Salem, Tamil Nadu, India",
    specialties: ["Hospital Management Systems (HMS)", "School Management ERP", "Steel & Textile ERP", "SEO & Meta Ads"],
    testimonials: [
      { name: "Dr. S. Kumar", role: "Chief Medical Officer", company: "Valli Hospital Salem", text: "Zentrix is Salem's best software team. They custom-built our OPD portal, pharmacy ledger, and billing. Patient wait times reduced by half.", rating: 5 },
      { name: "N. Selvam", role: "Correspondent", company: "AVS Institutions", text: "Our admission and online fee payments are fully managed by Zentrix's custom portal. Absolute reliability, zero downtime.", rating: 5 }
    ],
    faqs: [
      { q: "Why is Zentrix the leading software company in Salem?", a: "We are local engineers with global experience. We build custom React, Next.js, and Node.js solutions rather than selling generic templates, giving local companies premium technology that scale." },
      { q: "How does your Hospital Management System help Salem clinics?", a: "Our HMS automates OPD ticketing, patient medical histories, pharmacy billing, laboratory status, and Doctor schedules, with full mobile compatibility." },
      { q: "Can we visit your office in Salem to discuss our project?", a: "Yes! Salem is our main base. We welcome local business owners, school administrators, and doctors to meet our founders and plan their software." }
    ]
  },
  madurai: {
    name: "Madurai",
    title: "AI Automation & Web Development in Madurai",
    tagline: "Empowering the Temple City's Trade, Education, & Healthcare Sectors",
    description: "Zentrix Technology provides high-performance web development, mobile apps, and custom business software in Madurai. We support the city's wholesale traders, multi-specialty clinics, and prestigious colleges.",
    marketContext: "Madurai is the commercial gateway to Southern Tamil Nadu. We help traditional traders and colleges transition to modern, secure web databases and automated workflows.",
    landmarks: ["Meenakshi Temple Zone", "Mattuthavani IT Park", "Anna Nagar Business Hub"],
    lat: 9.9252,
    lng: 78.1198,
    phone: siteConfig.contact.phone,
    address: "Mattuthavani, Madurai, Tamil Nadu, India",
    specialties: ["Wholesale Trade portals", "Education ERP & Fee Collection", "Mobile App Development", "SEO & Meta Ads"],
    testimonials: [
      { name: "R. Pandian", role: "CEO", company: "Pandian Food Exporters", text: "Our B2B ordering portal developed by Zentrix has streamlined our billing. Our client catalog is updated instantly. Excellent work.", rating: 5 },
      { name: "Dr. K. Geetha", role: "Dean", company: "Southern Arts College", text: "The fee management and student portal Zentrix built for our college has made administrative tasks extremely smooth.", rating: 5 }
    ],
    faqs: [
      { q: "Do you offer customized billing software for Madurai traders?", a: "Yes, we build custom GST-compliant billing and multi-location inventory portals specifically tailored for wholesalers, distributors, and retail chains." },
      { q: "Can you help digitize student admissions for Madurai institutions?", a: "Yes, our School/College Management System handles the entire admission lifecycle from online applications to document screening, fee collection, and seat allocation." }
    ]
  },
  default: {
    name: "Tamil Nadu",
    title: "AI Automation & Software Development in Tamil Nadu",
    tagline: "Leading Digital Transformation Across Tamil Nadu's Industrial Hubs",
    description: "Zentrix Technology is Tamil Nadu's premier software engineering and AI automation company. We build custom ERP, CRM, Next.js web applications, and mobile apps that scale.",
    marketContext: "With Tamil Nadu's rapid growth as an industrial and technology leader, businesses need secure, high-speed, custom software solutions to stay ahead. We deliver global-grade technology directly to local industries.",
    landmarks: ["Local Industrial Estates", "District Administrative Hubs"],
    lat: 11.1271,
    lng: 78.6569,
    phone: siteConfig.contact.phone,
    address: "Salem & Chennai, Tamil Nadu, India",
    specialties: ["Custom Software Engineering", "AI Agent Workflows", "Enterprise ERP & CRM Development", "Search Engine Optimization"],
    testimonials: [
      { name: "V. Selvakumar", role: "Founder", company: "SME Trade Link", text: "Zentrix provided an excellent web application. Their performance is unmatched. Our B2B operations are fully automated now.", rating: 5 }
    ],
    faqs: [
      { q: "Which areas of Tamil Nadu does Zentrix service?", a: "We service clients across all major cities including Salem, Chennai, Coimbatore, Madurai, Trichy, Erode, Hosur, and more, offering remote support and on-site visits." },
      { q: "What is your main technology stack?", a: "We specialize in Next.js, React, Node.js, TypeScript, Python, AWS, Docker, and customized AI models." }
    ]
  }
};

interface PageProps {
  params: Promise<{ location: string }>;
}

export default async function LocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locationSlug = resolvedParams.location;
  const location = locationDetails[locationSlug] || {
    ...locationDetails.default,
    name: locationSlug.charAt(0).toUpperCase() + locationSlug.slice(1)
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Zentrix Technology - ${location.name}`,
    "image": `${siteConfig.url}/logo_main.png`,
    "telephone": location.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.name,
      "addressRegion": "Tamil Nadu",
      "addressCountry": "IN",
      "streetAddress": location.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.lat,
      "longitude": location.lng
    },
    "url": `${siteConfig.url}/locations/${locationSlug}`,
    "sameAs": [
      siteConfig.social.linkedin,
      siteConfig.social.github
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": location.faqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LocationClient location={location} locationSlug={locationSlug} />
    </>
  );
}

export async function generateStaticParams() {
  return [
    { location: "chennai" },
    { location: "coimbatore" },
    { location: "salem" },
    { location: "madurai" },
    { location: "trichy" },
    { location: "erode" },
    { location: "namakkal" },
    { location: "tiruppur" },
    { location: "vellore" },
    { location: "hosur" },
    { location: "tirunelveli" },
    { location: "thanjavur" },
    { location: "karur" },
    { location: "dindigul" },
    { location: "kanchipuram" },
    { location: "cuddalore" }
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locationSlug = resolvedParams.location;
  const location = locationDetails[locationSlug];
  if (!location) return {};

  return {
    title: `${location.title} | ${siteConfig.name}`,
    description: location.description,
    alternates: {
      canonical: `${siteConfig.url}/locations/${locationSlug}`,
    },
    openGraph: {
      title: `${location.title} | ${siteConfig.name}`,
      description: location.description,
      url: `${siteConfig.url}/locations/${locationSlug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${location.title} | ${siteConfig.name}`,
      description: location.description,
    }
  };
}
