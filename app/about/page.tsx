import { Fragment } from "react";
import type { Metadata } from "next";
import { SearchParams, shouldShowXCollective } from "lib/query-flags";
import technologies from "lib/technologies";
import timeline from "lib/timeline";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Shen Nan, Wong - Builder-investor based in SEA. Sole engineer at Iterative, building data infrastructure, internal tooling, and AI systems for venture.",
  alternates: {
    canonical: "https://byshennan.com/about",
  },
};

export const revalidate = 86400; // Revalidate once per day

export default async function AboutPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const params = searchParams ? await searchParams : {};
  const showXCollective = shouldShowXCollective(params);
  const visibleTimeline = timeline.filter(
    (item) => showXCollective || item.company !== "x-collective",
  );

  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-5">About Me</h1>
      <p className="text-neutral-400 text-base -mt-1 mb-3">
        Hey, I'm Shen Nan. I'm a builder-investor based in Southeast Asia.
        I'm the sole engineer at <strong className="text-neutral-300">Iterative</strong>, an early-stage fund investing across SEA and South Asia, where I build the data infrastructure, internal tooling, and AI systems that power our investment operations.
        {showXCollective ? (
          <>
            {" "}In parallel, I run <strong className="text-neutral-300">x-collective</strong> across fractional CTO/CPO work, automation systems, digital transformation, and career coaching.
          </>
        ) : null}
      </p>
      <p className="text-neutral-400 text-base mb-3">
        I'm drawn to deep technical product work and venture: building things that compound, then backing founders who do the same.
      </p>
      <a
        href="https://www.papermark.com/view/cmholj83j0003l504yjnln5q0"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 mb-4"
      >
        View Resume
        <svg
          className="w-3 h-3 ml-2"
          aria-label="View Resume"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </a>
      <div className="my-5 text-neutral-800 dark:text-neutral-200">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {visibleTimeline.map((item, index) => (
            <li key={index} className="ml-4 mb-10">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {item.date}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.logo && (
                  <img
                    src={item.logo}
                    alt=""
                    aria-hidden="true"
                    width={16}
                    height={16}
                    loading="lazy"
                    decoding="async"
                    className={`w-4 h-4 mr-2 inline-block ${
                      item.company === "x-collective"
                        ? ""
                        : "grayscale opacity-70"
                    }`}
                  />
                )}
                {item.link ? (
                  <a href={item.link}>{item.company}</a>
                ) : (
                  <span>{item.company}</span>
                )}
                {index === 0 && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                    Current
                  </span>
                )}
              </h3>
              {item.roles && (
                <ul className="ml-6">
                  {item.roles.map((role, index) => (
                    <Fragment key={`${role}-${index}`}>
                      <p className="block my-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {role.position}
                      </p>

                      <ol className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {role.description.map((desc, index) => (
                          <li key={index} className="list-disc ml-4">
                            {desc}
                          </li>
                        ))}
                      </ol>

                      {role.clients && role.clients.length > 0 && (
                        <div className="mt-4">
                          <div className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500 mb-2">
                            Clients & partners
                          </div>
                          {item.company === "x-collective" ? (
                            <div className="flex flex-wrap items-center gap-3 mx-1">
                              {role.clients
                                .filter((client) => client.logo)
                                .map((client, idx) =>
                                  client.link ? (
                                    <a
                                      key={`${client.name}-${idx}`}
                                      href={client.link}
                                      aria-label={client.name}
                                      className="group/tooltip relative inline-flex h-6 w-6 items-center justify-center transition-opacity hover:opacity-80 focus-visible:outline-none"
                                    >
                                      <img
                                        src={client.logo}
                                        alt=""
                                        aria-hidden="true"
                                        width={16}
                                        height={16}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-4 h-4 grayscale opacity-70"
                                      />
                                      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 px-2 py-1 text-xs leading-none text-white opacity-0 shadow-sm transition-opacity group-hover/tooltip:opacity-100 group-focus-visible/tooltip:opacity-100 dark:bg-neutral-100 dark:text-neutral-900">
                                        {client.name}
                                      </span>
                                    </a>
                                  ) : (
                                    <span
                                      key={`${client.name}-${idx}`}
                                      aria-label={client.name}
                                      tabIndex={0}
                                      className="group/tooltip relative inline-flex h-6 w-6 items-center justify-center focus-visible:outline-none"
                                    >
                                      <img
                                        src={client.logo}
                                        alt=""
                                        aria-hidden="true"
                                        width={16}
                                        height={16}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-4 h-4 grayscale opacity-70"
                                      />
                                      <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 px-2 py-1 text-xs leading-none text-white opacity-0 shadow-sm transition-opacity group-hover/tooltip:opacity-100 group-focus-visible/tooltip:opacity-100 dark:bg-neutral-100 dark:text-neutral-900">
                                        {client.name}
                                      </span>
                                    </span>
                                  ),
                                )}
                            </div>
                          ) : (
                            <div className="flex flex-wrap items-center gap-3 mx-1">
                              {role.clients.map((client, idx) =>
                                client.link ? (
                                  <a
                                    key={`${client.name}-${idx}`}
                                    href={client.link}
                                    className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:opacity-80"
                                  >
                                    {client.logo && (
                                      <img
                                        src={client.logo}
                                        alt={client.name}
                                        width={16}
                                        height={16}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-4 h-4 grayscale opacity-70"
                                      />
                                    )}
                                    <span>{client.name}</span>
                                  </a>
                                ) : (
                                  <span
                                    key={`${client.name}-${idx}`}
                                    className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                                  >
                                    {client.logo && (
                                      <img
                                        src={client.logo}
                                        alt={client.name}
                                        width={16}
                                        height={16}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-4 h-4 grayscale opacity-70"
                                      />
                                    )}
                                    <span>{client.name}</span>
                                  </span>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {role.ventures && role.ventures.length > 0 && (
                        <div className="mt-4">
                          <div className="text-sm font-normal leading-none text-gray-400 dark:text-gray-500 mb-2">
                            Active companies
                          </div>
                          <div className="flex flex-wrap items-center gap-3 mx-1">
                            {role.ventures.map((venture, idx) => (
                              <a
                                key={`${venture.name}-${idx}`}
                                href={venture.link}
                                className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:opacity-80"
                              >
                                {venture.logo && (
                                  <img
                                    src={venture.logo}
                                    alt={venture.name}
                                    width={16}
                                    height={16}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-4 h-4"
                                  />
                                )}
                                <span>{venture.name}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {role.technologies.length > 0 && (
                        <>
                          <div className="my-4 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                            Tech Stack
                          </div>

                          <div className="flex flex-wrap items-center my-2 mx-6 text-xl">
                            {role.technologies.map((tech, index) => (
                              <div
                                key={index}
                                className={`mr-4 mb-2 text-gray-500 dark:text-gray-400 hover:cursor-pointer hover:text-${technologies[tech].color} dark:hover:text-${technologies[tech].color}`}
                                title={tech}
                              >
                                <a href={technologies[tech].link}>
                                  {technologies[tech].icon}
                                </a>
                              </div>
                            ))}
                          </div>
                        </>
                      )}

                      {role.href && role.hook && (
                        <a
                          href={role.href}
                          className="my-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                          {role.hook}{" "}
                          <svg
                            className="w-3 h-3 ml-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </a>
                      )}
                    </Fragment>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
