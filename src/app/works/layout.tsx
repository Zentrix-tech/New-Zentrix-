import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Our Work & Case Studies | ${siteConfig.name}`,
  description: "Explore our portfolio of high-performance web applications, native mobile apps, custom enterprise ERP/CRM portals, and AI systems built for business growth.",
  alternates: {
    canonical: `${siteConfig.url}/works`,
  },
  openGraph: {
    title: `Our Work & Case Studies | ${siteConfig.name}`,
    description: "Explore our portfolio of high-performance web applications, native mobile apps, and custom enterprise portals.",
    url: `${siteConfig.url}/works`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Our Work & Case Studies | ${siteConfig.name}`,
    description: "Explore our portfolio of high-performance web applications, native mobile apps, and custom enterprise portals.",
  },
};

export default function WorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
