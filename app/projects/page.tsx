import { getAllPublished } from "lib/content";
import { Metadata } from "next";
import PostList from "../../components/post-list";

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

      <PostList posts={posts} basePath="/projects" />
    </section>
  );
}
