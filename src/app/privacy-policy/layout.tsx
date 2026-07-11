import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: "Read our privacy policy to understand how Zentrix Technology handles, protects, and governs client and user data.",
  alternates: {
    canonical: `${siteConfig.url}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: "Read our privacy policy to understand how Zentrix Technology handles, protects, and governs client and user data.",
    url: `${siteConfig.url}/privacy-policy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Privacy Policy | ${siteConfig.name}`,
    description: "Read our privacy policy to understand how Zentrix Technology handles, protects, and governs client and user data.",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
