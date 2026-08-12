"use client";

import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { site } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

export default function FeaturedProject() {
  const project = site.featuredProject;

  return (
    <div className="card-surface overflow-hidden border-accent/20">
      <div className="border-b border-white/5 bg-accent/5 px-5 py-3 md:px-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{project.badge}</Badge>
          <span className="font-mono text-xs text-text-muted">
            Proof of build
          </span>
        </div>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-6">
        <div>
          <h2 className="text-xl font-semibold md:text-2xl">{project.title}</h2>
          <p className="mt-2 text-text-muted">{project.headline}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            {project.outcome}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:flex-col md:items-stretch">
          <Button href={project.live} external>
            Live demo ↗
          </Button>
          <Button href={project.caseStudyPath} variant="secondary">
            Overview →
          </Button>
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
          <Link
            href={`${project.caseStudyPath}#technical`}
            className="text-center text-sm text-accent hover:text-accent-hover md:pt-1"
          >
            Engineering deep dive ↓
          </Link>
        </div>
      </div>
    </div>
  );
}
