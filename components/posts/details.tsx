"use client";
import React from "react";
import ReactMarkdown from "react-markdown";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ColorExtractor } from "react-color-extractor";
import ViewCounter from "app/blog/view-counter";

export default function PostDetail({ post, slug }) {
  const router = useRouter();

  return (
    <article>
      <meta name="theme-color" />

      <header className="py-2 md:py-8 lg:h-screen md:h-auto">
        <div className="flex flex-col gap-2">
          <div className="container max-w-2xl mx-auto px-6 flex justify-between items-center">
            <button
              id="back-btn"
              className="text-white/75 hover:opacity-75 transition duration-200 ease-in-out md:p-2 md:rounded-full md:bg-white/20"
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
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <div className="flex flex-row gap-4">
              <button className="text-white/75 hover:opacity-75 transition duration-200 ease-in-out md:p-2 md:rounded-full md:bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </button>
              <button className="text-white/75 hover:opacity-75 transition duration-200 ease-in-out md:p-2 md:rounded-full md:bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="container max-w-2xl mx-auto px-6">
            <h1
              id="title"
              className="font-bold text-[32px] md:text-4xl dark:text-white brightness-150 leading-[36px] tracking-tight"
              style={{ textShadow: "2px 3px 5px rgba(0,0,0,0.10)" }}
            >
              {post.metadata.title}
            </h1>
            <ViewCounter slug={slug} trackView={true} />
          </div>

          <div className="container max-w-3xl px-6 mx-auto">
            <div
              id="picture"
              className="relative w-[100%] overflow-hidden aspect-video rounded-lg md:rounded-xl shadow-2xl"
            >
              <Image
                fill
                className="object-cover"
                src={post.metadata.cover}
                alt={post.metadata.title}
                priority={true}
              />
            </div>
          </div>

          <div className="container max-w-2xl mx-auto px-6">
            <p
              id="desc"
              className="mt-2 text-black/75 dark:text-white/75 text-xl"
            >
              {post.metadata.description}
            </p>
            <hr className="divide mt-12 mb-4 border-black/20 dark:border-white/20"></hr>
            <div className="flex justify-between items-center text-black/75 dark:text-white/75 text-base">
              <p>
                by{" "}
                <span id="author" className="font-medium">
                  Brian Ruiz
                </span>
              </p>
              <p id="date">{post.metadata.date}</p>
            </div>
          </div>

          <ColorExtractor
            src={post.metadata.cover}
            getColors={(colors) => {
              // document
              //   .querySelector<HTMLElement>("meta[name=theme-color]")!
              //   .setAttribute("content", colors[5]);

              // document.querySelector<HTMLElement>(
              //   "header"
              // )!.style.backgroundColor = colors[1];

              document.querySelector<HTMLElement>("#title")!.style.color =
                colors[5];

              document.querySelector<HTMLElement>(
                "#back-btn"
              )!.style.backgroundColor = colors[1];

              // [
              //   ...document.querySelector<HTMLElement>("#palette")!.children,
              // ].forEach((child: HTMLElement, index) => {
              //   child.style.backgroundColor = colors[index];
              // });
            }}
          />
        </div>
      </header>

      <ReactMarkdown className="my-12 prose prose-neutral dark:prose-invert container max-w-2xl mx-auto px-6">
        {post.markdown}
      </ReactMarkdown>
    </article>
  );
}
