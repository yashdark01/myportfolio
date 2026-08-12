"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function CaseStudyTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent("project_link_click", { project: slug, type: "case_study" });
  }, [slug]);

  return null;
}
