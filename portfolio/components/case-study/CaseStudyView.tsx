import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { CaseStudy } from "@/data/case-studies";

interface CaseStudyViewProps {
  study: CaseStudy;
}

export default function CaseStudyView({ study }: CaseStudyViewProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-28">
      <Link
        href="/#work"
        className="section-label inline-flex items-center gap-2 transition-colors hover:text-accent"
      >
        ← Back to work
      </Link>

      <header className="mt-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {study.builtAt && <Badge variant="accent">Built at {study.builtAt}</Badge>}
          <Badge variant="muted">{study.timeline}</Badge>
        </div>

        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
          {study.title}
        </h1>
        <p className="mt-3 text-lg text-text-muted">{study.caseStudyTitle}</p>
        <p className="mt-2 text-text-muted">{study.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {study.metrics.map((metric) => (
            <Badge key={metric.label} variant="accent">
              <span className="font-semibold">{metric.value}</span>
              <span className="ml-1 opacity-80">{metric.label}</span>
            </Badge>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          {study.live && (
            <Button href={study.live} external>
              Live demo ↗
            </Button>
          )}
          {study.github && (
            <Button href={study.github} variant="secondary" external>
              GitHub ↗
            </Button>
          )}
          {study.githubSecondary && (
            <Button href={study.githubSecondary} variant="secondary" external>
              Backend repo ↗
            </Button>
          )}
        </div>
      </header>

      <div className="mt-12 space-y-12">
        {study.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              {section.content}
            </p>
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2 text-sm leading-relaxed text-text-muted"
                  >
                    <span className="text-accent">→</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section>
          <h2 className="text-xl font-semibold">Architecture</h2>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/5 bg-surface p-5 font-mono text-xs leading-relaxed text-text-muted">
            {study.architecture}
          </pre>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Trade-offs</h2>
          <ul className="mt-4 space-y-2">
            {study.tradeoffs.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-text-muted"
              >
                <span className="text-accent">→</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold">Challenges</h2>
            <ul className="mt-4 space-y-2">
              {study.challenges.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-text-muted"
                >
                  · {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">What I learned</h2>
            <ul className="mt-4 space-y-2">
              {study.learnings.map((item) => (
                <li
                  key={item}
                  className="text-sm leading-relaxed text-text-muted"
                >
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="section-label mb-3">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-16 border-t border-white/5 pt-8">
        <p className="text-sm text-text-muted">
          Interested in how I built this?{" "}
          <Link href="/#contact" className="text-accent hover:text-accent-hover">
            Get in touch
          </Link>
          {" · "}
          <Link href="/#work" className="text-accent hover:text-accent-hover">
            View all projects
          </Link>
        </p>
      </footer>
    </article>
  );
}
