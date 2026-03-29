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
  author: string | null;
  keywords: string[];
  draft: boolean;
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
        author: data.author || null,
        keywords: data.keywords ? data.keywords.split(",").map((k) => k.trim()) : [],
          draft: data.draft === "true",
      };
    })
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
}

export function getAllPublished(): PostMeta[] {
  const blogs = getPostsFromDir("blog", "Blog");
  const projects = getPostsFromDir("projects", "Project");
  const all = [...blogs, ...projects];
  return process.env.NODE_ENV === "development" ? all : all.filter((p) => !p.draft);
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
            author: data.author || null,
            keywords: data.keywords ? data.keywords.split(",").map((k) => k.trim()) : [],
            draft: data.draft === "true",
          },
          markdown: content,
        };
      }
    }
  }

  return null;
}

export function extractFaq(
  markdown: string
): Array<{ question: string; answer: string }> | null {
  // Find the ## FAQ section (everything after it)
  const faqMatch = markdown.match(/^## FAQ\s*\n([\s\S]*)$/m);
  if (!faqMatch) return null;

  const faqSection = faqMatch[1];
  const pairs: Array<{ question: string; answer: string }> = [];
  const lines = faqSection.split("\n");

  let currentQuestion: string | null = null;
  let currentAnswerLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (currentQuestion && currentAnswerLines.length > 0) {
        pairs.push({
          question: currentQuestion,
          answer: currentAnswerLines.join(" ").trim(),
        });
      }
      currentQuestion = line.slice(4).trim();
      currentAnswerLines = [];
    } else if (currentQuestion && line.trim()) {
      currentAnswerLines.push(line.trim());
    }
  }

  if (currentQuestion && currentAnswerLines.length > 0) {
    pairs.push({
      question: currentQuestion,
      answer: currentAnswerLines.join(" ").trim(),
    });
  }

  return pairs.length > 0 ? pairs : null;
}
