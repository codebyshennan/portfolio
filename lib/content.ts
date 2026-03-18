import fs from "fs";
import path from "path";

interface PostMeta {
  id: string;
  title: string;
  category: "Blog" | "Project";
  tags: string[];
  description: string;
  date: string;
  publishedAt: string;
  slug: string;
  cover: string | null;
  github: string | null;
  website: string | null;
}

interface PostDetail {
  metadata: PostMeta;
  markdown: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function parseFrontmatter(fileContent: string): {
  data: Record<string, string>;
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: fileContent };
  }

  const frontmatter = match[1];
  const content = match[2];
  const data: Record<string, string> = {};

  for (const line of frontmatter.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    data[key] = value;
  }

  return { data, content };
}

function relativeDate(datestring: string): string {
  const date = new Date(datestring);
  const today = new Date();
  const diff = Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 14) return "Last week";
  if (diff < 21) return "2 weeks ago";
  if (diff < 28) return "3 weeks ago";
  if (diff < 60) return "Last month";

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getPostsFromDir(
  dir: string,
  category: "Blog" | "Project"
): PostMeta[] {
  const fullPath = path.join(CONTENT_DIR, dir);

  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullPath, file), "utf-8");
      const { data } = parseFrontmatter(raw);
      const slug = file.replace(/\.mdx?$/, "");

      return {
        id: slug,
        title: data.title || slug,
        category,
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        description: data.description || "",
        date: relativeDate(data.date || ""),
        publishedAt: data.date || "",
        slug,
        cover: data.cover || null,
        github: data.github || null,
        website: data.website || null,
      };
    })
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
}

export function getAllPublished(): PostMeta[] {
  const blogs = getPostsFromDir("blog", "Blog");
  const projects = getPostsFromDir("projects", "Project");
  return [...blogs, ...projects];
}

export function getSinglePostBySlug(slug: string): PostDetail | null {
  // Search both directories
  for (const [dir, category] of [
    ["blog", "Blog"],
    ["projects", "Project"],
  ] as const) {
    const fullDir = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(fullDir)) continue;

    for (const ext of [".md", ".mdx"]) {
      const filePath = path.join(fullDir, `${slug}${ext}`);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = parseFrontmatter(raw);

        return {
          metadata: {
            id: slug,
            title: data.title || slug,
            category,
            tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
            description: data.description || "",
            date: relativeDate(data.date || ""),
            publishedAt: data.date || "",
            slug,
            cover: data.cover || null,
            github: data.github || null,
            website: data.website || null,
          },
          markdown: content,
        };
      }
    }
  }

  return null;
}
