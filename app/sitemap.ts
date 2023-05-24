import { routes } from "components/sidebar";
import { allBlogs } from "contentlayer/generated";

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://byshennan.com/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  routes.map((route) => ({
    url: `https://byshennan.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
