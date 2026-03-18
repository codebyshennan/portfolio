import Link from "next/link";
import me from "../app/me.jpg";

export const name = "Shen Nan, Wong";
export const avatar = me;
export const about = () => {
  return (
    <>
      Builder-investor based in Southeast Asia. Sole engineer at{" "}
      <Link
        href="/about"
        className="font-normal text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        Iterative
      </Link>
      , where I build the data infrastructure, internal tooling, and AI systems
      that power our investment operations. Also running{" "}
      <Link
        href="/about"
        className="font-normal text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        Fracxional
      </Link>
      . Currently in Ho Chi Minh City.
    </>
  );
};
export const bio = () => {
  return (
    <>
      I'm drawn to the intersection of deep technical product work and
      venture — building things that compound, and backing founders who do the
      same. Previously{" "}
      <Link
        href="/about"
        className="font-normal leading-none text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        co-founded ZOLO
      </Link>
      , an AI food supply chain startup (Antler-backed). Always interested in
      <Link
        href="/projects"
        className="font-normal leading-none text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        {" "}side projects{" "}
      </Link>
      and building in public.
    </>
  );
};
