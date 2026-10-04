"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import HighlightText from "@/components/ui/HighlightText";
import SectionWrapper from "@/components/ui/SectionWrapper";
import StackTags from "@/components/ui/StackTags";
import { getExpertiseForPersona, site } from "@/data/site";
import { usePersona } from "@/components/PersonaContext";
import { profileImagePath } from "@/lib/site-url";

export default function About() {
  const { persona } = usePersona();
  const expertiseGroups = getExpertiseForPersona(persona);

  return (
    <SectionWrapper id="about" label="07 / Background" title="Engineer with product instincts." className="editorial-flat">
      <div className="max-w-3xl space-y-6 sm:space-y-8">
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card-surface flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
        >
          <Image
            src={profileImagePath}
            alt=""
            width={80}
            height={80}
            sizes="80px"
            quality={75}
            loading="lazy"
            className="h-20 w-20 shrink-0 rounded-2xl border border-white/10 bg-surface object-cover object-top"
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-xl font-semibold">{site.name}</h3>
              <Badge variant="accent">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                {site.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm leading-relaxed">
              <HighlightText
                text={site.title}
                terms={["Full-Stack Engineer", "Applied AI", "Founding Engineer", "Horizon17"]}
                linkedTerms={{ Horizon17: site.links.horizon17 }}
                className="text-accent"
              />
            </p>
            <p className="mt-0.5 text-sm text-text-muted">
              {site.institution}
              <span className="text-text-muted"> · </span>
              <span className="text-accent/90">{site.yearsExperience}</span>
            </p>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="card-surface space-y-4 p-4 sm:p-6"
        >
          <p className="text-base leading-relaxed text-text-primary sm:text-lg">
            I&apos;m a full-stack engineer specializing in applied AI systems and a
            Founding Engineer at Horizon17 Technology and Sustainability Pvt. Ltd.
            I build enterprise ESG and AI products end-to-end with React.js,
            Next.js, Node.js, Express.js, and applied LLM systems.
          </p>
          <p className="leading-relaxed text-text-muted">
            At Horizon17, my direct engineering contribution to Ecometer and
            Ecolynk covers campaign carbon
            measurement, ESG assessments, materiality, supplier intelligence, AI
            reporting, and 20+ interactive dashboards. My work spans microservices,
            RBAC, Google Maps, NATS, Redis/BullMQ, Docker, CI/CD, Nginx, AWS
            ECR/EC2, and S3/MinIO object storage.
          </p>
          <p className="leading-relaxed text-text-muted">
            My applied AI work includes LangGraph agents, governed tool use,
            hybrid RAG and vector retrieval, streaming responses, human-in-the-loop
            workflows, and editable AI artifacts across Krashaq AI, Ecolynk, and
            an NDA-protected enterprise review platform. Previously, I delivered
            production client applications at WebIntegratorz, including Rent Buddy,
            with JWT-secured Express.js backends and mobile-first interfaces.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Button href={site.resumeUrl} external className="w-full sm:w-auto">
            View resume ↗
          </Button>
        </m.div>
      </div>

      <m.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-12 border-t border-white/5 pt-8 sm:mt-16 sm:pt-10"
      >
          <div className="mb-5 sm:mb-6">
            <h3 className="section-label">Where I focus</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
              Core strengths across the stack — reordered for what matters most
              to you.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {expertiseGroups.map((group, index) => (
              <div
                key={group.title}
                className={`card-surface p-4 sm:p-5 ${
                  index === 0 ? "ring-1 ring-accent/20" : ""
                }`}
              >
                <h4 className="font-medium">{group.title}</h4>
                <p className="mt-1 text-xs text-text-muted">{group.subtitle}</p>
                <StackTags
                  items={group.tags.slice(0, 6)}
                  className="mt-3 gap-1.5"
                />
              </div>
            ))}
          </div>
      </m.div>
    </SectionWrapper>
  );
}
