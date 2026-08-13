"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import Button from "@/components/ui/Button";
import HighlightText from "@/components/ui/HighlightText";
import { usePersona } from "@/components/PersonaContext";
import { Persona, personas, site, socialLinks } from "@/data/site";
import {
  heroHighlights,
  heroLinkedTerms,
} from "@/lib/hero-content";
import { trackEvent } from "@/lib/analytics";

const FeaturedProject = dynamic(
  () => import("@/components/sections/FeaturedProject"),
);

const personaOptions = [
  { id: "product" as Persona, label: "Full Stack / Product" },
  { id: "ai" as Persona, label: "AI / LLM" },
] as const;

function HeroStats({
  stats,
}: {
  stats: readonly { value: string; label: string }[];
}) {
  return (
    <div
      className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
      aria-live="polite"
      aria-atomic="true"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card-surface flex min-h-[5.75rem] flex-col justify-center p-4 md:min-h-[6.25rem] md:p-5"
        >
          <p className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
            {stat.value}
          </p>
          <p className="mt-1 text-xs leading-snug text-text-muted md:text-sm">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

interface HeroClientProps {
  productTagline: ReactNode;
}

export default function HeroClient({ productTagline }: HeroClientProps) {
  const { persona, setPersona } = usePersona();
  const stats = persona === "product" ? site.heroStats : site.aiHeroStats;

  return (
    <>
      {persona === "product" ? (
        productTagline
      ) : (
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-muted">
          <HighlightText
            text={personas.ai.tagline}
            terms={heroHighlights.ai}
            linkedTerms={heroLinkedTerms}
          />
        </p>
      )}

      <div className="mb-10 mt-8">
        <p className="section-label mb-4">Viewing as</p>
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
              className={`rounded-md px-2.5 py-2.5 text-center text-xs transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                persona === option.id
                  ? "bg-white/10 text-text-primary"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <HeroStats stats={stats} />

      <div className="mt-10">
        <FeaturedProject />
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button
          href={site.resumeUrl}
          external
          onClick={() => trackEvent("resume_download", { source: "hero" })}
        >
          Resume
        </Button>
        <Button href="#contact" variant="secondary">
          Get in touch
        </Button>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
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
      </div>
    </>
  );
}
