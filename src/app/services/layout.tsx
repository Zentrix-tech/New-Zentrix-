import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Services — Custom Software & AI | ${siteConfig.name}`,
  description: "Explore our 22 premium digital services: Web Development, App Development, AI Automation, Custom ERP/CRM, HMS, SMS, SEO, and Meta/Google Ads campaigns.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: `Services — Custom Software & AI | ${siteConfig.name}`,
    description: "Explore our 22 premium digital services: Web Development, App Development, AI Automation, Custom ERP/CRM, and more.",
    url: `${siteConfig.url}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Services — Custom Software & AI | ${siteConfig.name}`,
    description: "Explore our 22 premium digital services: Web Development, App Development, AI Automation, Custom ERP/CRM, and more.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
