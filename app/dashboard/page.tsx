import Stats, { StatsModel } from "components/metrics/strava/stats";
import { getStravaStats } from "lib/strava";
import { FaStrava } from "react-icons/fa";

export const revalidate = 3600; // Revalidate every hour

export default async function DashboardPage() {
  let stravaData;
  try {
    stravaData = await getStravaStats();
  } catch (error) {
    console.error("Failed to fetch Strava stats:", error);
  }

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
      {stravaData ? <Stats stats={stravaData.stats} /> : <p>Unable to load stats</p>}

      {/* Spotify feature removed */}
    </section>
  );
}
