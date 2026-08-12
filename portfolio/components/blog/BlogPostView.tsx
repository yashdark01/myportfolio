import Link from "next/link";
import Tag from "@/components/ui/Tag";
import { BlogPost } from "@/data/blog";

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
          {post.date} · {post.readTime}
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

      <footer className="mt-16 border-t border-white/5 pt-8">
        <Link href="/#contact" className="text-sm text-accent hover:text-accent-hover">
          Get in touch →
        </Link>
      </footer>
    </article>
  );
}
