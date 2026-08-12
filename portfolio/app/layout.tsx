import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import Footer from "@/components/layout/Footer";
import MobileResumeFab from "@/components/layout/MobileResumeFab";
import Navbar from "@/components/layout/Navbar";
import RecruiterMode from "@/components/RecruiterMode";
import JsonLd from "@/components/JsonLd";
import SectionScrollHandler from "@/components/SectionScrollHandler";
import SkipToContent from "@/components/layout/SkipToContent";
import { site } from "@/data/site";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yashpatidar.vercel.app";

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
  ],
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  openGraph: {
    title: `${site.name} — Full Stack Engineer`,
    description: site.tagline,
    url: siteUrl,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
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
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <JsonLd />
        <SectionScrollHandler />
        <SkipToContent />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <RecruiterMode />
        <MobileResumeFab />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
