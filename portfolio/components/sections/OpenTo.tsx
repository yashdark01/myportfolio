"use client";

import { m } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { site } from "@/data/site";

const fields = [
  { label: "Experience", value: site.yearsExperience },
  { label: "Roles", value: site.openTo.roles.join(" · ") },
  { label: "Stage", value: site.openTo.stage },
  { label: "Location", value: site.openTo.location },
  { label: "Available", value: site.openTo.available },
];

export default function OpenTo() {
  return (
    <SectionWrapper id="open-to" label="Next" title="What I'm Looking For">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field, index) => (
          <m.div
            key={field.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="card-surface p-6"
          >
            <p className="section-label mb-2">{field.label}</p>
            <p className="text-sm leading-relaxed text-text-primary">
              {field.value}
            </p>
          </m.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
