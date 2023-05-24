import Link from "next/link";
import me from "../app/me.jpg";

export const name = "Shen Nan, Wong";
export const avatar = me;
export const about = () => {
  return (
    <>
      Hey, I'm a software engineer based in 🇸🇬. I currently work at{" "}
      <Link
        href="/about"
        className="font-normal text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        {" "}
        Partior
      </Link>{" "}
      as a Senior DevSecOps Engineer.
    </>
  );
};
export const bio = () => {
  return (
    <>
      When I'm not coding, I'm probably chilling at a cafe, or
      <Link
        href="/dashboard"
        className="font-normal leading-none text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        {" "}
        working out.{" "}
      </Link>
      <br />I love to meet new people and exchange ideas. Working on
      <Link
        href="/projects"
        className="font-normal leading-none text-gray-400 dark:text-gray-500 hover:text-neutral-700 dark:hover:text-neutral-200"
      >
        {" "}
        a few of them{" "}
      </Link>
      now.
    </>
  );
};
