import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Innovation Lab | ${siteConfig.name}`,
  description: "Step into our playground for bleeding-edge R&D, advanced machine learning prototypes, generative AI experiments, and next-generation workflow tools.",
  alternates: {
    canonical: `${siteConfig.url}/innovation-lab`,
  },
  openGraph: {
    title: `Innovation Lab | ${siteConfig.name}`,
    description: "Step into our playground for bleeding-edge R&D, advanced machine learning prototypes, and generative AI experiments.",
    url: `${siteConfig.url}/innovation-lab`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Innovation Lab | ${siteConfig.name}`,
    description: "Step into our playground for bleeding-edge R&D, advanced machine learning prototypes, and generative AI experiments.",
  },
};

export default function InnovationLabLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
