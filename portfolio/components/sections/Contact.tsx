"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@/components/ui/Button";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { site } from "@/data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = site.links.email;
    }
  };

  return (
    <SectionWrapper id="contact" label="Contact" title="Get in Touch">
      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="leading-relaxed text-text-muted">
            I&apos;m open to full-stack and AI engineering roles at product
            companies. The fastest way to reach me is email — I typically
            respond within 24 hours.
          </p>

          <div className="mt-8 space-y-4">
            <button
              type="button"
              onClick={copyEmail}
              className="group flex w-full items-center justify-between rounded-lg border border-white/10 bg-surface px-4 py-3 text-left transition-colors hover:border-white/20"
            >
              <div>
                <p className="section-label mb-1">Email</p>
                <p className="text-sm text-text-primary">{site.email}</p>
              </div>
              <span className="text-xs text-accent">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button href={site.links.linkedin} variant="secondary" external>
                LinkedIn ↗
              </Button>
              <Button href={site.links.github} variant="secondary" external>
                GitHub ↗
              </Button>
              <Button href={site.resumeUrl} variant="secondary" external>
                Resume ↗
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="card-surface p-6 md:p-8"
        >
          <h3 className="font-medium">Quick message</h3>
          <p className="mt-2 text-sm text-text-muted">
            Send me an email directly with your subject line and message pre-filled.
          </p>
          <a
            href={`mailto:${site.email}?subject=Opportunity%20-%20Yash%20Patidar&body=Hi%20Yash%2C%0A%0A`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Open in email client
          </a>
          <p className="mt-4 text-center font-mono text-xs text-text-muted">
            {site.phone}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
