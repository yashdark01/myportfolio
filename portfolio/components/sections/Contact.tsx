"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const opportunityDetails = [
  { label: "Roles", value: site.openTo.roles.join(" · ") },
  { label: "Team", value: site.openTo.stage },
  { label: "Location", value: site.openTo.location },
  { label: "Availability", value: site.openTo.available },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    trackEvent("email_copy");
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = site.links.email;
    }
  };

  return (
    <SectionWrapper id="contact" label="08 / Build together" title="Have a hard problem? Let’s make it real." className="contact-section overflow-hidden">
      <div className="contact-orb" aria-hidden />
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
            I’m open to product engineering and applied AI roles where architecture, user experience and shipping quality all matter.
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {opportunityDetails.map((detail, index) => (
              <SpotlightCard key={detail.label} className="min-h-[8.5rem] p-5" delay={index * 0.05}>
                <p className="section-label mb-2 text-accent">{detail.label}</p>
                <p className="text-sm leading-relaxed text-text-primary">{detail.value}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col justify-between rounded-[1.5rem] border border-accent/20 bg-[linear-gradient(145deg,rgba(16,185,129,.1),rgba(8,12,10,.88))] p-6 shadow-2xl shadow-black/30 sm:p-8">
          <div>
            <p className="section-label text-accent">Direct channel</p>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Start with a simple hello.</h3>
            <p className="mt-4 leading-relaxed text-text-muted">Email is the fastest way to reach me. I typically respond within 24 hours.</p>
          </div>

          <div className="mt-12">
            <button
              type="button"
              onClick={copyEmail}
              className="group flex w-full items-center justify-between gap-4 border-b border-white/15 pb-4 text-left"
            >
              <span className="min-w-0 truncate text-sm text-text-primary sm:text-base">{site.email}</span>
              <span className="shrink-0 font-mono text-xs text-accent">{copied ? "Copied ✓" : "Copy"}</span>
            </button>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={site.links.email} className="min-w-[10rem] flex-1 py-3" onClick={() => trackEvent("contact_email_click")}>
                Write an email ↗
              </Button>
              <Button href={site.links.linkedin} variant="secondary" external className="py-3">
                LinkedIn ↗
              </Button>
              <Button href={site.links.github} variant="secondary" external className="py-3">
                GitHub ↗
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
