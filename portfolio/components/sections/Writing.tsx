"use client";

import { m } from "framer-motion";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import StackTags from "@/components/ui/StackTags";
import { blogPosts, getReadTime } from "@/data/blog";

export default function Writing() {
  return (
    <SectionWrapper id="writing" label="Writing" title="Technical Writing">
      <p className="-mt-8 mb-8 max-w-2xl text-sm leading-relaxed text-text-muted">
        Long-form notes on applied AI and enterprise frontend work — companion
        pieces to the case studies above.
      </p>

      <div className="space-y-4">
        {blogPosts.map((post, index) => (
          <m.article
            key={post.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group card-surface block p-6 transition-colors md:p-8"
            >
              <p className="section-label">
                {post.date} · {getReadTime(post.sections, post.excerpt)}
              </p>
              <h3 className="mt-2 text-xl font-semibold group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {post.excerpt}
              </p>
              <StackTags items={post.tags} className="mt-4" />
              <p className="mt-4 text-sm text-accent">Read article →</p>
            </Link>
          </m.article>
        ))}
      </div>

      <p className="mt-8 text-center">
        <Link href="/blog" className="text-sm text-text-muted hover:text-accent">
          View all posts →
        </Link>
      </p>
    </SectionWrapper>
  );
}
