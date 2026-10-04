import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import CaseStudyTracker from "@/components/case-study/CaseStudyTracker";
import StructuredData from "@/components/StructuredData";
import {
  getAllCaseStudySlugs,
  getCaseStudy,
} from "@/data/case-studies";
import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: `${study.title} — Case Study`,
    description: study.caseStudyTitle,
    alternates: {
      canonical: `${siteUrl}/work/${study.id}`,
    },
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.subtitle,
      url: `${siteUrl}/work/${study.id}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const pageUrl = `${siteUrl}/work/${study.id}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#case-study`,
    name: `${study.title} — Engineering Case Study`,
    headline: study.caseStudyTitle,
    description: study.subtitle,
    url: pageUrl,
    author: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
    creator: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
    keywords: study.stack.join(", "),
    about: study.stack.map((name) => ({ "@type": "Thing", name })),
    ...(study.github ? { codeRepository: study.github } : {}),
    ...(study.live
      ? {
          workExample: {
            "@type": "WebApplication",
            name: study.title,
            url: study.live,
            applicationCategory: "DeveloperApplication",
          },
        }
      : {}),
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <CaseStudyTracker slug={slug} />
      <CaseStudyView study={study} />
    </>
  );
}
