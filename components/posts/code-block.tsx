"use client";
import { useState, useEffect } from "react";
import { codeToHtml } from "shiki";

interface CodeBlockProps {
  children: string;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const lang = className?.replace("language-", "") ?? "text";
  const [html, setHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const code = children.replace(/\n$/, "");
    codeToHtml(code, {
      lang,
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    })
      .then(setHtml)
      .catch(() =>
        codeToHtml(code, {
          lang: "text",
          themes: { light: "github-light", dark: "github-dark" },
          defaultColor: false,
        }).then(setHtml)
      );
  }, [children, lang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 text-sm not-prose">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
          {lang !== "text" ? lang : ""}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 transition-colors cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {html ? (
        <div
          className="[&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:m-0 [&>pre]:rounded-none [&>pre]:text-sm [&>pre]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="p-4 bg-white dark:bg-neutral-950 overflow-x-auto text-sm leading-relaxed">
          <code className="text-neutral-800 dark:text-neutral-200">{children}</code>
        </pre>
      )}
    </div>
  );
}
