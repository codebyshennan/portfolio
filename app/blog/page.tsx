import type { Metadata } from "next";
import { getAllPublished } from "lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
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

      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
          >
            <p className="text-neutral-400 dark:text-neutral-500 text-sm">
              {post.publishedAt}
            </p>
            <h2 className="text-lg text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
              {post.title}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
