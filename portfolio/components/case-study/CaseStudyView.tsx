import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProjectMediaGallery from "@/components/case-study/ProjectMediaGallery";
import SectionLink from "@/components/ui/SectionLink";
import StackTags from "@/components/ui/StackTags";
import { getDefaultMediaDomain, getPreviewMedia } from "@/data/preview-media";
import { CaseStudy } from "@/data/case-studies";
import DiagramRenderer from "@/components/case-study/DiagramRenderer";
import EditorialPage from "@/components/motion/EditorialPage";

interface CaseStudyViewProps {
  study: CaseStudy;
}

function SectionBlock({
  section,
}: {
  section: { title: string; content: string; bullets?: string[]; diagram?: string };
}) {
  return (
    <section className="case-study-section" data-reveal>
      <h3 className="text-lg font-semibold">{section.title}</h3>
      <p className="mt-3 leading-relaxed text-text-muted">{section.content}</p>
      {section.diagram && <DiagramRenderer diagram={section.diagram} />}
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
    <div className="case-study-list" data-reveal>
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
    <EditorialPage label={`Case study · ${study.title}`}>
      <article className="case-study-page site-shell py-24 sm:py-28">
        <div className="max-w-5xl">
        <div data-page-intro>
          <SectionLink
            sectionId="work"
            className="section-label editorial-back-link inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span> Back to work
          </SectionLink>

          <header className="mt-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {study.builtAt && <Badge variant="accent">Built at {study.builtAt}</Badge>}
          <Badge variant="muted">{study.timeline}</Badge>
        </div>

        <h1 className="editorial-page-title text-5xl font-semibold tracking-tight md:text-7xl">
          {study.title}
        </h1>
        <p className="mt-3 text-lg text-text-muted">{study.caseStudyTitle}</p>
        <p className="mt-2 text-text-muted">{study.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2" data-reveal-group>
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
              {study.id === "horizon17-esg" || study.id === "ecolynk"
                ? "View platform ↗"
                : "Live demo ↗"}
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
        </div>

      {/* ── Overview (product / narrative) ── */}
      <div className="mt-16 space-y-12">
        <div className="editorial-section-rule border-b border-white/10 pb-4" data-reveal>
          <h2 className="section-label">Overview</h2>
          <p className="mt-1 text-sm text-text-muted">
            Product context, problem, and outcomes.
          </p>
        </div>

        <ProjectMediaGallery
          items={getPreviewMedia(study.id)}
          defaultDomain={getDefaultMediaDomain(study.id)}
          intro={
            study.id === "horizon17-esg" ? (
              <>
                Live website captures from{" "}
                <a
                  href="https://ecomsww.com/ecometer-the-carbon-economy-for-advertising"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover"
                >
                  ecomsww.com
                </a>
                — platform page, Visualise, and published client
                campaigns. Internal engineering UI stays in the abstract deep
                dive below.
              </>
            ) : study.id === "ecolynk" ? (
              <>
                Official public artwork from{" "}
                <a
                  href="https://ecomsww.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover"
                >
                  ecomsww.com
                </a>
                . This portfolio uses the official Ecolynk product name; product
                UI and proprietary engineering details remain abstract.
              </>
            ) : study.id === "popscan" ? (
              <>
                Product interface, campaign material, customer identity, and
                operational data are intentionally omitted under NDA. The
                architecture and narrative below are public-safe abstractions of
                responsibilities and engineering decisions.
              </>
            ) : study.id === "rent-buddy" ? (
              <>
                Live captures from{" "}
                <a
                  href="https://rentbuddy.in/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover"
                >
                  rentbuddy.in
                </a>
                — home, product catalog, and JWT-secured login.
              </>
            ) : undefined
          }
        />

        <div className="space-y-12">
          {study.sections.map((section) => (
            <SectionBlock key={section.title} section={section} />
          ))}
        </div>

        {(study.challenges.length > 0 || study.learnings.length > 0) && (
          <div className="grid gap-8 md:grid-cols-2" data-reveal-group>
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
        <div id="technical" className="mt-24 scroll-mt-28 space-y-12">
          <div className="editorial-section-rule border-b border-white/10 pb-4" data-reveal>
            <h2 className="section-label text-accent">Engineering</h2>
            <p className="mt-1 text-sm text-text-muted">
              Architecture, implementation details, and engineering decisions.
            </p>
          </div>

          <div className="space-y-12">
            {study.technicalSections!.map((section) => (
              <SectionBlock key={section.title} section={section} />
            ))}
          </div>

          <section className="case-study-section" data-reveal>
            <h3 className="text-lg font-semibold">Architecture</h3>
            <DiagramRenderer diagram={study.architecture} />
          </section>

          <section className="case-study-section" data-reveal>
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
            <div className="grid gap-8 md:grid-cols-2" data-reveal-group>
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

          <section className="case-study-section" data-reveal>
            <h3 className="section-label mb-3">Stack</h3>
            <StackTags items={study.stack} />
          </section>
        </div>
      )}

      <footer className="mt-20 border-t border-white/5 pt-8" data-reveal>
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
        </div>
      </article>
    </EditorialPage>
  );
}
