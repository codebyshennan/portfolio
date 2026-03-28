import type { Metadata } from "next";
import { getAllPublished } from "lib/content";
import PostList from "../../components/post-list";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays on data engineering, AI systems, venture, and life across Southeast Asia — by Shen Nan Wong.",
  alternates: {
    canonical: "https://byshennan.com/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPublished().filter((p) => p.category === "Blog");

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-2">Posts</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        subscribe{" "}
        <a href="/rss.xml" className="text-blue-500 hover:text-blue-600 underline">
          via RSS
        </a>
      </p>

      <PostList posts={posts} basePath="/blog" />
    </section>
  );
}
