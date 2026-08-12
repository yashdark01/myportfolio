"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { processSteps } from "@/data/site";

export default function Process() {
  return (
    <SectionWrapper id="process" label="Process" title="How I Build">
      <div className="grid gap-6 md:grid-cols-2">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group card-surface p-6 md:p-8"
          >
            <p className="font-mono text-4xl font-bold text-white/5 transition-colors group-hover:text-accent/20">
              {step.number}
            </p>
            <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
