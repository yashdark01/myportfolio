"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import MediaFrame from "@/components/ui/MediaFrame";
import SectionWrapper from "@/components/ui/SectionWrapper";
import StackTags from "@/components/ui/StackTags";
import {
  getDefaultMediaDomain,
  getHeroPreviewMedia,
} from "@/data/preview-media";
import {
  moreProjects,
  projectCategories,
  projects,
  Project,
  ProjectCategory,
} from "@/data/projects";
import { usePersona } from "@/components/PersonaContext";
import { personas } from "@/data/site";
import { trackEvent } from "@/lib/analytics";

const categoryLabels: Record<ProjectCategory, string> = {
  fullstack: "Full Stack",
  ai: "AI / LLM",
  enterprise: "Enterprise",
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const previewMedia = getHeroPreviewMedia(project.id);

  const toggleExpanded = () => {
    const next = !expanded;
    if (next) {
      trackEvent("project_expand", { project: project.id });
    }
    setExpanded(next);
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-surface overflow-hidden"
    >
      <div className="p-4 sm:p-6 md:p-8">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="muted">{categoryLabels[project.category]}</Badge>
            {project.builtAt && (
              <Badge variant="accent" className="max-w-full">
                <span className="truncate">Built at {project.builtAt}</span>
              </Badge>
            )}
          </div>
          <h3 className="text-lg font-semibold sm:text-xl md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-text-muted sm:text-base">
            {project.subtitle}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {project.metrics.map((metric) => (
            <Badge
              key={metric.label}
              variant="accent"
              className="min-w-0 flex-col items-start gap-0.5 px-2.5 py-2 sm:flex-row sm:items-center sm:gap-0 sm:px-3 sm:py-1"
            >
              <span className="font-semibold">{metric.value}</span>
              <span className="text-[10px] leading-tight opacity-80 sm:ml-1 sm:text-xs">
                {metric.label}
              </span>
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-white/5 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {(project.live || project.github) && (
              <>
                <Link
                  href={`/work/${project.id}`}
                  className="inline-flex min-h-10 items-center text-sm font-medium text-text-primary hover:text-accent"
                >
                  Overview →
                </Link>
                {["krashaq", "horizon17-esg"].includes(project.id) && (
                  <Link
                    href={`/work/${project.id}#technical`}
                    className="inline-flex min-h-10 items-center text-sm text-accent hover:text-accent-hover"
                  >
                    Engineering ↓
                  </Link>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("project_link_click", {
                        project: project.id,
                        type: "live",
                      })
                    }
                    className="inline-flex min-h-10 items-center text-sm text-accent hover:text-accent-hover"
                  >
                    Live demo ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("project_link_click", {
                        project: project.id,
                        type: "github",
                      })
                    }
                    className="inline-flex min-h-10 items-center text-sm text-accent hover:text-accent-hover"
                  >
                    GitHub ↗
                  </a>
                )}
              </>
            )}
          </div>
          <button
            type="button"
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-controls={`project-details-${project.id}`}
            className="flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-surface-elevated px-4 py-2.5 font-mono text-xs text-text-muted transition-colors hover:border-white/20 hover:text-text-primary sm:w-auto sm:min-w-[9.5rem]"
          >
            {expanded ? "Collapse ↑" : "Expand details ↓"}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <m.div
            id={`project-details-${project.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-white/5 px-4 pb-4 pt-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
              {previewMedia && (
                <MediaFrame
                  item={previewMedia}
                  domain={getDefaultMediaDomain(project.id)}
                  variant="hero"
                />
              )}
              <div>
                <p className="section-label mb-2">Problem</p>
                <p className="text-sm leading-relaxed text-text-muted">
                  {project.problem}
                </p>
              </div>
              <div>
                <p className="section-label mb-2">My role</p>
                <p className="text-sm leading-relaxed text-text-muted">
                  {project.role}
                </p>
              </div>
              <div>
                <p className="section-label mb-2">Outcome</p>
                <p className="text-sm leading-relaxed text-text-muted">
                  {project.outcome}
                </p>
              </div>
              <div>
                <p className="section-label mb-2">Trade-offs</p>
                <ul className="space-y-2">
                  {project.tradeoffs.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-text-muted"
                    >
                      <span className="text-accent">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="section-label mb-2">Architecture</p>
                <pre className="overflow-x-auto rounded-lg border border-white/5 bg-background p-3 font-mono text-[11px] leading-relaxed text-text-muted sm:p-4 sm:text-xs">
                  {project.architecture}
                </pre>
              </div>
              {project.stack.length > 0 && <StackTags items={project.stack} />}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={`/work/${project.id}`}
                  className="text-sm font-medium text-text-primary hover:text-accent"
                >
                  Full overview →
                </Link>
                {["krashaq", "horizon17-esg"].includes(project.id) && (
                  <Link
                    href={`/work/${project.id}#technical`}
                    className="text-sm text-accent hover:text-accent-hover"
                  >
                    Engineering ↓
                  </Link>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("project_link_click", {
                        project: project.id,
                        type: "github",
                      })
                    }
                    className="text-sm text-accent hover:text-accent-hover"
                  >
                    GitHub ↗
                  </a>
                )}
                {project.githubSecondary && (
                  <a
                    href={project.githubSecondary}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("project_link_click", {
                        project: project.id,
                        type: "github_backend",
                      })
                    }
                    className="text-sm text-accent hover:text-accent-hover"
                  >
                    Backend repo ↗
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent("project_link_click", {
                        project: project.id,
                        type: "live",
                      })
                    }
                    className="text-sm text-accent hover:text-accent-hover"
                  >
                    Live demo ↗
                  </a>
                )}
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}

