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
    default: `${site.name} — Full Stack Engineer`,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "Yash Patidar",
    "Full Stack Engineer",
    "Next.js Developer",
    "React Developer",
    "AI Engineer",
    "LangChain",
    "IIIT Nagpur",
    "2+ years experience",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  icons: {
    icon: [{ url: profileIconPath, type: "image/webp" }],
    apple: [{ url: profileIconPath, type: "image/webp" }],
  },
  openGraph: {
    title: `${site.name} — Full Stack Engineer`,
    description: site.tagline,
    url: siteUrl,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: profileImagePath,
        width: 256,
        height: 256,
        alt: `${site.name} — profile`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Full Stack Engineer`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
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
      <body className="min-h-screen overflow-x-clip bg-background text-text-primary antialiased">
        <JsonLd />
        <SectionScrollHandler />
        <SkipToContent />
        <MotionProvider>
          <Navbar />
          <PersonaProvider>
            <main>{children}</main>
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
