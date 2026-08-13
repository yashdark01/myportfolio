"use client";

import { m } from "framer-motion";
import Badge from "@/components/ui/Badge";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { timeline } from "@/data/experience";

export default function Journey() {
  return (
    <SectionWrapper id="journey" label="Timeline" title="Journey">
      <div className="relative">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/10 md:left-[11px]" />

        <div className="space-y-8">
          {timeline.map((entry, index) => (
            <m.div
              key={entry.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative pl-8 md:pl-10"
            >
              <div className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-accent bg-background md:h-[23px] md:w-[23px]" />

              <p className="font-mono text-xs text-text-muted">{entry.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{entry.title}</h3>
              <p className="text-sm text-text-muted">{entry.organization}</p>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {entry.description}
              </p>
              {entry.badge && (
                <Badge variant="accent" className="mt-3">
                  {entry.badge}
                </Badge>
              )}
            </m.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
