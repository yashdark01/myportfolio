"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import Badge from "@/components/ui/Badge";
import MediaFrame from "@/components/ui/MediaFrame";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SpotlightCard from "@/components/ui/SpotlightCard";
import StackTags from "@/components/ui/StackTags";
import { getDefaultMediaDomain, getHeroPreviewMedia } from "@/data/preview-media";
import { moreProjects, projectCategories, projects, Project, ProjectCategory } from "@/data/projects";
import { usePersona } from "@/components/PersonaContext";
import { personas } from "@/data/site";
import { useGsap } from "@/lib/useGsap";
import { trackEvent } from "@/lib/analytics";

const categoryLabels: Record<ProjectCategory, string> = {
  fullstack: "Full Stack",
  ai: "AI / LLM",
  enterprise: "Enterprise",
};

function orderProjects(list: Project[], order: readonly string[]) {
  const rank = new Map(order.map((id, index) => [id, index]));
  return [...list].sort(
    (a, b) => (rank.get(a.id) ?? order.length) - (rank.get(b.id) ?? order.length),
  );
}

function ProjectStory({ project, index }: { project: Project; index: number }) {
  const articleRef = useRef<HTMLElement>(null);
  const previewMedia = getHeroPreviewMedia(project.id);

  useGsap(
    articleRef,
    (gsap) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(
        ".project-reveal",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: articleRef.current, start: "top 72%", once: true },
        },
      );
      gsap.fromTo(
        ".project-media-inner",
        { yPercent: -3, scale: 0.98 },
        {
          yPercent: 3,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: articleRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        },
      );
      gsap.fromTo(
        ".project-index-digit",
        {
          yPercent: index % 2 ? -115 : 115,
          rotation: index % 2 ? 9 : -9,
          scale: 0.72,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 1.15,
          stagger: 0.14,
          ease: "expo.out",
          scrollTrigger: {
            trigger: articleRef.current,
            start: "top 84%",
            once: true,
          },
        },
      );
      gsap.to(".project-index-bg", {
        yPercent: index % 2 ? 14 : -14,
        rotation: index % 2 ? 1.5 : -1.5,
        ease: "none",
        scrollTrigger: {
          trigger: articleRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    },
  );

  return (
    <article ref={articleRef} className="project-story relative grid gap-8 border-t border-white/10 py-16 lg:min-h-[88svh] lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-16 lg:py-20">
      <span
        className={`project-index-bg ${index % 2 ? "project-index-bg-right" : "project-index-bg-left"}`}
        aria-hidden
      >
        <span className="project-index-digit">0</span>
        <span className="project-index-digit">{index + 1}</span>
      </span>
      <div className={`project-media-wrap relative z-10 lg:sticky lg:top-24 lg:h-fit ${index % 2 ? "lg:order-2" : ""}`}>
        <div className="project-media-inner relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/30 p-2 shadow-2xl shadow-black/30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,.12),transparent_38%)]" />
          {previewMedia ? (
            <MediaFrame
              item={previewMedia}
              domain={getDefaultMediaDomain(project.id)}
              variant="hero"
              priority={index === 0}
              className="relative border-white/5 bg-transparent"
            />
          ) : (
            <div className="aspect-[16/10] rounded-xl bg-surface" />
          )}
          <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/75 backdrop-blur-md">
            0{index + 1} / Case study
          </div>
        </div>
      </div>

      <div className={`relative z-10 flex min-h-[30rem] flex-col justify-center ${index % 2 ? "lg:order-1 lg:pl-8" : ""}`}>
        <div className="project-reveal flex flex-wrap gap-2">
          <Badge variant="muted">{categoryLabels[project.category]}</Badge>
          {project.builtAt && <Badge variant="accent">Built at {project.builtAt}</Badge>}
        </div>
        <h3 className="project-reveal mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
          {project.title}
        </h3>
        <p className="project-reveal mt-3 text-lg leading-relaxed text-text-muted">
          {project.subtitle}
        </p>

        <div className="project-reveal mt-7 grid grid-cols-2 gap-2">
          {project.metrics.slice(0, 4).map((metric) => (
            <div key={metric.label} className="rounded-xl border border-white/8 bg-white/[.025] p-3">
              <p className="text-lg font-semibold text-accent">{metric.value}</p>
              <p className="mt-0.5 text-xs text-text-muted">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="project-reveal mt-7 space-y-5 border-l border-accent/30 pl-5">
          <div>
            <p className="section-label mb-1.5">Outcome</p>
            <p className="text-sm leading-relaxed text-text-primary">{project.outcome}</p>
          </div>
        </div>

        <div className="project-reveal mt-7">
          <StackTags items={project.stack.slice(0, 8)} />
        </div>

        <div className="project-reveal mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link href={`/work/${project.id}`} className="group inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent">
            Read full case study <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_link_click", { project: project.id, type: "live" })}
              className="text-sm text-accent hover:text-accent-hover"
            >
              Live product ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("project_link_click", { project: project.id, type: "github" })}
              className="text-sm text-accent hover:text-accent-hover"
            >
              Source ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectSummary({ project, index }: { project: Project; index: number }) {
  return (
    <SpotlightCard className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-center" delay={index * 0.05}>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="muted">{categoryLabels[project.category]}</Badge>
          {project.builtAt && <Badge variant="accent">Built at {project.builtAt}</Badge>}
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">{project.subtitle}</p>
        <StackTags items={project.stack.slice(0, 6)} className="mt-4" />
      </div>
      <div className="flex flex-col items-start gap-4 md:items-end">
        <div className="flex gap-5">
          {project.metrics.slice(0, 2).map((metric) => (
            <div key={metric.label} className="md:text-right">
              <p className="font-semibold text-accent">{metric.value}</p>
              <p className="text-xs text-text-muted">{metric.label}</p>
            </div>
          ))}
        </div>
        <Link href={`/work/${project.id}`} className="group inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-accent">
          Read case study <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </SpotlightCard>
  );
}

export default function Work() {
  const { persona } = usePersona();
  const [filter, setFilter] = useState<string>("all");
  const ordered = useMemo(
    () => orderProjects(projects, personas[persona].projectOrder),
    [persona],
  );
  const filtered = filter === "all" ? ordered : ordered.filter((project) => project.category === filter);
  const featuredProjects = filter === "all" ? filtered.slice(0, 2) : filtered;
  const additionalProjects = filter === "all" ? filtered.slice(2) : [];

  return (
    <SectionWrapper id="work" label="01 / Selected work" title="Systems with proof, not promises." className="overflow-clip">
      <div className="-mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
          {personas[persona].workIntro} Scroll through the decisions, outcomes and production evidence behind each build.
        </p>
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1 scrollbar-hide" role="group" aria-label="Filter projects">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={filter === category.id}
              onClick={() => setFilter(category.id)}
              className={`min-h-10 shrink-0 rounded-full px-4 py-2 text-xs transition-all ${
                filter === category.id
                  ? "bg-white text-background"
                  : "border border-white/10 text-text-muted hover:border-accent/30 hover:text-text-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12">
        {featuredProjects.map((project, index) => (
          <ProjectStory key={project.id} project={project} index={index} />
        ))}
      </div>

      {additionalProjects.length > 0 && (
        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="mb-7 max-w-2xl">
            <p className="section-label mb-2">More selected work</p>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">More production work, at a glance.</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">The strongest two stories stay immersive; these projects remain one click away without making the homepage harder to scan.</p>
          </div>
          <div className="grid gap-3">
            {additionalProjects.map((project, index) => (
              <ProjectSummary key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 border-t border-white/10 pt-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="section-label mb-2">Lab / Additional builds</p>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">More experiments in motion.</h3>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {moreProjects.map((project, index) => (
            <SpotlightCard key={project.id} className="flex min-h-[15rem] flex-col p-5" delay={index * 0.04}>
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-medium">{project.title}</h4>
                <span className="font-mono text-[10px] text-accent">0{index + 1}</span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{project.description}</p>
              <StackTags items={project.tags.slice(0, 4)} className="mt-5 gap-1.5" />
              <div className="mt-5 flex gap-4 border-t border-white/5 pt-4 text-xs text-accent">
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">Source ↗</a>}
                {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live ↗</a>}
                {project.caseStudyPath && <Link href={project.caseStudyPath}>Overview →</Link>}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
