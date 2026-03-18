import { getAllPublished } from "lib/content";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "See what I've been working on.",
};

export default function ProjectsPage() {
  const posts = getAllPublished().filter((p) => p.category === "Project");

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-2">Projects</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8">
        Hacks, experiments, and more.
      </p>

      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/projects/${post.slug}`}
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
