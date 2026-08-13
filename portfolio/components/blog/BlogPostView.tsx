import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { BlogPost } from "@/data/blog";
import { getReadTime } from "@/lib/blog";

export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-28">
      <Link
        href="/blog"
        className="section-label inline-flex items-center gap-2 transition-colors hover:text-accent"
      >
        ← Back to writing
      </Link>

      <header className="mt-8">
        <p className="section-label">
          {post.date} · {getReadTime(post.sections, post.excerpt)}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-text-muted">{post.excerpt}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>

      <div className="mt-12 space-y-10">
        {post.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-text-muted">
              {section.content}
            </p>
            {section.code?.map((block, index) => (
              <figure key={`${section.title}-code-${index}`} className="mt-4">
                <figcaption className="section-label mb-2">
                  {block.language}
                </figcaption>
                <pre className="overflow-x-auto rounded-lg border border-white/5 bg-surface p-4 font-mono text-xs leading-relaxed text-text-muted">
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
        <div className="mt-12 card-surface p-6">
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
        <div className="mt-12 card-surface p-6">
          <p className="section-label mb-3">Related</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/blog/building-krashaq-llm-pipeline"
              className="text-accent hover:text-accent-hover"
            >
              Krashaq LLM pipeline →
            </Link>
            <Link href="/work/krashaq" className="text-accent hover:text-accent-hover">
              Case study →
            </Link>
          </div>
        </div>
      )}

      <footer className="mt-16 border-t border-white/5 pt-8">
        <Link href="/#contact" className="text-sm text-accent hover:text-accent-hover">
          Get in touch →
        </Link>
      </footer>
    </article>
  );
}
