import type { MetadataRoute } from "next";
import { getSiteUrl, profileIconPath } from "@/lib/site-url";

export default function manifest(): MetadataRoute.Manifest {
  const siteUrl = getSiteUrl();

  return {
    id: siteUrl,
    name: "Yash Patidar — Portfolio",
    short_name: "Yash Patidar",
    description:
      "Full Stack Engineer building enterprise ESG platforms and AI-driven products.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#10b981",
    icons: [
      {
        src: profileIconPath,
        sizes: "192x192",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: profileIconPath,
        sizes: "192x192",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}
