"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MetricCard from "@/components/ui/MetricCard";
import { Persona, site } from "@/data/site";

export default function Hero() {
  const [persona, setPersona] = useState<Persona>("product");

  const stats =
    persona === "product" ? site.heroStats : site.aiHeroStats;

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
            <span className="text-text-primary">{site.recentlyShipped}</span>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <p className="section-label mb-4">Viewing as</p>
          <div className="inline-flex rounded-lg border border-white/10 p-1">
            {(
              [
                { id: "product" as Persona, label: "Full Stack / Product" },
                { id: "ai" as Persona, label: "AI / LLM" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setPersona(option.id)}
                className={`rounded-md px-4 py-2 text-sm transition-all duration-200 ${
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
        >
          {site.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {stats.map((stat, index) => (
            <MetricCard
              key={`${persona}-${stat.label}`}
              value={stat.value}
              label={stat.label}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href={site.resumeUrl} external>
            Resume
          </Button>
          <Button href="#contact" variant="secondary">
            Get in touch
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
