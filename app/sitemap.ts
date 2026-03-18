import { getAllPublished } from "lib/content";

export default function sitemap() {
  const posts = getAllPublished();

  const blogs = posts
    .filter((post) => post.category === "Blog")
    .map((post) => ({
      url: `https://byshennan.com/blog/${post.slug}`,
      lastModified: post.publishedAt || new Date().toISOString(),
    }));

  const projects = posts
    .filter((post) => post.category === "Project")
    .map((post) => ({
      url: `https://byshennan.com/projects/${post.slug}`,
      lastModified: post.publishedAt || new Date().toISOString(),
    }));

  const routes = ["", "/about", "/blog", "/projects"].map((route) => ({
    url: `https://byshennan.com${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...blogs, ...projects];
}
