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
  const [view, setView] = useState<ViewMode>("list");

  return (
    <>
      <div className="flex justify-end mb-4">
        <ViewToggle view={view} onViewChange={setView} />
      </div>

      {view === "list" ? (
        <div className="flex flex-col">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${basePath}/${post.slug}`}
              className="group py-3 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
            >
              <p className="text-neutral-400 dark:text-neutral-500 text-sm">
                {post.publishedAt}
              </p>
              <h2 className="text-lg text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors">
                {post.title}
              </h2>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${basePath}/${post.slug}`}
              className="group border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
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
                <div className="aspect-[16/9] bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                  <span className="text-neutral-300 dark:text-neutral-700 text-3xl font-serif">
                    {post.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="p-3">
                <p className="text-neutral-400 dark:text-neutral-500 text-xs">
                  {post.publishedAt}
                </p>
                <h2 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-0.5">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
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
