import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPublished, getSinglePostBySlug, extractFaq } from "lib/content";
import PostDetail from "components/posts/details";
import JsonLd from "components/json-ld";

export function generateStaticParams() {
  return getAllPublished()
    .filter((post) => post.category === "Blog")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = getSinglePostBySlug(slug);
  if (!post) return;

  const { title, description, cover, keywords } = post.metadata;
  const ogImage = cover || `https://byshennan.com/api/og?title=${title}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: `https://byshennan.com/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.metadata.publishedAt,
      url: `https://byshennan.com/blog/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params }) {
  const { slug } = await params;
  const post = getSinglePostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: post.metadata.publishedAt,
    author: {
      "@type": "Person",
      name: post.metadata.author || "Shen Nan Wong",
      url: "https://byshennan.com",
    },
    url: `https://byshennan.com/blog/${slug}`,
  };

  const faqPairs = extractFaq(post.markdown);
  const faqSchema = faqPairs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqPairs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      }
    : null;

  return (
    <section>
      <JsonLd data={blogPostingSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <PostDetail post={post} slug={slug} />
    </section>
  );
}
