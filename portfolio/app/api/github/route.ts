import { NextResponse } from "next/server";
import { trackedRepos } from "@/data/github";

export const revalidate = 3600;

interface GitHubRepoResponse {
  name: string;
  pushed_at: string;
  stargazers_count: number;
  html_url: string;
}

export async function GET() {
  try {
    const repos = await Promise.all(
      trackedRepos.map(async (name) => {
        const res = await fetch(
          `https://api.github.com/repos/yashdark01/${name}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
              "User-Agent": "yash-portfolio",
            },
            next: { revalidate: 3600 },
          }
        );

        if (!res.ok) {
          return { name, error: true as const };
        }

        const data = (await res.json()) as GitHubRepoResponse;
        return {
          name: data.name,
          pushedAt: data.pushed_at,
          stars: data.stargazers_count,
          url: data.html_url,
        };
      })
    );

    const active = repos.filter(
      (r): r is Exclude<typeof r, { error: true }> => !("error" in r)
    );

    const mostRecent = active.sort(
      (a, b) =>
        new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime()
    )[0];

    return NextResponse.json({
      repos: active,
      mostRecent: mostRecent ?? null,
    });
  } catch {
    return NextResponse.json({ repos: [], mostRecent: null });
  }
}
