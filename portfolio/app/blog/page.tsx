import Link from "next/link";
import StackTags from "@/components/ui/StackTags";
import { blogPosts, getReadTime } from "@/data/blog";
import EditorialPage from "@/components/motion/EditorialPage";

export default function BlogIndexPage() {
  return (
    <EditorialPage label="Writing index">
      <div className="blog-index-page site-shell py-24 sm:py-28">
        <div className="max-w-5xl">
        <div data-page-intro>
          <Link
            href="/#writing"
            className="section-label editorial-back-link inline-flex transition-colors hover:text-accent"
          >
            ← Back to home
          </Link>

          <h1 className="editorial-page-title mt-8 text-5xl font-semibold tracking-tight md:text-7xl">
            Technical<br /><span className="text-outline">writing.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
            Long-form engineering notes on production AI, system architecture,
            and the decisions behind the work.
          </p>
        </div>

        <div className="blog-index-list mt-16" data-reveal-group>
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-index-card group block border-t border-white/10 py-8 md:grid md:grid-cols-[3rem_1fr_auto] md:items-start md:gap-6 md:py-10"
            >
              <span className="font-mono text-xs text-accent">0{index + 1}</span>
              <span>
                <span className="section-label block">
                  {post.updated ? `Updated ${post.updated}` : post.date} · {getReadTime(post.sections, post.excerpt)}
                </span>
                <span className="mt-2 block text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                  {post.title}
                </span>
                <span className="mt-3 block max-w-2xl leading-relaxed text-text-muted">{post.excerpt}</span>
                <StackTags items={post.tags} className="mt-5" />
              </span>
              <span className="blog-index-arrow mt-4 inline-grid h-11 w-11 place-items-center rounded-full border border-white/15 text-lg md:mt-0" aria-hidden>↗</span>
            </Link>
          ))}
          <div className="border-t border-white/10" />
        </div>
        </div>
      </div>
    </EditorialPage>
  );
}
