import PostCardLg from "components/posts/card-lg";
import { getAllPublished } from "lib/notion";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function PortfolioPage() {
  const posts = await getAllPublished();

  return (
    <section>
      <div className="container max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl font-serif mb-5">Projects.</h1>
        <p className="text-neutral-400 text-base -mt-1 mb-3">
          Readings with a deep dive
        </p>
      </div>
      <div
        id="posts"
        className="md:container md:max-w-6xl md:mx-auto px-4 relative flex flex-nowrap overflow-x-scroll snap-x snap-mandatory scroll-pl-4 md:overflow-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-3"
        style={{
          // to maintain shadow on scrollbar
          paddingBottom: "2rem",
          marginBottom: "-2rem",
        }}
      >
        {posts
          .sort((a, b) => {
            if (new Date(a.date) > new Date(b.date)) {
              return -1;
            }
            return 1;
          })
          .map((post) =>
            post.category === "Case Study" ? (
              <PostCardLg post={post} key={post.slug} />
            ) : null
          )}
      </div>
    </section>
  );
}
