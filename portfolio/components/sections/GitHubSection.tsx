"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Tag from "@/components/ui/Tag";
import GitHubActivity from "@/components/sections/GitHubActivity";
import { githubProfile, pinnedRepos } from "@/data/github";
import { trackEvent } from "@/lib/analytics";

export default function GitHubSection() {
  return (
    <SectionWrapper id="github" label="Code" title="Open Source & GitHub">
      <p className="-mt-8 mb-8 max-w-2xl text-sm leading-relaxed text-text-muted">
        Production repos with live deployments where available. Recruiters
        typically check GitHub before scheduling — activity and CI status below.
      </p>

      <GitHubActivity />

      <div className="grid gap-4 md:grid-cols-2">
        {pinnedRepos.map((repo, index) => (
          <motion.article
            key={repo.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="card-surface flex flex-col p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-mono text-sm font-medium text-accent">
                    {repo.displayName ?? repo.name}
                  </h3>
                  {repo.status === "ongoing" && (
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-300">
                      Ongoing
                    </span>
                  )}
                </div>
                {repo.ciBadge && (
                  <Image
                    src={repo.ciBadge}
                    alt={`${repo.displayName ?? repo.name} CI status`}
                    width={88}
                    height={20}
                    unoptimized
                    className="mt-2 h-5 w-auto"
                  />
                )}
              </div>
              <span className="rounded-md bg-surface-elevated px-2 py-0.5 font-mono text-xs text-text-muted">
                {repo.language}
              </span>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
              {repo.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {repo.topics.map((topic) => (
                <Tag key={topic}>{topic}</Tag>
              ))}
            </div>

            <div className="mt-4 flex gap-4">
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("project_link_click", {
                    project: repo.displayName ?? repo.name,
                    type: "github",
                  })
                }
                className="text-sm text-accent hover:text-accent-hover"
              >
                View repo ↗
              </a>
              {repo.live && (
                <a
                  href={repo.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("project_link_click", {
                      project: repo.name,
                      type: "live",
                    })
                  }
                  className="text-sm text-accent hover:text-accent-hover"
                >
                  Live demo ↗
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <a
          href={githubProfile.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("social_link_click", { platform: "github_profile" })
          }
          className="text-sm text-text-muted hover:text-accent"
        >
          View all repositories on GitHub ↗
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
