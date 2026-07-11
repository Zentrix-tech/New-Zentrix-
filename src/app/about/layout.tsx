import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name}`,
  description: "Learn about Zentrix Technology, our mission, values, and our dedicated team of creative designers, developers, and AI automation architects in Salem, Tamil Nadu.",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: `About Us | ${siteConfig.name}`,
    description: "Learn about Zentrix Technology, our mission, values, and our dedicated team.",
    url: `${siteConfig.url}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About Us | ${siteConfig.name}`,
    description: "Learn about Zentrix Technology, our mission, values, and our dedicated team.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
