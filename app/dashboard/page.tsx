"use client";
import TopTracks from "components/metrics/spotify/topTracks";
import Stats, { StatsModel } from "components/metrics/strava/stats";
import fetcher from "lib/fetcher";
import { FaStrava, FaSpotify } from "react-icons/fa";
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
          You don't improve what you don't measure.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="font-bold text-3xl tracking-tight mb-4 text-black dark:text-white">
          Workouts
        </h2>
        <span className="text-gray-300 dark:text-gray-400 mb-4 flex items-center">
          <FaStrava />
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4">
        I'm an avid cyclist and runner. Here's my stats.
      </p>
      {data ? <Stats stats={data.stats} /> : "Loading..."}

      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="font-bold text-3xl tracking-tight mb-4 text-black dark:text-white">
          Top Tracks
        </h2>
        <span className="text-gray-300 dark:text-gray-400 mb-4 flex items-center">
          <FaSpotify />
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Curious what I'm currently jamming to? Here's my top tracks on Spotify
        updated daily.
      </p>
      <TopTracks />
    </section>
  );
}
