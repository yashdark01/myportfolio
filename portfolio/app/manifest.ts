import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yash Patidar — Portfolio",
    short_name: "Yash Patidar",
    description:
      "Full Stack Engineer building enterprise ESG platforms and AI-driven products.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#10b981",
  };
}
