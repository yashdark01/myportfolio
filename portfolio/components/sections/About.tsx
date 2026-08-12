"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Tag from "@/components/ui/Tag";
import { expertiseGroups, site } from "@/data/site";

export default function About() {
  return (
    <SectionWrapper id="about" label="Background" title="About">
      <div className="max-w-3xl space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-lg leading-relaxed text-text-muted"
        >
          I&apos;m a Full Stack Software Engineer skilled in building
          enterprise-grade ESG and AI-driven platforms with React.js, Next.js,
          Node.js, and FastAPI. I focus on RESTful microservices, RAG-based LLM
          systems, and high-performance frontends that measurably improve how
          teams work.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="leading-relaxed text-text-muted"
        >
          At Horizon17, I architect ESG dashboards and AI assistants that cut
          page loads by 40%, backend latency by 45%, and report drafting time by
          60%. Before that, I shipped 4+ production apps during my internship at
          WebIntegratorz — from JWT-secured backends to mobile-first PWAs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button href={site.resumeUrl} external>
            View Resume ↗
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="pt-8"
        >
          <h3 className="section-label mb-6">Where I focus</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {expertiseGroups.map((group) => (
              <div key={group.title} className="card-surface p-5">
                <h4 className="font-medium">{group.title}</h4>
                <p className="mt-1 text-xs text-text-muted">{group.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.tags.slice(0, 4).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
