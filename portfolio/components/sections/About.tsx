"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Tag from "@/components/ui/Tag";
import { getExpertiseForPersona, site } from "@/data/site";
import { usePersona } from "@/components/PersonaContext";

export default function About() {
  const { persona } = usePersona();
  const expertiseGroups = getExpertiseForPersona(persona);

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
          I&apos;m a Founding Engineer and Full Stack Developer at Horizon17
          Technology and Sustainability Pvt. Ltd., building enterprise-grade ESG
          and AI-driven platforms with React.js, Next.js, Node.js, Express.js, and applied LLM
          systems. I focus on RESTful and microservice backends, RAG pipelines,
          CI/CD and Docker-based deployments, and high-performance frontends that
          measurably improve how teams work.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="leading-relaxed text-text-muted"
        >
          At Horizon17, I contribute to Ecometer — EcoMS&apos;s sustainability
          platform — helping brands and agencies measure and report campaign
          environmental impact. I&apos;ve worked with microservices, Docker,
          CI/CD, Nginx, NATS, and object storage (S3/MinIO), and I&apos;m
          building depth in event-driven systems (Kafka), system design, and AWS
          EC2/Lambda. Before that, I delivered production client apps during my
          internship at WebIntegratorz — including Rent Buddy (live at rentbuddy.in),
          with JWT-secured Express.js backends and mobile-first UIs.
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {expertiseGroups.map((group, index) => (
              <div
                key={group.title}
                className={`card-surface p-5 ${index === 0 ? "border-accent/20" : ""}`}
              >
                <h4 className="font-medium">{group.title}</h4>
                <p className="mt-1 text-xs text-text-muted">{group.subtitle}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.tags.slice(0, 6).map((tag) => (
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
