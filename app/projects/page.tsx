import PostCardLg from "components/posts/card-lg";
import { getAllPublished } from "lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "See what I've been working on.",
};

export default function ProjectsPage() {
  const posts = getAllPublished().filter((p) => p.category === "Project");

  return (
    <section>
      <div className="container max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl font-serif mb-5">Projects.</h1>
        <p className="text-neutral-400 text-base -mt-1 mb-3">
          Hacks, experiments, and more.
        </p>
      </div>
      <div
        id="posts"
        className="md:container md:max-w-6xl md:mx-auto px-4 relative flex flex-nowrap overflow-x-scroll snap-x snap-mandatory scroll-pl-4 md:overflow-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {posts.map((post) => (
          <PostCardLg post={post} key={post.slug} />
        ))}
      </div>
    </section>
  );
}
