"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Tag from "@/components/ui/Tag";
import {
  ecometerEcosystemClients,
  socialProof,
  testimonials,
} from "@/data/social-proof";
import { trackEvent } from "@/lib/analytics";

export default function SocialProof() {
  const featuredTestimonial = testimonials[0];

  return (
    <SectionWrapper
      id="social-proof"
      label="Social proof"
      title="Trusted in production"
    >
      {featuredTestimonial && (
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card-surface mb-8 border-accent/20 p-6 md:p-8"
        >
          <p className="section-label mb-4">Recommendation</p>
          <p className="text-lg leading-relaxed text-text-primary">
            &ldquo;{featuredTestimonial.quote}&rdquo;
          </p>
          <footer className="mt-4 text-sm text-text-muted">
            — {featuredTestimonial.name},{" "}
            {featuredTestimonial.title} · {featuredTestimonial.company}
            {featuredTestimonial.linkedIn && (
              <>
                {" · "}
                <Link
                  href={featuredTestimonial.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover"
                >
                  LinkedIn ↗
                </Link>
              </>
            )}
          </footer>
        </motion.blockquote>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card-surface p-6 md:p-8"
        >
          <p className="section-label mb-3">EcoMS ecosystem</p>
          <p className="leading-relaxed text-text-muted">
            {socialProof.ecosystem}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {ecometerEcosystemClients.map((client) => (
              <Tag key={client}>{client}</Tag>
            ))}
          </div>
          <a
            href="https://ecomsww.com/case-studies/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm text-accent hover:text-accent-hover"
            onClick={() =>
              trackEvent("project_link_click", {
                project: "ecometer",
                type: "live",
                source: "social_proof",
              })
            }
          >
            Public EcoMS case studies ↗
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card-surface flex flex-col justify-between p-6 md:p-8"
        >
          <div>
            <p className="section-label mb-3">
              {featuredTestimonial ? "More on LinkedIn" : "Recommendations"}
            </p>
            <p className="leading-relaxed text-text-muted">
              {featuredTestimonial
                ? "Additional skills endorsements, internship delivery (4+ production apps), and founding-engineer context on Ecometer."
                : socialProof.testimonialPlaceholder}
            </p>
          </div>
          <Link
            href={socialProof.linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("social_link_click", {
                platform: "linkedin",
                source: "social_proof",
              })
            }
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover"
          >
            {socialProof.linkedInLabel} ↗
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
