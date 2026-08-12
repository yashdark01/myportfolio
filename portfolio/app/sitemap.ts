import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/data/case-studies";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yashpatidar.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyPages = getAllCaseStudySlugs().map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudyPages,
  ];
}
