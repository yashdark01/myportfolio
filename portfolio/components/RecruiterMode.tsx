"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import Button from "@/components/ui/Button";
import StackTags from "@/components/ui/StackTags";
import { expertiseGroups, recruiterSnapshot, site } from "@/data/site";
import { useScrollLock } from "@/lib/useScrollLock";
import { trackEvent } from "@/lib/analytics";

export default function RecruiterMode() {
  const [open, setOpen] = useState(false);

  useScrollLock(open);

  const handleOpen = () => {
    trackEvent("recruiter_mode_open");
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-40 hidden rounded-full border border-accent/30 bg-accent px-4 py-2.5 text-sm font-medium text-background shadow-lg shadow-accent/20 transition-transform hover:scale-105 md:block"
      >
        For Recruiters
      </button>

      <button
        type="button"
        onClick={handleOpen}
        aria-label="HR — Open recruiter mode"
        className="fixed z-40 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent text-background shadow-lg shadow-accent/20 md:hidden"
        style={{
          bottom: "max(1.5rem, env(safe-area-inset-bottom))",
          right: "max(1.5rem, env(safe-area-inset-right))",
        }}
      >
        <span className="text-xs font-bold">HR</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <m.button
              type="button"
              aria-label="Close recruiter mode"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <m.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-white/10 bg-surface p-6 shadow-2xl md:p-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="recruiter-mode-title"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="section-label mb-2">Recruiter snapshot</p>
                  <h2
                    id="recruiter-mode-title"
                    className="text-2xl font-semibold"
                  >
                    {site.name}
                  </h2>
                  <p className="mt-1 text-sm text-text-muted">
                    {recruiterSnapshot.headline}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-white/10 px-2 py-1 text-sm text-text-muted hover:text-text-primary"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm leading-relaxed text-text-muted">
                {recruiterSnapshot.summary}
              </p>

              <ul className="mt-4 space-y-2">
                {recruiterSnapshot.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-text-primary"
                  >
                    <span className="text-accent">→</span>
                    {item}
                  </li>
                ))}
              </ul>

              <StackTags items={recruiterSnapshot.topStack} />

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Button
                  href={site.resumeUrl}
                  external
                  className="w-full"
                  onClick={() =>
                    trackEvent("resume_download", { source: "recruiter_mode" })
                  }
                >
                  Download Resume
                </Button>
                <Button
                  href={site.links.email}
                  variant="secondary"
                  className="w-full"
                  onClick={() => trackEvent("contact_email_click")}
                >
                  Email Me
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { label: "LinkedIn", href: site.links.linkedin },
                  { label: "GitHub", href: site.links.github },
                  ...(site.showLeetCode
                    ? [{ label: "LeetCode", href: site.links.leetcode }]
                    : []),
                  {
                    label: "Krashaq Live",
                    href: "https://krashaq-agritech.vercel.app",
                  },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("social_link_click", { platform: link.label })
                    }
                    className="text-xs text-accent hover:text-accent-hover"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>

              <div className="mt-6 border-t border-white/5 pt-4">
                <p className="section-label mb-3">Where I focus</p>
                <div className="space-y-2">
                  {expertiseGroups.map((group) => (
                    <p key={group.title} className="text-xs text-text-muted">
                      <span className="text-text-primary">{group.title}</span>
                      {" · "}
                      {group.tags.slice(0, 4).join(", ")}
                    </p>
                  ))}
                </div>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
