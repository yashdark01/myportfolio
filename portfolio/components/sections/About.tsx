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
    <SectionWrapper id="about" label="Background" title="About">
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
                terms={["Founding Engineer", "Horizon17"]}
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
            I&apos;m a Founding Engineer and Full Stack Developer at Horizon17
            Technology and Sustainability Pvt. Ltd., building enterprise-grade ESG
            and AI-driven platforms with React.js, Next.js, Node.js, Express.js,
            and applied LLM systems.
          </p>
          <p className="leading-relaxed text-text-muted">
            At Horizon17, I contribute to Ecometer — EcoMS&apos;s sustainability
            platform — helping brands and agencies measure and report campaign
            environmental impact. I&apos;ve worked with microservices, Docker,
            CI/CD, Nginx, NATS, and object storage (S3/MinIO), and I&apos;m
            building depth in event-driven systems (Kafka), system design, and AWS
            EC2/Lambda. Before that, I delivered production client apps during my
            internship at WebIntegratorz — including Rent Buddy (live at
            rentbuddy.in), with JWT-secured Express.js backends and mobile-first
            UIs.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid gap-3 sm:grid-cols-2"
        >
          <div className="card-surface p-4">
            <p className="section-label mb-1.5">Open to</p>
            <p className="text-sm leading-relaxed text-text-muted">
              {site.openTo.roles.join(" · ")}
            </p>
          </div>
          <div className="card-surface p-4">
            <p className="section-label mb-1.5">Location</p>
            <p className="text-sm leading-relaxed text-text-muted">
              {site.openTo.location}
            </p>
          </div>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Button href={site.resumeUrl} external className="w-full sm:w-auto">
            View Resume ↗
          </Button>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="border-t border-white/5 pt-8 sm:pt-10"
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
      </div>
    </SectionWrapper>
  );
}
