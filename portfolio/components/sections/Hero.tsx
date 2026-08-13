"use client";

import { AnimatePresence, motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import FeaturedProject from "@/components/sections/FeaturedProject";
import { usePersona } from "@/components/PersonaContext";
import { Persona, personas, site, socialLinks } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const personaOptions = [
  { id: "product" as Persona, label: "Full Stack / Product" },
  { id: "ai" as Persona, label: "AI / LLM" },
] as const;

export default function Hero() {
  const { persona, setPersona } = usePersona();

  const stats = persona === "product" ? site.heroStats : site.aiHeroStats;
  const tagline = personas[persona].tagline;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center pt-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <Badge variant="accent">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            {site.status}
          </Badge>
          <span className="text-sm text-text-muted">
            Recently shipped:{" "}
            <a
              href="https://krashaq-agritech.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("project_link_click", {
                  project: "krashaq",
                  type: "live",
                  source: "hero",
                })
              }
              className="text-text-primary underline decoration-white/20 underline-offset-4 hover:text-accent"
            >
              {site.recentlyShipped}
            </a>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <p className="section-label mb-4">Viewing as</p>
          {/* Equal-width tabs — prevents horizontal shift when active tab changes */}
          <div
            className="grid w-full max-w-md grid-cols-2 gap-1 rounded-lg border border-white/10 p-1"
            role="tablist"
            aria-label="Portfolio viewing mode"
          >
            {personaOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={persona === option.id}
                onClick={() => setPersona(option.id)}
                className={`rounded-md px-3 py-2 text-center text-sm transition-colors duration-200 sm:px-4 ${
                  persona === option.id
                    ? "bg-white/10 text-text-primary"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
            {site.name}
          </h1>
          <p className="mt-4 text-xl text-text-muted md:text-2xl">
            {site.title}
          </p>
          <p className="mt-2 font-mono text-sm text-text-muted">
            {site.institution}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted"
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={persona}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              {tagline}
            </motion.span>
          </AnimatePresence>
        </motion.p>

        {/* Fixed-height metric grid — crossfade only, no remount / slide-in */}
        <div
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-surface relative min-h-[5.75rem] md:min-h-[6.25rem]"
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={`${persona}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex flex-col justify-center p-4 md:p-5"
                >
                  <p className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 min-h-[2.5rem] text-xs leading-snug text-text-muted md:text-sm">
                    {stat.label}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10"
        >
          <FeaturedProject />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button
            href={site.resumeUrl}
            external
            onClick={() =>
              trackEvent("resume_download", { source: "hero" })
            }
          >
            Resume
          </Button>
          <Button href="#contact" variant="secondary">
            Get in touch
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("social_link_click", { platform: link.id })
              }
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
