import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const readmePath = path.join(process.cwd(), "README.md");
const markdown = fs.readFileSync(readmePath, "utf8");

export default function HomePage() {
  return (
    <main className="page-shell">
      <article className="profile-card markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            a: ({ node: _node, ...props }) => (
              <a {...props} target="_blank" rel="noreferrer noopener" />
            ),
            img: ({ node: _node, ...props }) => (
              <img {...props} loading="lazy" />
            )
          }}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </main>
  );
}
