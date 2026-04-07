"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./code-block";
import { Callout } from "./callout";
import { FaqSection } from "./faq-section";

import { useRouter, usePathname } from "next/navigation";
import ViewCounter from "app/blog/view-counter";
import { ScrollToTop } from "components/scrollTop";

// Convert > [!TYPE] callout syntax into a detectable marker
function preprocessMarkdown(markdown: string): string {
  return markdown.replace(
    /^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|GLOSSARY)\]\n/gim,
    (_, type) => `> @@${type.toUpperCase()}@@\n>\n`
  );
}

// Recursively extract plain text from a React node (handles string | array | element)
function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement(node))
    return getTextContent((node.props as { children?: React.ReactNode }).children);
  return "";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function PostDetail({ post, slug }) {
  const router = useRouter();
  const pathName = usePathname();
  const [showCopied, setShowCopied] = useState(false);

  // Split FAQ section from main content
  const faqSplit = post.markdown.split(/\n## FAQ\s*\n/);
  const mainMarkdown = preprocessMarkdown(faqSplit[0]);
  const faqMarkdown = faqSplit[1] ?? null;

  const wordCount = post.markdown.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://byshennan.com${pathName}`);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.metadata.title,
        url: `https://byshennan.com${pathName}`,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <article>
      <ScrollToTop />

      <header className="py-2 md:py-8">
        <div className="container max-w-2xl mx-auto px-6">
          {/* Back button */}
          <button
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition mb-6 flex items-center gap-1 text-sm"
            onClick={() =>
              router.back == null ? router.push("/") : router.back()
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>

          {/* Title */}
          <h1 className="font-serif font-bold text-3xl md:text-4xl text-black dark:text-white leading-tight tracking-tight">
            {post.metadata.title}
          </h1>

          {/* Description lead */}
          {post.metadata.description && (
            <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {post.metadata.description}
            </p>
          )}

          {/* Author + Date + Reading time */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Shen Nan
            </span>
            <span aria-hidden>·</span>
            <time dateTime={post.metadata.publishedAt}>{post.metadata.publishedAt}</time>
            <span aria-hidden>·</span>
            <span>{readingTime} min read</span>
          </div>

          {/* Tags */}
          {post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {post.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <ViewCounter slug={slug} trackView={true} />

          {/* Action bar */}
          <div className="flex items-center justify-between mt-6 py-3 border-y border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-4">
              {post.metadata.github && (
                <a
                  href={post.metadata.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
                  title="View source"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              )}
              {post.metadata.website && (
                <a
                  href={post.metadata.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
                  title="Visit website"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.466.732-3.558" />
                  </svg>
                </a>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                className="relative text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition"
                onClick={handleCopy}
                title="Copy link"
              >
                {showCopied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </button>
              <button
                className="text-sm border border-neutral-300 dark:border-neutral-600 rounded-full px-4 py-1 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                onClick={handleShare}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </header>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="my-8 prose prose-neutral prose-quoteless dark:prose-invert container max-w-2xl mx-auto px-6"
        components={{

          pre({ children }) {
            return <>{children}</>;
          },
          code({ className, children, ...props }) {
            if (className?.startsWith("language-")) {
              return (
                <CodeBlock className={className}>
                  {String(children)}
                </CodeBlock>
              );
            }
            return (
              <code
                className="px-1.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[0.875em] font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          blockquote({ node, children }) {
            // Use hast node for reliable detection — avoids whitespace text node ordering issues
            const hastChildren = (node?.children ?? []) as Array<{ type: string; tagName?: string; children?: Array<{ type: string; value?: string }> }>;
            const firstPara = hastChildren.find(c => c.type === "element" && c.tagName === "p");
            const firstText = (firstPara?.children?.find(c => c.type === "text")?.value ?? "").trim();
            const match = firstText.match(/^@@(NOTE|TIP|IMPORTANT|WARNING|CAUTION|GLOSSARY)@@$/);

            if (match) {
              const marker = `@@${match[1]}@@`;
              const contentChildren = React.Children.toArray(children).filter(c => {
                if (!React.isValidElement(c)) return false;
                return getTextContent((c.props as { children?: React.ReactNode }).children).trim() !== marker;
              });
              return <Callout type={match[1]}>{contentChildren}</Callout>;
            }

            return (
              <blockquote className="not-prose my-6 border-l-[3px] border-neutral-300 dark:border-neutral-600 pl-5 text-neutral-600 dark:text-neutral-400 italic [&>p]:my-0 [&>p]:leading-relaxed">
                {children}
              </blockquote>
            );
          },
          strong({ children }) {
            const TOOL_DESCRIPTIONS: Record<string, string> = {
              Meridian: "Channel-native LLM orchestrator — plans workflows, gets approval, executes via MCP",
              Atlas: "Hybrid expert search — blends SQL filtering with semantic vector retrieval",
              Bearing: "Investment memo generator — parallel research agents → IC-ready docs",
              Compass: "Community knowledge base — archives threads, classifies by topic, publishes articles",
              Fathom: "Founder fluency classifier — assigns Breakout / Repeat / Operator / Novice tiers",
              Pilot: "Voice interview agent — conducts founder calls, logs structured feedback to Airtable",
            };
            const text = getTextContent(children as React.ReactNode);
            if (text in TOOL_DESCRIPTIONS) {
              return (
                <a
                  href={`#tool-${text.toLowerCase()}`}
                  className="no-underline relative group/tool inline-block"
                >
                  <strong className="font-semibold underline decoration-dotted underline-offset-2 decoration-neutral-400 dark:decoration-neutral-600">
                    {children}
                  </strong>
                  <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-3 py-2 text-center text-xs text-white dark:text-neutral-900 leading-relaxed shadow-lg opacity-0 group-hover/tool:opacity-100 transition-opacity duration-150 z-[60]">
                    {TOOL_DESCRIPTIONS[text]}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900 dark:border-t-neutral-100" />
                  </span>
                </a>
              );
            }
            return <strong>{children}</strong>;
          },
          h2({ children }) {
            const text = typeof children === "string" ? children : String(children);
            const id = slugify(text);
            return (
              <h2
                id={id}
                className="group relative mt-12 mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight scroll-mt-20"
              >
                <a
                  href={`#${id}`}
                  className="absolute -left-5 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-300 dark:text-neutral-700 no-underline pr-1"
                  aria-hidden
                >
                  #
                </a>
                {children}
              </h2>
            );
          },
          h3({ children }) {
            const text = typeof children === "string" ? children : String(children);
            const id = slugify(text);
            return (
              <h3
                id={id}
                className="group relative mt-8 mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight scroll-mt-20"
              >
                <a
                  href={`#${id}`}
                  className="absolute -left-5 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-300 dark:text-neutral-700 no-underline"
                  aria-hidden
                >
                  #
                </a>
                {children}
              </h3>
            );
          },
          hr() {
            return (
              <div className="my-10 flex items-center justify-center gap-3 not-prose" aria-hidden>
                <span className="block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                <span className="block w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>
            );
          },
          a({ href, children }) {
            const isExternal = href?.startsWith("http");
            const isCitation =
              isExternal &&
              (href?.includes("arxiv.org") ||
                href?.includes("semanticscholar.org") ||
                href?.includes("aclanthology.org") ||
                href?.includes("proceedings.neurips.cc") ||
                href?.includes("openreview.net"));

            if (isCitation) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-0.5 text-neutral-900 dark:text-neutral-100 underline underline-offset-2 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-500 dark:hover:decoration-neutral-400 transition-colors"
                >
                  {children}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-2.5 h-2.5 mb-1 text-neutral-400 dark:text-neutral-500 flex-shrink-0">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H5.5M9.5 2.5V6.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              );
            }

            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="text-neutral-900 dark:text-neutral-100 underline underline-offset-2 decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-neutral-700 dark:hover:decoration-neutral-300 transition-colors"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {mainMarkdown}
      </ReactMarkdown>

      {faqMarkdown && <FaqSection markdown={faqMarkdown} />}

      {/* Author bio */}
      <div className="container max-w-2xl mx-auto px-6 mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-700">
        <div className="flex items-start gap-3">
          <div>
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              <a href="https://byshennan.com" className="hover:underline">Shen Nan Wong</a>
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Sole engineer at{" "}
              <a href="https://iterative.vc" target="_blank" rel="noopener noreferrer" className="hover:underline">Iterative</a>
              {" "}(early-stage VC fund, SEA & South Asia), building data infrastructure and AI systems for investment operations.
              Founder of{" "}
              <a href="https://fracxional.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Fracxional</a>
              {" "}— AI and data engineering education for enterprises and universities across Asia.
              Based in Ho Chi Minh City, Southeast Asia.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
