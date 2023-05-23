import { motion } from "framer-motion";

import {
  distanceConverter,
  elevationConverter,
  hoursMinsConverter,
} from "lib/converters";
import { distanceIcon, elevationIcon, rideIcon, timeIcon } from "./icons";

export interface TotalsModel {
  count: number;
  distance: number;
  elevation_gain: number;
  moving_time: number;
}

export interface StatsModel {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  all_run_totals: TotalsModel;
  all_ride_totals: TotalsModel;
  message: string;
}

interface StatsType {
  stats: StatsModel;
}

export const scrollAnimationVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 0.25,
    },
  },
};

const Stats = (props: StatsType) => {
  const runTotals = props.stats.all_run_totals;
  const { count, distance, elevation_gain, moving_time } = runTotals;

  const distanceKm = distanceConverter(distance, 2, true);
  const time = hoursMinsConverter(moving_time);
  const elevationKm = elevationConverter(elevation_gain);

  const stats = [
    { id: 1, name: "Total Runs", stat: count, icon: rideIcon },
    { id: 2, name: "Total Distance", stat: distanceKm, icon: distanceIcon },
    { id: 3, name: "Total Time", stat: time, icon: timeIcon },
    { id: 4, name: "Total Elevation", stat: elevationKm, icon: elevationIcon },
  ];

  return (
    <div className="max-w-8xl mx-auto mt-10 mb-10 px-3 sm:px-4 lg:px-8">
      <dl className="mt-5 mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
        {stats.map((item, index: number) => (
          // <motion.div
          //   key={index}
          //   initial="hidden"
          //   animate="visible"
          //   variants={scrollAnimationVariants}
          //   className="relative overflow-hidden rounded-md bg-zinc px-2 pt-5 font-oswald shadow sm:px-6 sm:pt-6"
          // >
          <div className="relative overflow-hidden rounded-md bg-zinc px-2 pt-5 font-oswald shadow sm:px-6 sm:pt-6">
            <dt>
              <div className="bg-white-600 absolute rounded-md p-3">
                {item.icon}
              </div>
              <p className="l ml-24 truncate font-oswald text-xl font-medium text-white">
                {item.name}
              </p>
            </dt>
            <dd className="ml-24 flex items-baseline pb-6">
              <p className="text-2xl font-semibold italic text-white">
                {item.stat}
              </p>
            </dd>
            {/* </motion.div> */}
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Stats;
