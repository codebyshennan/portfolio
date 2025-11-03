import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPublished, getSingleBlogPostBySlug } from "lib/notion";
import PostDetail from "components/posts/details";

export async function generateStaticParams() {
  const posts = await getAllPublished();
  return posts
    .filter((post) => post.category === "Blog")
    .map((post) => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = await getSingleBlogPostBySlug(slug);
  if (!post) {
    return;
  }

  const {
    metadata: { title, description, cover },
  } = post;
  const ogImage = cover
    ? cover
    : `https://byshennan.com/api/og?title=${title}`;

  // Get published date from metadata (ISO format)
  const publishedTime = post.metadata.publishedAt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `https://byshennan.com/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const revalidate = 3600; // revalidate every hour

export default async function Blog({ params }) {
  const { slug } = await params;
  const post = await getSingleBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // const tweets = await getTweets(post.tweetIds);

  return (
    <section>
      <PostDetail post={post} slug={slug} />
    </section>
  );
}
