// app/llms.txt/route.ts
import { getAllPublished } from "lib/content";

export const dynamic = "force-dynamic";

export function GET() {
  const posts = getAllPublished();
  const blogs = posts.filter((p) => p.category === "Blog");
  const projects = posts.filter((p) => p.category === "Project");

  const blogLines = blogs
    .map(
      (p) =>
        `- [${p.title}](https://byshennan.com/blog/${p.slug}): ${p.description}`
    )
    .join("\n");

  const projectLines = projects
    .map(
      (p) =>
        `- [${p.title}](https://byshennan.com/projects/${p.slug}): ${p.description}`
    )
    .join("\n");

  const content = `# Shen Nan Wong

> Builder-investor based in Southeast Asia. Sole engineer at Iterative (iterative.vc), an early-stage VC fund investing across SEA and South Asia. Founder of Fracxional — AI and data engineering education for enterprises and universities across Asia.

## Pages

- [Home](https://byshennan.com): Introduction, social links, and blog stats.
- [About](https://byshennan.com/about): Career timeline, tech stack, and background.
- [Blog](https://byshennan.com/blog): Essays on data engineering, AI systems, venture, and life in SEA.
- [Projects](https://byshennan.com/projects): Side projects and open-source work.

## Blog Posts

${blogLines}

## Projects

${projectLines}

## Contact

- LinkedIn: https://www.linkedin.com/in/wongshennan/
- GitHub: https://github.com/codebyshennan
- Substack: https://byshennan.substack.com/
- Fracxional: https://fracxional.com
- Iterative: https://iterative.vc
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