function orderProjects(list: Project[], order: readonly string[]) {
  const rank = new Map(order.map((id, index) => [id, index]));
  return [...list].sort(
    (a, b) => (rank.get(a.id) ?? order.length) - (rank.get(b.id) ?? order.length),
  );
}

export default function Work() {
  const { persona } = usePersona();
  const [filter, setFilter] = useState<string>("all");

  const orderedProjects = orderProjects(projects, personas[persona].projectOrder);

  const filtered =
    filter === "all"
      ? orderedProjects
      : orderedProjects.filter((p) => p.category === filter);

  return (
    <SectionWrapper id="work" label="Work" title="Selected Projects">
      <p className="-mt-8 mb-6 max-w-2xl text-sm leading-relaxed text-text-muted sm:mb-8">
        {personas[persona].workIntro}
      </p>
      <div className="-mx-4 mb-6 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:mb-8 sm:overflow-visible sm:px-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-all duration-200 sm:py-1.5 ${
                filter === cat.id
                  ? "bg-accent text-background"
                  : "border border-white/10 text-text-muted hover:border-white/20 hover:text-text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-12 sm:mt-16">
        <h3 className="section-label mb-4 sm:mb-6">More Projects</h3>
        <div className="space-y-3">
          {moreProjects.map((project, index) => (
            <m.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="card-surface p-4 sm:p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-medium">{project.title}</h4>
                {project.previewComingSoon && (
                  <Badge variant="muted">Preview coming soon</Badge>
                )}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
                {project.description}
              </p>
              <div className="mt-3 border-t border-white/5 pt-3">
                <StackTags items={project.tags} className="gap-1.5" />
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("project_link_click", {
                          project: project.id,
                          type: "github",
                        })
                      }
                      className="inline-flex min-h-10 items-center text-xs text-accent hover:text-accent-hover sm:text-sm"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.caseStudyPath && (
                    <Link
                      href={project.caseStudyPath}
                      className="inline-flex min-h-10 items-center text-xs text-accent hover:text-accent-hover sm:text-sm"
                    >
                      Overview →
                    </Link>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent("project_link_click", {
                          project: project.id,
                          type: "live",
                        })
                      }
                      className="inline-flex min-h-10 items-center text-xs text-accent hover:text-accent-hover sm:text-sm"
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
