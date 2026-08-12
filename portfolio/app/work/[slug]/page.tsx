import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import CaseStudyTracker from "@/components/case-study/CaseStudyTracker";
import {
  getAllCaseStudySlugs,
  getCaseStudy,
} from "@/data/case-studies";

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
    openGraph: {
      title: `${study.title} — Case Study`,
      description: study.subtitle,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <CaseStudyTracker slug={slug} />
      <CaseStudyView study={study} />
    </>
  );
}
