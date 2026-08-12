"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Tag from "@/components/ui/Tag";
import { blogPosts } from "@/data/blog";

export default function Writing() {
  return (
    <SectionWrapper id="writing" label="Writing" title="Building in Public">
      <p className="-mt-8 mb-8 max-w-2xl text-sm leading-relaxed text-text-muted">
        Technical notes on shipping AI features and performance work — the kind
        of thinking I bring to product engineering interviews.
      </p>

      <div className="space-y-4">
        {blogPosts.map((post, index) => (
          <motion.article
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
                {post.date} · {post.readTime}
              </p>
              <h3 className="mt-2 text-xl font-semibold group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {post.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              <p className="mt-4 text-sm text-accent">Read article →</p>
            </Link>
          </motion.article>
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
