"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FaqItem {
  question: string;
  answerMarkdown: string;
}

function parseFaq(markdown: string): FaqItem[] {
  const items: FaqItem[] = [];
  const lines = markdown.trim().split("\n");
  let currentQuestion: string | null = null;
  let answerLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (currentQuestion !== null) {
        items.push({ question: currentQuestion, answerMarkdown: answerLines.join("\n").trim() });
      }
      currentQuestion = line.slice(4).trim().replace(/\?$/, "");
      answerLines = [];
    } else if (currentQuestion !== null) {
      answerLines.push(line);
    }
  }
  if (currentQuestion !== null && answerLines.length > 0) {
    items.push({ question: currentQuestion, answerMarkdown: answerLines.join("\n").trim() });
  }
  return items;
}

export function FaqSection({ markdown }: { markdown: string }) {
  const items = parseFaq(markdown);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <div className="container max-w-2xl mx-auto px-6 mt-12">
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-neutral-400">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-start justify-between gap-3 px-4 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors cursor-pointer"
              >
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 leading-snug">
                  {item.question}?
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-neutral-100 dark:border-neutral-800/60">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm prose-neutral dark:prose-invert mt-3 max-w-none"
                    components={{
                      a({ href, children }) {
                        const isExternal = href?.startsWith("http");
                        return (
                          <a
                            href={href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                          >
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {item.answerMarkdown}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
