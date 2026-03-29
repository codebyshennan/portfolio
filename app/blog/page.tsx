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
      <div className="flex items-baseline justify-between mb-2">
        <h1 className="font-bold text-3xl font-serif">Writing</h1>
        <span className="text-sm text-neutral-400 dark:text-neutral-500 tabular-nums">
          {posts.length} posts
        </span>
      </div>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        Essays on data, AI, and building across Southeast Asia.{" "}
        <a
          href="/rss.xml"
          className="inline-flex items-center gap-1 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 underline underline-offset-2 transition-colors"
        >
          RSS
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
            <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z" />
            <path d="M3 8.75A.75.75 0 013.75 8H4a8 8 0 018 8v.25a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V16a6 6 0 00-6-6h-.25A.75.75 0 013 9.25v-.5zM7 15a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </a>
      </p>

      <PostList posts={posts} basePath="/blog" />
    </section>
  );
}
