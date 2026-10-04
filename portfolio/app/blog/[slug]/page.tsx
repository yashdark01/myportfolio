import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostView from "@/components/blog/BlogPostView";
import StructuredData from "@/components/StructuredData";
import { getAllBlogSlugs, getBlogPost } from "@/data/blog";
import { site } from "@/data/site";
import { getProfileImageUrl, getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: pageUrl,
    image: getProfileImageUrl(),
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: siteUrl,
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <BlogPostView post={post} />
    </>
  );
}
