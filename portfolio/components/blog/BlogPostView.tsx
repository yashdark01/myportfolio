import Link from "next/link";
import StackTags from "@/components/ui/StackTags";
import { BlogPost } from "@/data/blog";
import { getReadTime } from "@/lib/blog";
import EditorialPage from "@/components/motion/EditorialPage";

export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <EditorialPage label="Technical writing">
      <article className="blog-post-page site-shell py-24 sm:py-28">
        <div className="max-w-3xl">
        <div data-page-intro>
          <Link
            href="/blog"
            className="section-label editorial-back-link inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <span aria-hidden>←</span> Back to writing
          </Link>

          <header className="mt-8">
            <p className="section-label">
              Published {post.date}
              {post.updated ? ` · Updated ${post.updated}` : ""}
              {` · ${getReadTime(post.sections, post.excerpt)}`}
            </p>
            <h1 className="editorial-page-title mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-text-muted">{post.excerpt}</p>
            <StackTags items={post.tags} className="mt-6" />
          </header>
        </div>

      <div className="mt-12 space-y-10">
        {post.sections.map((section) => (
          <section key={section.title} className="blog-article-section" data-reveal>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              {section.content}
            </p>
            {section.code?.map((block, index) => (
              <figure key={`${section.title}-code-${index}`} className="editorial-code-wrap mt-5">
                <figcaption className="section-label mb-2">
                  {block.language}
                </figcaption>
                <pre className="editorial-code-block overflow-x-auto rounded-lg border border-white/5 bg-surface p-4 font-mono text-xs leading-relaxed text-text-muted">
                  <code>{block.code}</code>
                </pre>
              </figure>
            ))}
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
      </div>

      {post.slug === "building-krashaq-llm-pipeline" && (
        <div className="related-card mt-12 card-surface p-6" data-reveal>
          <p className="section-label mb-3">Related</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/work/krashaq" className="text-accent hover:text-accent-hover">
              Krashaq case study →
            </Link>
            <Link
              href="/blog/b2b2c-subscription-gating-nextjs"
              className="text-accent hover:text-accent-hover"
            >
              B2B2C gating post →
            </Link>
            <a
              href="https://krashaq-agritech.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              Live demo ↗
            </a>
          </div>
        </div>
      )}

      {post.slug === "b2b2c-subscription-gating-nextjs" && (
        <div className="related-card mt-12 card-surface p-6" data-reveal>
          <p className="section-label mb-3">Related</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/blog/building-krashaq-llm-pipeline"
              className="text-accent hover:text-accent-hover"
            >
              Krashaq architecture evolution →
            </Link>
            <Link href="/work/krashaq" className="text-accent hover:text-accent-hover">
              Case study →
            </Link>
          </div>
        </div>
      )}

      <footer className="mt-16 border-t border-white/5 pt-8" data-reveal>
        <Link href="/#contact" className="text-sm text-accent hover:text-accent-hover">
          Get in touch →
        </Link>
      </footer>
        </div>
      </article>
    </EditorialPage>
  );
}
