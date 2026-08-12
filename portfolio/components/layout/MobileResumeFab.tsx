"use client";

import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

export default function MobileResumeFab() {
  return (
    <a
      href={site.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("resume_download", { source: "mobile_fab" })}
      className="fixed bottom-6 left-6 z-40 flex h-12 items-center rounded-full border border-white/10 bg-surface px-4 text-sm font-medium text-text-primary shadow-lg md:hidden"
    >
      Resume ↗
    </a>
  );
}
