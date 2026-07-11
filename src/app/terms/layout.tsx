import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: "Review the terms and conditions governing software development services, project agreements, and website use with Zentrix Technology.",
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
  openGraph: {
    title: `Terms of Service | ${siteConfig.name}`,
    description: "Review the terms and conditions governing software development services and project agreements with Zentrix Technology.",
    url: `${siteConfig.url}/terms`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Terms of Service | ${siteConfig.name}`,
    description: "Review the terms and conditions governing software development services and project agreements with Zentrix Technology.",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
