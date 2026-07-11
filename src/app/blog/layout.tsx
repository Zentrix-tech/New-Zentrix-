import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Blog & Insights | ${siteConfig.name}`,
  description: "Stay ahead with the latest industry insights, tech tutorials, and expert analysis on AI automation, web development, cloud solutions, and digital strategy from Zentrix Technology.",
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: `Blog & Insights | ${siteConfig.name}`,
    description: "Stay ahead with the latest industry insights, tech tutorials, and expert analysis from Zentrix Technology.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog & Insights | ${siteConfig.name}`,
    description: "Stay ahead with the latest industry insights, tech tutorials, and expert analysis from Zentrix Technology.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
