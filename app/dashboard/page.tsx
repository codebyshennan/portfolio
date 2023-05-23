"use client";
import TopTracks from "components/metrics/spotify/topTracks";
import Stats, { StatsModel } from "components/metrics/strava/stats";
import fetcher from "lib/fetcher";
import useSWR from "swr";

export interface StravaModel {
  stats: StatsModel;
}

export default function DashboardPage() {
  const { data } = useSWR<StravaModel>("/api/strava/stats", fetcher);

  return (
    <section>
      <div className="container max-w-6xl mx-auto">
        <h1 className="font-bold text-3xl font-serif mb-5">Dashboard.</h1>
        <p className="text-neutral-400 text-base -mt-1 mb-3">
          Readings with a deep dive
        </p>
      </div>
      <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
        Strava
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        This is my personal dashboard, built with Next.js API routes deployed as
        serverless functions. I use this dashboard to track various metrics
        across platforms like Unsplash, YouTube, GitHub, and more.
      </p>
      {data ? <Stats stats={data.stats} /> : "Loading..."}
      <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
        Top Tracks
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Curious what I'm currently jamming to? Here's my top tracks on Spotify
        updated daily.
      </p>
      <TopTracks />
    </section>
  );
}
