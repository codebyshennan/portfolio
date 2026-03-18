"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useRouter, usePathname } from "next/navigation";
import ViewCounter from "app/blog/view-counter";
import { ScrollToTop } from "components/scrollTop";

export default function PostDetail({ post, slug }) {
  const router = useRouter();
  const pathName = usePathname();
  const [showCopied, setShowCopied] = useState(false);

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

          {/* Author + Date */}
          <div className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              Shen Nan
            </span>
            <br />
            {post.metadata.publishedAt}
          </div>

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
        className="my-8 prose prose-neutral dark:prose-invert container max-w-2xl mx-auto px-6"
      >
        {post.markdown}
      </ReactMarkdown>
    </article>
  );
}
