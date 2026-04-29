import Link from "next/link";
import me from "../app/me.jpg";

export const name = "Shen Nan, Wong";
export const avatar = me;
export const about = () => {
  return (
    <>
      Builder-investor based in Southeast Asia.
      <br /><br />
      Sole engineer at{" "}
      <a
        href="https://iterative.vc"
        target="_blank"
        rel="noopener noreferrer"
        className="font-normal text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        Iterative
      </a>
      , where I build the data infrastructure, internal tooling, and AI systems
      that power our investment operations.
      <br /><br />
      Also running a small portfolio of operating businesses:{" "}
      <a
        href="https://fracxional.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-normal text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        Fracxional
      </a>
      {" "}for fractional CTO/CPO work,{" "}
      <a
        href="https://innxvate.org"
        target="_blank"
        rel="noopener noreferrer"
        className="font-normal text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        innxvate
      </a>
      {" "}for digital transformation, and{" "}
      <a
        href="https://nxrratives.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-normal text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        nxrratives
      </a>
      {" "}for career coaching. Currently in <span title="Ho Chi Minh City" className="cursor-default">&#127483;&#127475;</span>
    </>
  );
};
export const bio = () => {
  return (
    <>
      I'm drawn to the intersection of deep technical product work and
      venture — building things that compound, and backing founders who do the
      same. I'm also launching small products around Notion, creator tooling,
      and honest career/life transitions. Previously{" "}
      <a
        href="https://www.sayzolo.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-normal leading-none text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        co-founded ZOLO
      </a>
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
