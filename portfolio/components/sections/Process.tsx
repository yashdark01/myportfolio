"use client";

import { m } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { processSteps } from "@/data/site";

export default function Process() {
  return (
    <SectionWrapper id="process" label="Process" title="How I Build">
      <p className="-mt-8 mb-8 max-w-2xl text-sm leading-relaxed text-text-muted">
        Four steps I follow on every project — from scoping the problem to
        shipping proof you can click or read.
      </p>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {processSteps.map((step, index) => (
          <m.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`group card-surface flex h-full flex-col p-4 sm:p-6 md:p-8 ${
              index === 0 ? "ring-1 ring-accent/20" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/25 bg-accent-muted font-mono text-sm font-bold text-accent transition-colors group-hover:border-accent/40 group-hover:text-accent"
              >
                {step.number}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className="text-base font-semibold leading-snug sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
