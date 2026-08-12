"use client";

import { useEffect, useState } from "react";
import { githubProfile } from "@/data/github";
import { trackEvent } from "@/lib/analytics";

interface RepoActivity {
  name: string;
  pushedAt: string;
  stars: number;
  url: string;
}

interface GitHubActivityResponse {
  repos: RepoActivity[];
  mostRecent: RepoActivity | null;
}

function formatRelativeDate(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 14) return `${days} days ago`;
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`;
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubActivityResponse | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  return (
    <div className="card-surface mb-8 p-5 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="section-label mb-2">Recent activity</p>
          {data?.mostRecent ? (
            <p className="text-sm leading-relaxed text-text-muted">
              Last push to{" "}
              <span className="font-mono text-text-primary">
                {data.mostRecent.name}
              </span>{" "}
              — {formatRelativeDate(data.mostRecent.pushedAt)}
            </p>
          ) : (
            <p className="text-sm text-text-muted">
              Active on GitHub — Krashaq-Ai, open-source repos, and portfolio
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {githubProfile.highlights.map((item) => (
              <span key={item.label} className="text-xs text-text-muted">
                <span className="text-text-primary">{item.value}</span>
                {" · "}
                {item.label}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={githubProfile.contributionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("social_link_click", {
                platform: "github_contributions",
              })
            }
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-text-primary transition-colors hover:border-white/20 hover:text-accent"
          >
            Contribution graph ↗
          </a>
          <a
            href={githubProfile.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("social_link_click", { platform: "github_profile" })
            }
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-text-primary transition-colors hover:border-white/20 hover:text-accent"
          >
            @{githubProfile.username} ↗
          </a>
        </div>
      </div>

      {data && data.repos.length > 0 && (
        <div className="mt-5 grid gap-2 border-t border-white/5 pt-5 sm:grid-cols-2">
          {data.repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-text-muted transition-colors hover:bg-white/5 hover:text-accent"
            >
              <span className="font-mono">{repo.name}</span>
              <span>{formatRelativeDate(repo.pushedAt)}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
