"use client";
import React, { useState } from "react";

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (React.isValidElement(node))
    return getTextContent((node.props as { children?: React.ReactNode }).children);
  return "";
}

type CalloutType = "NOTE" | "TIP" | "IMPORTANT" | "WARNING" | "CAUTION";

const CONFIG: Record<CalloutType, {
  label: string;
  wrapperCls: string;
  iconCls: string;
  icon: React.ReactNode;
}> = {
  NOTE: {
    label: "Note",
    wrapperCls: "border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100",
    iconCls: "text-blue-500 dark:text-blue-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
    ),
  },
  TIP: {
    label: "Tip",
    wrapperCls: "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-100",
    iconCls: "text-emerald-500 dark:text-emerald-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" />
      </svg>
    ),
  },
  IMPORTANT: {
    label: "Important",
    wrapperCls: "border-violet-200 dark:border-violet-800/60 bg-violet-50 dark:bg-violet-950/20 text-violet-900 dark:text-violet-100",
    iconCls: "text-violet-500 dark:text-violet-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
      </svg>
    ),
  },
  WARNING: {
    label: "Warning",
    wrapperCls: "border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-100",
    iconCls: "text-amber-500 dark:text-amber-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  CAUTION: {
    label: "Caution",
    wrapperCls: "border-red-200 dark:border-red-800/60 bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-100",
    iconCls: "text-red-500 dark:text-red-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
      </svg>
    ),
  },
};

// ─── Glossary (collapsible tool/term reference grid) ─────────────────────────

function GlossaryBox({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const entries = React.Children.toArray(children)
    .map((child) => {
      if (!React.isValidElement(child)) return null;
      const text = getTextContent((child.props as { children?: React.ReactNode }).children);
      const sep = text.indexOf("::");
      if (sep === -1) return null;
      return { name: text.slice(0, sep).trim(), desc: text.slice(sep + 2).trim() };
    })
    .filter((e): e is { name: string; desc: string } => e !== null);

  if (entries.length === 0) return null;

  return (
    <div className="not-prose my-6 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-900/60 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-wider">Tools in this post</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-neutral-100 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-800">
          {entries.map(({ name, desc }) => (
            <div
              key={name}
              id={`tool-${name.toLowerCase()}`}
              className="bg-white dark:bg-[#111010] px-4 py-3 scroll-mt-24"
            >
              <p className="text-xs font-semibold font-mono text-neutral-800 dark:text-neutral-200 mb-0.5">
                {name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Generic callout ──────────────────────────────────────────────────────────

export function Callout({
  type,
  children,
}: {
  type: string;
  children: React.ReactNode;
}) {
  if (type === "GLOSSARY") {
    return <GlossaryBox>{children}</GlossaryBox>;
  }

  const cfg = CONFIG[(type.toUpperCase() as CalloutType)] ?? CONFIG.NOTE;

  return (
    <div className={`not-prose my-6 rounded-lg border px-4 pt-3 pb-4 ${cfg.wrapperCls}`}>
      <div className={`flex items-center gap-1.5 mb-2 ${cfg.iconCls}`}>
        {cfg.icon}
        <span className="text-xs font-semibold uppercase tracking-wider">
          {cfg.label}
        </span>
      </div>
      <div className="text-sm leading-relaxed [&>p]:mt-0 [&>p+p]:mt-2 [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
    </div>
  );
}
