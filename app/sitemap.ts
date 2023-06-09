import { allBlogs } from "contentlayer/generated";

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `https://byshennan.com/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = [
    "",
    "/about",
    "/blog",
    "/dashboard",
    "/projects",
    "/guestbook",
    "/tools",
  ];

  routes.map((route) => ({
    url: `https://byshennan.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
