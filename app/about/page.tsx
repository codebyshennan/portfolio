import technologies from "lib/technologies";
import timeline from "lib/timeline";
import { Fragment } from "react";

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-5">About Me</h1>
      <p className="text-neutral-400 text-base -mt-1 mb-3">
        I'm a software engineer with a passion for building products and
        learning new things.
      </p>
      <div className="my-5 text-neutral-800 dark:text-neutral-200">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          {timeline.map((item, index) => (
            <li key={index} className="ml-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                {item.date}
              </time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                <img src={item.logo} className="w-4 h-4 mr-2 inline-block" />
                <a href={item.link}>{item.company}</a>
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

                      <div className="my-4 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        Tech Stack
                      </div>

                      <div className="flex flex-wrap items-center my-2 mx-6">
                        {role.technologies.map((tech, index) => (
                          <div
                            key={index}
                            className={`mr-4 mb-2 hover:cursor-pointer hover:text-${technologies[tech].color} dark:hover:text-${technologies[tech].color}`}
                          >
                            <a href={technologies[tech].link}>
                              {technologies[tech].icon}
                            </a>
                          </div>
                        ))}
                      </div>

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
