"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Tag from "@/components/ui/Tag";
import {
  moreProjects,
  projectCategories,
  projects,
  ProjectCategory,
} from "@/data/projects";
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

  const toggleExpanded = () => {
    const next = !expanded;
    if (next) {
      trackEvent("project_expand", { project: project.id });
    }
    setExpanded(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-surface overflow-hidden"
    >
      <button
        type="button"
        onClick={toggleExpanded}
        className="w-full p-6 text-left md:p-8"
        aria-expanded={expanded}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="muted">{categoryLabels[project.category]}</Badge>
              {project.builtAt && (
                <Badge variant="accent">Built at {project.builtAt}</Badge>
              )}
            </div>
            <h3 className="text-xl font-semibold md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-text-muted">{project.subtitle}</p>
          </div>
          <span className="font-mono text-xs text-text-muted">
            {expanded ? "collapse ↑" : "click to expand ↓"}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.metrics.map((metric) => (
            <Badge key={metric.label} variant="accent">
              <span className="font-semibold">{metric.value}</span>
              <span className="ml-1 opacity-80">{metric.label}</span>
            </Badge>
          ))}
        </div>

        {(project.live || project.github) && (
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href={`/work/${project.id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium text-text-primary hover:text-accent"
            >
              Overview →
            </Link>
            {project.github && project.id === "krashaq" && (
              <Link
                href={`/work/${project.id}#technical`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-accent hover:text-accent-hover"
              >
                Engineering ↓
              </Link>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("project_link_click", {
                    project: project.id,
                    type: "live",
                  });
                }}
                className="text-sm text-accent hover:text-accent-hover"
              >
                Live demo ↗
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  trackEvent("project_link_click", {
                    project: project.id,
                    type: "github",
                  });
                }}
                className="text-sm text-accent hover:text-accent-hover"
              >
                GitHub ↗
              </a>
            )}
          </div>
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 border-t border-white/5 px-6 pb-6 pt-4 md:px-8 md:pb-8">
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
                <pre className="overflow-x-auto rounded-lg border border-white/5 bg-background p-4 font-mono text-xs leading-relaxed text-text-muted">
                  {project.architecture}
                </pre>
              </div>
              {project.stack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={`/work/${project.id}`}
                  className="text-sm font-medium text-text-primary hover:text-accent"
                >
                  Full overview →
                </Link>
                {project.github && project.id === "krashaq" && (
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <SectionWrapper id="work" label="Work" title="Selected Projects">
      <p className="-mt-8 mb-8 max-w-2xl text-sm leading-relaxed text-text-muted">
        Three flagship projects — enterprise product work, applied AI with live
        demo, and production internship delivery. Supporting projects are
        listed below.
      </p>
      <div className="mb-8 flex flex-wrap gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setFilter(cat.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition-all duration-200 ${
              filter === cat.id
                ? "bg-accent text-background"
                : "border border-white/10 text-text-muted hover:border-white/20 hover:text-text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="mt-16">
        <h3 className="section-label mb-6">More Projects</h3>
        <div className="space-y-3">
          {moreProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="card-surface flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:p-5"
            >
              <div>
                <h4 className="font-medium">{project.title}</h4>
                <p className="mt-1 text-sm text-text-muted">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
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
                    className="ml-2 text-xs text-accent hover:text-accent-hover"
                  >
                    GitHub ↗
                  </a>
                )}
                {project.caseStudyPath && (
                  <Link
                    href={project.caseStudyPath}
                    className="text-xs text-accent hover:text-accent-hover"
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
                    className="text-xs text-accent hover:text-accent-hover"
                  >
                    Live ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
