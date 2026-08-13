import Link from "next/link";
import StackTags from "@/components/ui/StackTags";
import { blogPosts, getReadTime } from "@/data/blog";

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-28">
      <Link
        href="/#writing"
        className="section-label inline-flex transition-colors hover:text-accent"
      >
        ← Back to home
      </Link>

      <h1 className="mt-8 text-4xl font-semibold tracking-tight md:text-5xl">
        Writing
      </h1>
      <p className="mt-4 text-text-muted">
        Long-form technical notes — companion pieces to the case studies on this
        site.
      </p>

      <div className="mt-12 space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group card-surface block p-6 md:p-8"
          >
            <p className="section-label">
              {post.date} · {getReadTime(post.sections, post.excerpt)}
            </p>
            <h2 className="mt-2 text-2xl font-semibold group-hover:text-accent">
              {post.title}
            </h2>
            <p className="mt-2 text-text-muted">{post.excerpt}</p>
            <StackTags items={post.tags} className="mt-4" />
          </Link>
        ))}
      </div>
    </div>
  );
}
