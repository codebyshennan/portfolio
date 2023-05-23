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
  const viewsForSlug = data && data.find((view) => view.slug === slug);
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
    <p
      className="font-mono text-sm text-neutral-500 tracking-tighter"
      {...args}
    >
      {data ? `${views.toLocaleString()} views` : "​"}
    </p>
  );
}
