import Link from "next/link";
import me from "../app/me.jpg";

export const name = "Shen Nan, Wong";
export const avatar = me;
export const about = () => {
  return (
    <>
      Software engineer + systems builder. I'm the sole engineer at{" "}
      <Link
        href="/about"
        className="font-normal text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        {" "}
        Iterative VC
      </Link>
      , working on investment infrastructure, automation, and AI. Also building{" "}
      <Link
        href="/about"
        className="font-normal text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        {" "}
        Fracxional
      </Link>
      . Based in HCMC, nomadic across SEA.
    </>
  );
};
export const bio = () => {
  return (
    <>
      I build systems for scale—infrastructure, APIs, automation, data pipelines, and bots.
      Comfortable with{" "}
      <Link
        href="/about"
        className="font-normal leading-none text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        {" "}
        code, systems design, and shipping fast.{" "}
      </Link>
      <br />Currently focused on: investment tech, AI-powered workflows, and data engineering.
      Always interested in
      <Link
        href="/projects"
        className="font-normal leading-none text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        {" "}
        {" "}side projects{" "}
      </Link>
      and building in public.
    </>
  );
};
