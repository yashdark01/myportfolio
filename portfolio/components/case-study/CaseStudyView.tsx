import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProjectPreviewGallery from "@/components/case-study/ProjectPreviewGallery";
import SectionLink from "@/components/ui/SectionLink";
import Tag from "@/components/ui/Tag";
import { CaseStudy } from "@/data/case-studies";

interface CaseStudyViewProps {
  study: CaseStudy;
}

function SectionBlock({
  section,
}: {
  section: { title: string; content: string; bullets?: string[] };
}) {
  return (
    <section>
      <h3 className="text-lg font-semibold">{section.title}</h3>
      <p className="mt-3 leading-relaxed text-text-muted">{section.content}</p>
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
  );
}

function BulletList({ items, heading }: { items: string[]; heading: string }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{heading}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-text-muted">
            · {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CaseStudyView({ study }: CaseStudyViewProps) {
  const hasTechnical =
    study.showTechnicalDetails &&
    study.technicalSections &&
    study.technicalSections.length > 0;

  return (
    <article className="mx-auto max-w-3xl px-6 py-28">
      <SectionLink
        sectionId="work"
        className="section-label inline-flex items-center gap-2 transition-colors hover:text-accent"
      >
        ← Back to work
      </SectionLink>

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
              {study.id === "horizon17-esg" ? "View platform ↗" : "Live demo ↗"}
            </Button>
          )}
          {study.github && (
            <Button href={study.github} variant="secondary" external>
              GitHub ↗
            </Button>
          )}
          {hasTechnical && (
            <Button href="#technical" variant="secondary">
              Engineering ↓
            </Button>
          )}
        </div>
      </header>

      {/* ── Overview (product / narrative) ── */}
      <div className="mt-12 space-y-10">
        <div className="border-b border-white/10 pb-4">
          <h2 className="section-label">Overview</h2>
          <p className="mt-1 text-sm text-text-muted">
            Product context, problem, and outcomes.
          </p>
        </div>

        {(study.previewImages?.length || study.previewVideo) && (
          <ProjectPreviewGallery
            images={study.previewImages}
            video={study.previewVideo}
            defaultDomain={
              study.id === "horizon17-esg"
                ? "ecomsww.com"
                : study.id === "rent-buddy"
                  ? "rentbuddy.in"
                  : "krashaq-agritech.vercel.app"
            }
          />
        )}

        <div className="space-y-10">
          {study.sections.map((section) => (
            <SectionBlock key={section.title} section={section} />
          ))}
        </div>

        {(study.challenges.length > 0 || study.learnings.length > 0) && (
          <div className="grid gap-8 md:grid-cols-2">
            {study.challenges.length > 0 && (
              <BulletList items={study.challenges} heading="Challenges" />
            )}
            {study.learnings.length > 0 && (
              <BulletList items={study.learnings} heading="What I learned" />
            )}
          </div>
        )}
      </div>

      {/* ── Engineering (personal / open-source projects) ── */}
      {hasTechnical && (
        <div id="technical" className="mt-20 scroll-mt-28 space-y-10">
          <div className="border-b border-white/10 pb-4">
            <h2 className="section-label text-accent">Engineering</h2>
            <p className="mt-1 text-sm text-text-muted">
              Architecture, implementation details, and engineering decisions.
            </p>
          </div>

          <div className="space-y-10">
            {study.technicalSections!.map((section) => (
              <SectionBlock key={section.title} section={section} />
            ))}
          </div>

          <section>
            <h3 className="text-lg font-semibold">Architecture</h3>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-white/5 bg-surface p-5 font-mono text-xs leading-relaxed text-text-muted">
              {study.architecture}
            </pre>
          </section>

          <section>
            <h3 className="text-lg font-semibold">Trade-offs</h3>
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

          {(study.technicalChallenges?.length ||
            study.technicalLearnings?.length) && (
            <div className="grid gap-8 md:grid-cols-2">
              {study.technicalChallenges &&
                study.technicalChallenges.length > 0 && (
                  <BulletList
                    items={study.technicalChallenges}
                    heading="Technical challenges"
                  />
                )}
              {study.technicalLearnings &&
                study.technicalLearnings.length > 0 && (
                  <BulletList
                    items={study.technicalLearnings}
                    heading="Technical learnings"
                  />
                )}
            </div>
          )}

          <section>
            <h3 className="section-label mb-3">Stack</h3>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </section>
        </div>
      )}

      <footer className="mt-16 border-t border-white/5 pt-8">
        <p className="text-sm text-text-muted">
          {hasTechnical ? (
            <>
              <Link href="#technical" className="text-accent hover:text-accent-hover">
                Engineering ↑
              </Link>
              {" · "}
            </>
          ) : null}
          Interested in how I built this?{" "}
          <SectionLink sectionId="contact" className="text-accent hover:text-accent-hover">
            Get in touch
          </SectionLink>
          {" · "}
          <SectionLink sectionId="work" className="text-accent hover:text-accent-hover">
            View all projects
          </SectionLink>
        </p>
      </footer>
    </article>
  );
}
