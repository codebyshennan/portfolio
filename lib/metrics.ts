import "server-only";

import { Octokit } from "@octokit/rest";
import { queryBuilder } from "lib/planetscale";
import { cache } from "react";

const DEFAULT_TIMEOUT_MS = 8000;

async function withTimeout<T>(
  promise: Promise<T>,
  fallback: T,
  label: string,
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<T> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.warn(`metrics ${label} timed out after ${timeoutMs}ms`);
      resolve(fallback);
    }, timeoutMs);

    promise
      .then((value) => resolve(value))
      .catch((error) => {
        console.error(`metrics ${label} failed`, error);
        resolve(fallback);
      })
      .finally(() => clearTimeout(timeout));
  });
}

const user = "wongsn";

export const getBlogViews = cache(async () => {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }

  const query = queryBuilder
    .selectFrom("views")
    .select(["count"])
    .execute();

  const data = await withTimeout(query, [], "blog views");

  return data.reduce((acc, curr) => acc + Number(curr.count), 0);
});

export async function getTweetCount() {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  const request = fetch(
    `https://api.twitter.com/2/users/by/username/${user}?user.fields=public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
      signal: controller.signal,
    }
  );

  const response = await withTimeout(request, null, "twitter");

  clearTimeout(timeout);

  if (!response) {
    return 0;
  }

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

    const request = octokit.rest.repos.get({
      owner: "codebyshennan",
      repo: "portfolio",
    });

    const result = await withTimeout(request, null, "github");

    if (!result) {
      return 0;
    }

    const { data } = result;

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
