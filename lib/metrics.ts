import "server-only";

import { Octokit } from "@octokit/rest";
import { queryBuilder } from "lib/planetscale";
import { cache } from "react";

const user = "wongsn";

export const getBlogViews = cache(async () => {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }

  const data = await queryBuilder
    .selectFrom("views")
    .select(["count"])
    .execute();

  return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});

export async function getTweetCount() {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }

  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/${user}?user.fields=public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  );

  const { data } = await response.json();
  return Number(data.public_metrics.tweet_count);
}

export const getStarCount = cache(async () => {
  if (!process.env.GITHUB_TOKEN) {
    return 0;
  }

  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
      request: {
        // Cache responses for 1 hour
        fetch: (url, options) => {
          return fetch(url, {
            ...options,
            next: { revalidate: 3600 },
          } as RequestInit);
        },
      },
    });

    const { data } = await octokit.rest.repos.get({
      owner: "codebyshennan",
      repo: "portfolio",
    });

    // Use stargazers_count for star count, not subscribers_count
    return data.stargazers_count || 0;
  } catch (error: any) {
    // Silently handle credential errors - these are expected in development
    // Only log non-authentication errors for debugging
    if (error?.status === 401 || error?.status === 403) {
      // Bad credentials or forbidden - likely missing/invalid token
      // This is expected in dev environments without GitHub token
      return 0;
    }
    // Log other errors (network issues, etc.)
    console.error("Failed to fetch GitHub star count:", error?.message || error);
    return 0;
  }
});
