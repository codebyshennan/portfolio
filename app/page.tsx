import Link from "next/link";
import Image from "next/image";
import { getBlogViews, getTweetCount, getStarCount } from "lib/metrics";
import {
  ArrowIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  ViewsIcon,
} from "components/icons";
import { name, about, bio, avatar } from "lib/info";

export const revalidate = 60;

const operating = [
  {
    name: "innxvate",
    href: "https://innxvate.org",
    label: "Digital transformation",
    description:
      "Strategy-to-execution consulting for organizations closing the gap between transformation plans and production systems.",
  },
  {
    name: "Fracxional",
    href: "https://fracxional.com",
    label: "Fractional CTO / CPO",
    description:
      "Embedded technical and product leadership for early-stage startups and venture-backed teams.",
  },
  {
    name: "nxrratives",
    href: "https://nxrratives.com",
    label: "Career coaching",
    description:
      "Facilitated career-design workshops that turn reflection, anxiety, and options into a usable next-step plan.",
  },
];

const launching = [
  {
    name: "notionplus",
    href: "https://notionplus.xyz",
    label: "Notion apps",
  },
  {
    name: "firstyearin",
    href: "https://firstyearin.xyz",
    label: "First-year stories",
  },
  {
    name: "whatsinmy",
    href: "https://whatsinmy.xyz",
    label: "Affiliate dashboard",
  },
];

export default async function HomePage() {
  let starCount, views, tweetCount;

  try {
    const [starCountResult, viewsResult, tweetCountResult] =
      await Promise.allSettled([
        getStarCount(),
        getBlogViews(),
        getTweetCount(),
      ]);

    starCount =
      starCountResult.status === "fulfilled" ? starCountResult.value : 0;

    views = viewsResult.status === "fulfilled" ? viewsResult.value : 0;

    tweetCount =
      tweetCountResult.status === "fulfilled" ? tweetCountResult.value : 0;

    console.log({ starCount, views, tweetCount });
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">{name}</h1>
      <p className="my-5 max-w-[600px] text-neutral-500 dark:text-neutral-400">
        {about()}
      </p>
      <div className="flex items-start md:items-center my-8 flex-col md:flex-row">
        <Image
          alt={name}
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2 text-neutral-500 dark:text-neutral-400">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/wongsn"
            className="flex items-center gap-2"
          >
            <TwitterIcon />
            {`${tweetCount.toLocaleString()} tweets all time`}
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/codebyshennan"
            className="flex items-center gap-2"
          >
            <GitHubIcon />
            {`${starCount.toLocaleString()} stars on this repo`}
          </a>
          <Link href="/blog" className="flex items-center">
            <ViewsIcon />
            {`${views.toLocaleString()} blog views all time`}
          </Link>
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-500 dark:text-neutral-400">
        {bio()}
      </p>
      <div className="my-10 max-w-[760px]">
        <h2 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-4">
          Operating
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {operating.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100 font-medium">
                <ArrowIcon />
                <span>{item.name}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                {item.label}
              </p>
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </a>
          ))}
        </div>
        <h2 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100 mt-8 mb-4">
          Launching
        </h2>
        <div className="flex flex-wrap gap-2">
          {launching.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              <ArrowIcon />
              <span>{item.name}</span>
              <span className="text-neutral-400 dark:text-neutral-600">/</span>
              <span className="text-neutral-400 dark:text-neutral-500">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-500 dark:text-neutral-400">
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/wongshennan/"
          >
            <ArrowIcon />
            <p className="h-7">connect on linkedin</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/wongsn"
          >
            <ArrowIcon />
            <p className="h-7">follow me on twitter</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://byshennan.substack.com/"
          >
            <ArrowIcon />
            <p className="h-7">get email updates</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
