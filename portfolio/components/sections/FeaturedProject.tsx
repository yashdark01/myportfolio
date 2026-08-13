"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MediaFrame from "@/components/ui/MediaFrame";
import { usePersona } from "@/components/PersonaContext";
import { getDefaultMediaDomain, getHeroPreviewMedia } from "@/data/preview-media";
import { personas } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

export default function FeaturedProject() {
  const { persona } = usePersona();
  const project = personas[persona].featuredProject;
  const heroPreview = getHeroPreviewMedia(project.id);

  return (
    <div className="relative min-h-[44rem] sm:min-h-[42rem] md:min-h-[44rem]">
      <AnimatePresence mode="sync" initial={false}>
        <m.div
          key={project.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="card-surface absolute inset-0 overflow-hidden border-accent/20"
        >
          <div className="border-b border-white/5 bg-accent/5 px-5 py-3 md:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{project.badge}</Badge>
              <span className="font-mono text-xs text-text-muted">
                Proof of build
              </span>
            </div>
          </div>

          {heroPreview && (
            <div className="border-b border-white/5 bg-black/40 px-4 py-3 md:px-5 md:py-4">
              <MediaFrame
                item={heroPreview}
                domain={getDefaultMediaDomain(project.id)}
                variant="hero"
                priority={false}
                className="border-white/5 bg-transparent"
              />
            </div>
          )}

          <div className="grid gap-6 p-5 md:grid-cols-[1fr_auto] md:items-start md:p-6">
            <div className="min-h-0 md:min-h-[6.5rem]">
              <h2 className="text-xl font-semibold md:text-2xl">
                {project.title}
              </h2>
              <p className="mt-2 text-text-muted">{project.headline}</p>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">
                {project.outcome}
              </p>
            </div>
            <div className="flex flex-col gap-3 md:min-w-[10.5rem] md:flex-col md:items-stretch">
              {project.live && (
                <Button href={project.live} external>
                  Live demo ↗
                </Button>
              )}
              <Button href={project.caseStudyPath} variant="secondary">
                Overview →
              </Button>
              {project.github ? (
                <Button
                  href={project.github}
                  variant="secondary"
                  external
                  onClick={() =>
                    trackEvent("project_link_click", {
                      project: project.id,
                      type: "github",
                      source: "hero_featured",
                    })
                  }
                >
                  GitHub ↗
                </Button>
              ) : (
                <div className="hidden h-10 md:block" aria-hidden />
              )}
              {project.showTechnicalDeepDive && (
                <Link
                  href={`${project.caseStudyPath}#technical`}
                  className="text-center text-sm text-accent hover:text-accent-hover md:pt-1"
                >
                  Engineering deep dive ↓
                </Link>
              )}
            </div>
          </div>
        </m.div>
      </AnimatePresence>
    </div>
  );
}
