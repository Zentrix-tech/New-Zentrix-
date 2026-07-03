import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Services — 22 Premium Digital Services | ${siteConfig.name}`,
  description:
    "Explore 22 premium services from Zentrix Technology: Web Development, App Development, AI Automation, Enterprise ERP, CRM, Hospital & School Management, SEO, Digital Marketing, UI/UX Design, and more.",
  openGraph: {
    title: "Services — Everything You Need Under One Roof | Zentrix Technology",
    description: "22 services. One trusted partner. Web development to AI automation — Zentrix delivers world-class software solutions.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};
