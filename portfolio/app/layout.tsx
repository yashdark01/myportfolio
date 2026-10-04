import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { PersonaProvider } from "@/components/PersonaContext";
import Footer from "@/components/layout/Footer";
import DeferredWidgets from "@/components/layout/DeferredWidgets";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/layout/Navbar";
import JsonLd from "@/components/JsonLd";
import SectionScrollHandler from "@/components/SectionScrollHandler";
import SkipToContent from "@/components/layout/SkipToContent";
import RouteTransition from "@/components/motion/RouteTransition";
import { getSiteUrl, profileIconPath, profileImagePath } from "@/lib/site-url";
import { site } from "@/data/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const viewport: Viewport = {
  themeColor: "#10b981",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Applied AI Engineer & Full Stack Developer`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "Yash Patidar",
    "Yash Patidar portfolio",
    "Yash Patidar developer",
    "Yash Patidar AI engineer",
    "Yash Patidar IIIT Nagpur",
    "Applied AI Engineer",
    "AI Full Stack Developer",
    "Full Stack Engineer India",
    "Next.js Developer",
    "React Developer",
    "LangGraph engineer",
    "LangChain developer",
    "RAG pipeline engineer",
    "Founding Engineer Horizon17",
    "IIIT Nagpur engineer",
    "Krashaq AI",
    "AI agritech engineer",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  // Google Search Console verification — replace token after GSC setup
  verification: {
    google: "REPLACE_WITH_GSC_TOKEN",
  },
  icons: {
    icon: [{ url: profileIconPath, type: "image/webp" }],
    apple: [{ url: profileIconPath, type: "image/webp" }],
  },
  openGraph: {
    title: `${site.name} — Applied AI Engineer & Full Stack Developer`,
    description: site.tagline,
    url: siteUrl,
    siteName: `${site.name} — Portfolio`,
    locale: "en_IN",
    type: "profile",
    firstName: "Yash",
    lastName: "Patidar",
    username: "yashdark01",
    gender: "male",
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: `${site.name} — Applied AI Engineer & Full Stack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Applied AI Engineer & Full Stack Developer`,
    description: site.tagline,
    images: [`${siteUrl}/opengraph-image`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} scroll-smooth`}
    >
      <head>
        {/* rel="me" — cross-links social profiles to verify identity with Google */}
        <link rel="me" href={site.links.linkedin} />
        <link rel="me" href={site.links.github} />
        <link rel="me" href={`mailto:${site.email}`} />
      </head>
      <body className="min-h-screen overflow-x-clip bg-background text-text-primary antialiased">
        <JsonLd />
        <SectionScrollHandler />
        <SkipToContent />
        <MotionProvider>
          <Navbar />
          <PersonaProvider>
            <RouteTransition>{children}</RouteTransition>
          </PersonaProvider>
          <Footer />
          <DeferredWidgets />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

