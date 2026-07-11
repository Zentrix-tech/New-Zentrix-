import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

const services = [
  "web-development",
  "app-development",
  "ai-automation",
  "enterprise-software",
  "ui-ux-design",
  "seo",
  "ai-agents",
  "voice-ai",
  "chatbots",
  "workflow-automation",
  "crm-development",
  "erp-development",
  "custom-software",
  "website-development",
  "mobile-app-development",
  "digital-marketing",
  "meta-ads",
  "google-ads"
];

const industries = [
  "hospitals",
  "healthcare",
  "real-estate",
  "manufacturing",
  "hotels",
  "retail",
  "education",
  "finance",
  "construction",
  "travel"
];

const locations = [
  "chennai",
  "coimbatore",
  "salem",
  "madurai",
  "trichy",
  "erode",
  "namakkal",
  "tiruppur",
  "vellore",
  "hosur",
  "tirunelveli",
  "thanjavur",
  "karur",
  "dindigul",
  "kanchipuram",
  "cuddalore"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const coreRoutes = siteConfig.navigation.main.map((link) => ({
    url: `${baseUrl}${link.href === "/" ? "" : link.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: link.name === "Home" ? 1.0 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const industryRoutes = industries.map((ind) => ({
    url: `${baseUrl}/industries/${ind}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const locationRoutes = locations.map((loc) => ({
    url: `${baseUrl}/locations/${loc}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...coreRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...locationRoutes,
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    }
  ];
}
