import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { siteConfig } from "@/lib/config/site";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CommandPalette from "@/components/ui/CommandPalette";
import PageLoader from "@/components/ui/PageLoader";
import PageTransition from "@/components/ui/PageTransition";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AuroraBackground from "@/components/ui/AuroraBackground";
import MouseSpotlight from "@/components/ui/MouseSpotlight";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — #1 Proven Next.js, React & AI Software Engineering`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.seo.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    creator: siteConfig.seo.twitterHandle,
    images: [siteConfig.seo.defaultOgImage],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#FAF6EE" },
    { media: "(prefers-color-scheme: light)", color: "#FAF6EE" },
  ],
};

// JSON-LD structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  foundingDate: String(siteConfig.founded),
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressRegion: siteConfig.location.state,
    addressCountry: siteConfig.location.countryCode,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    contactType: "customer service",
    availableLanguage: ["English", "Tamil"],
  },
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.github,
    siteConfig.social.instagram,
    siteConfig.social.facebook,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Film grain texture */}
        <div className="grain" aria-hidden="true" />

        {/* Global aurora background layer */}
        <AuroraBackground />

        {/* Mouse spotlight illumination */}
        <MouseSpotlight />

        {/* Global UI components */}
        <PageLoader />
        <PageTransition />
        <CustomCursor />
        <ScrollProgress />
        <CommandPalette />

        <SmoothScrollProvider>
          {/* Navigation */}
          <Navbar />

          {/* Main content */}
          <main>{children}</main>

          {/* Footer */}
          <Footer />
        </SmoothScrollProvider>

        {/* WhatsApp floating button — Client Component (has event handlers) */}
        <WhatsAppButton />

        {/* Google Analytics (GA4) Integration */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.googleAnalyticsId || "G-K89374B06C"}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${siteConfig.analytics.googleAnalyticsId || "G-K89374B06C"}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
