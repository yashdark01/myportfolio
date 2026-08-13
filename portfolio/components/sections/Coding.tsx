"use client";

import { m } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

export default function Coding() {
  return (
    <SectionWrapper id="coding" label="Interview Prep" title="DSA & Problem Solving">
      <div className="card-surface max-w-2xl p-6 md:p-8">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold">{site.coding.leetcode.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {site.coding.leetcode.note}. I practice consistently for product
            company technical screens — patterns, time complexity, and clean
            implementation matter more than problem count alone.
          </p>

          <a
            href={site.coding.leetcode.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("leetcode_click")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface-elevated px-5 py-3 text-sm font-medium transition-colors hover:border-accent/30 hover:text-accent"
          >
            View LeetCode Profile ↗
          </a>

          <p className="mt-4 font-mono text-xs text-text-muted">
            leetcode.com/u/yashdark_01
          </p>
        </m.div>
      </div>
    </SectionWrapper>
  );
}
