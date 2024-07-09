import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { getSingleBlogPostBySlug } from "lib/notion";
import PostDetail from "components/posts/details";

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://byshennan.com${image}`
    : `https://byshennan.com/api/og?title=${title}`;

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
  const post = await getSingleBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // const tweets = await getTweets(post.tweetIds);

  return (
    <section>
      <PostDetail post={post} slug={params.slug} />
    </section>
  );
}
