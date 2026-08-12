import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/data/blog";
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

  const blogPages = [
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...getAllBlogSlugs().map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudyPages,
    ...blogPages,
  ];
}
