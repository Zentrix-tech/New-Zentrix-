import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Careers — Join Our Team | ${siteConfig.name}`,
  description: "Build the future of technology with us. Explore exciting career opportunities at Zentrix Technology and work on cutting-edge AI systems, SaaS, and mobile architectures.",
  alternates: {
    canonical: `${siteConfig.url}/careers`,
  },
  openGraph: {
    title: `Careers — Join Our Team | ${siteConfig.name}`,
    description: "Build the future of technology with us. Explore exciting career opportunities at Zentrix Technology.",
    url: `${siteConfig.url}/careers`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Careers — Join Our Team | ${siteConfig.name}`,
    description: "Build the future of technology with us. Explore exciting career opportunities at Zentrix Technology.",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
