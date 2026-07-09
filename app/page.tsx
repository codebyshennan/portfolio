import Link from "next/link";
import Image from "next/image";
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  ViewsIcon,
} from "components/icons";
import SiteFavicon from "components/site-favicon";
import XCollectiveLogo from "components/x-collective-logo";
import { name, about, bio, avatar } from "lib/info";
import { SearchParams, shouldShowXCollective } from "lib/query-flags";
import { launching, xCollectiveBrands } from "lib/ventures";

export const revalidate = 60;

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = searchParams ? await searchParams : {};
  const showXCollective = shouldShowXCollective(params);
  const starCount = 0;
  const views = 0;
  const tweetCount = 0;

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">{name}</h1>
      <p className="my-5 max-w-[600px] text-neutral-500 dark:text-neutral-400">
        {about(showXCollective)}
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
        {showXCollective ? (
          <section className="mb-10" aria-labelledby="x-collective-heading">
            <div className="mb-5 flex flex-col gap-4 border-y border-neutral-200 py-5 dark:border-neutral-800 md:flex-row md:items-center md:justify-between">
              <XCollectiveLogo />
              <p className="max-w-[330px] text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                A small operating studio for systems, transformation, and
                career-design work.
              </p>
            </div>
            <h2 id="x-collective-heading" className="sr-only">
              x-collective brands
            </h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {xCollectiveBrands.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-neutral-200 p-4 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
                >
                  <div className="flex items-center gap-1.5 font-medium text-neutral-900 dark:text-neutral-100">
                    <SiteFavicon
                      domain={item.domain}
                      name={item.name}
                      src={item.iconSrc}
                      grayscale={false}
                    />
                    <span>{item.name}</span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>
          </section>
        ) : null}
        <div>
          <h2 className="font-serif font-bold text-xl text-neutral-900 dark:text-neutral-100 mb-4">
            Launching
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {launching.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg border border-neutral-200 p-3 text-sm transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
                  <SiteFavicon
                    domain={item.domain}
                    name={item.name}
                    src={item.iconSrc}
                    className="h-5 w-5"
                  />
                </div>
                <div className="mt-3 font-medium text-neutral-800 group-hover:text-neutral-950 dark:text-neutral-200 dark:group-hover:text-white">
                  {item.name}
                </div>
                <div className="mt-1 text-xs leading-snug text-neutral-400 dark:text-neutral-500">
                  {item.label}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <ul className="mt-8 flex flex-col gap-2 font-sm text-neutral-500 dark:text-neutral-400">
        <li>
          <a
            className="inline-flex w-fit items-center gap-2 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/wongshennan/"
          >
            <SiteFavicon domain="linkedin.com" name="LinkedIn" />
            <span>connect on linkedin</span>
          </a>
        </li>
        <li>
          <a
            className="inline-flex w-fit items-center gap-2 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/wongsn"
          >
            <SiteFavicon domain="twitter.com" name="Twitter" />
            <span>follow me on twitter</span>
          </a>
        </li>
        <li>
          <a
            className="inline-flex w-fit items-center gap-2 hover:text-neutral-700 dark:hover:text-neutral-200 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://byshennan.substack.com/"
          >
            <SiteFavicon domain="substack.com" name="Substack" />
            <span>get email updates</span>
          </a>
        </li>
      </ul>
    </section>
  );
}
