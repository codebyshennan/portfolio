"use client";

import fetcher from "lib/fetcher";
import { useEffect } from "react";
import useSWR from "swr";

type PostView = {
  slug: string;
  count: string;
};

export default function ViewCounter({
  slug,
  trackView,
  ...args
}: {
  slug: string;
  trackView: boolean;
  [key: string]: any;
}) {
  const { data } = useSWR<PostView[]>("/api/views", fetcher);
  // Ensure data is an array before calling find
  const viewsForSlug = Array.isArray(data) ? data.find((view) => view.slug === slug) : null;
  const views = Number(viewsForSlug?.count || 0);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: "POST",
      });

    if (trackView) {
      registerView();
    }
  }, [slug]);

  return (
    <span
      className="font-mono text-sm text-neutral-500 tracking-tighter"
      {...args}
    >
      {data ? `${views.toLocaleString()} views` : "​"}
    </span>
  );
}
