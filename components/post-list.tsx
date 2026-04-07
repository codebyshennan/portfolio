"use client";

import { useState } from "react";
import Link from "next/link";
import ViewToggle, { type ViewMode } from "./view-toggle";

interface Post {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  cover: string | null;
  tags: string[];
}

export default function PostList({
  posts,
  basePath,
}: {
  posts: Post[];
  basePath: string;
}) {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <>
      <div className="flex justify-end mb-4">
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      {view === "list" ? (
        <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800/60">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${basePath}/${post.slug}`}
              className="group py-5 first:pt-0 flex flex-col gap-1.5 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                  {post.publishedAt}
                </span>
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  {post.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${basePath}/${post.slug}`}
              className="group border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              {post.cover ? (
                <div className="aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="aspect-[16/9] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
                  <span className="text-4xl font-serif font-bold text-neutral-300 dark:text-neutral-700">
                    {post.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="p-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                    {post.publishedAt}
                  </span>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-snug">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
