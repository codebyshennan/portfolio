import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPublished, getSinglePostBySlug } from "lib/content";
import PostDetail from "components/posts/details";

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

  const { title, description, cover } = post.metadata;
  const ogImage = cover || `https://byshennan.com/api/og?title=${title}`;

  return {
    title,
    description,
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

  return (
    <section>
      <PostDetail post={post} slug={slug} />
    </section>
  );
}
