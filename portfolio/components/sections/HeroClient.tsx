"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionLink from "@/components/ui/SectionLink";
import { usePersona } from "@/components/PersonaContext";
import { Persona, personas, site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { useGsap } from "@/lib/useGsap";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <div className="hero-scene-fallback" aria-hidden />,
});

const personaOptions = [
  { id: "product" as Persona, label: "Product systems" },
  { id: "ai" as Persona, label: "Applied AI" },
] as const;

export default function HeroClient() {
  const heroRef = useRef<HTMLElement>(null);
  const [showScene, setShowScene] = useState(false);
  const { persona, setPersona } = usePersona();
  const content = personas[persona];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setShowScene(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useGsap(
    heroRef,
    (gsap) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".hero-title", { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.08)
        .fromTo(".status-pill", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0)
        .fromTo(".hero-scene-stage", { scale: 0.84, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.25 }, 0.15);
      gsap.to(".hero-scene-stage", {
        yPercent: 18,
        scale: 0.91,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 0.7 },
      });
      gsap.to(".hero-grid-lines", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    },
  );

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-grid editorial-hero relative flex min-h-[100svh] items-center overflow-hidden pt-[calc(5rem+env(safe-area-inset-top))]"
    >
      <div className="hero-aurora absolute inset-0" aria-hidden />
      <div className="hero-grid-lines absolute inset-0" aria-hidden />

      <div className="site-shell relative pb-10 pt-14">
        <div className="hero-scene-stage pointer-events-none absolute -right-[8%] top-[12%] hidden h-[66%] w-[56%] opacity-90 md:block">
          {showScene && (
            <>
            <HeroScene persona={persona} />
            <div className="hero-viz-readout" aria-hidden>
              <span className="hero-viz-index">{persona === "product" ? "01" : "02"}</span>
              <span>
                {persona === "product" ? "Signal synthesis" : "Neural topology"}
                <small>{persona === "product" ? "7 odd harmonics · live phase" : "76 nodes · live inference"}</small>
              </span>
            </div>
            </>
          )}
        </div>

        <div className="relative z-10">
          <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.17em] text-text-muted sm:text-[11px]">
            <span className="status-pill">
              <span className="status-dot" aria-hidden />
              {site.status}
            </span>
            <span className="hidden h-px w-8 bg-white/15 sm:block" />
            <span>IIIT Nagpur · {site.yearsExperience}</span>
          </div>

          <p className="section-label mb-3 text-accent">Engineer / Architect / Builder</p>
          <h1 className="hero-title editorial-hero-title uppercase">
            <span className="hero-line block">I build digital</span>
            <span className="hero-line hero-line-outline block">systems that</span>
            <span className="hero-line block">think &amp; scale.</span>
          </h1>

          <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,34rem)_auto] sm:items-end sm:justify-between lg:mt-10">
            <div>
              <AnimatePresence mode="wait" initial={false}>
                <m.p key={persona} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="max-w-xl text-sm leading-relaxed text-text-muted sm:text-base">
                  {content.tagline}
                </m.p>
              </AnimatePresence>
              <div className="mt-5 inline-flex rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-xl" role="group" aria-label="Portfolio focus">
                {personaOptions.map((option) => (
                  <button key={option.id} type="button" aria-pressed={persona === option.id} onClick={() => setPersona(option.id)} className={`min-h-10 rounded-full px-4 py-2 text-xs font-medium transition-all ${persona === option.id ? "bg-white text-background" : "text-text-muted hover:text-text-primary"}`}>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-5">
              <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("resume_download", { source: "hero" })} className="text-sm text-text-muted underline decoration-white/20 underline-offset-8 hover:text-white hover:decoration-accent">Resume ↗</a>
              <SectionLink sectionId="work" className="hero-round-cta">
                <span>Explore work</span><span aria-hidden>↘</span>
              </SectionLink>
            </div>
          </div>
        </div>
      </div>

      <a href="#work" className="scroll-cue" aria-label="Scroll to selected work">
        <span>Scroll</span><span className="scroll-cue-line" aria-hidden />
      </a>
    </section>
  );
}
