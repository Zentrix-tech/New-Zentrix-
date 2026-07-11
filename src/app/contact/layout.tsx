import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.name}`,
  description: "Get in touch with Zentrix Technology to discuss your software engineering, AI automation, custom CRM/ERP development, or digital marketing goals.",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: `Contact Us | ${siteConfig.name}`,
    description: "Get in touch with Zentrix Technology to discuss your software engineering, AI automation, or CRM/ERP development.",
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Us | ${siteConfig.name}`,
    description: "Get in touch with Zentrix Technology to discuss your software engineering, AI automation, or CRM/ERP development.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
