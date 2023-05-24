import type { Metadata } from "next";
import { getAllPublished } from "../../lib/notion";
import PostCardMd from "components/posts/card-md";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const posts = await getAllPublished();

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-5">Blog</h1>
      <p className="text-neutral-400 text-base -mt-1 mb-3">
        Caffeinated thoughts on software development, design, and more.
      </p>

      <div
        id="posts"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        {posts
          .sort((a, b) => {
            if (new Date(a.date) > new Date(b.date)) {
              return -1;
            }
            return 1;
          })
          .map((post) =>
            post.category === "Blog" ? (
              <PostCardMd post={post} key={post.slug} />
            ) : null
          )}
      </div>
    </section>
  );
}
