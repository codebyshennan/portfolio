import technologies from "lib/technologies";

const timeline = [
  {
    date: 2023,
    logo: "https://media.licdn.com/dms/image/C4D0BAQHB7yhWovVDrw/company-logo_200_200/0/1653279952984?e=1692835200&v=beta&t=ORM9CWTDb6tSDses2RtROE2RMyyHOfLor7bFXk4DwSw",
    link: "https://www.partior.com/",
    company: "Partior",
    roles: [
      {
        position: "Snr DevSecOps Engineer",
        description: [
          "Partior is an open-industry, blockchain-powered exchange that enables banks to access real-time, cross-border, multi-currency payments, such as DVP and PVP, tokenized asset borrowing and lending, and support for CBDC initiatives.",
          "I implement the DevSecOps & CI/CD platform to provide cross-border payments through Quorum blockchain. I maintain a security testing cadence (SAST, DAST, SCA and pentests) and integrate compliance and security pipelines.",
        ],
        technologies: [
          "kubernetes",
          "docker",
          "vault",
          "terraform",
          "ansible",
          "consul",
        ],

        href: "#",
        link: "Learn more",
      },
    ],
  },
  {
    date: 2022,
    logo: "https://media.licdn.com/dms/image/C510BAQE66pFvLAVb9g/company-logo_200_200/0/1562664339084?e=1692835200&v=beta&t=YLC-xJusUaLmv3lC8yuapqHyqNPm9dK4oXaHAW2l1Hs",
    link: "https://www.circles.life/",
    company: "Circles.Life (CXOS)",
    roles: [
      {
        position: "Snr Software Engineer",
        description: [
          "Managed a portfolio of three software products and implemented formalized engineering practices. Led a team of five engineers and focused on their training and development.",
          "Fostered close collaboration between engineering, product, and design teams to ensure seamless coordination and efficient project execution.",
          "Implemented an in-house Customer Data Platform that facilitated real-time, hyper-personalized customer experiences through segmented omni-channel communication.",
          "Developed an API Sandbox, providing engineers with a testing environment for mock APIs. Included customizable responses and a proxy gateway for accelerated prototyping and RPC testing via Diameter Protocol with a partner telco.",
          "Created a Telco Demo Platform, featuring a module-federated Circles-X launch platform. Incorporated role-based access control to streamline onboarding for potential customers and pre-sales consultants, reducing the process from days to minutes.",
        ],
        technologies: [
          "golang",
          "airflow",
          "snowflake",
          "aws",
          "reactNative",
          "auth0",
          "pwa",
          // "DDD",
          // "Diameter Protocol (Gx, Gy)",
        ],
      },
      {
        position: "Software Engineer",
        description: [
          "Circles.Life is a mobile virtual network operator disrupting the global telecommunications industry.",
          "Built a full-stack web application for Jetpac's Roaming ESim and Pokemon Campaign, focusing on frontend development and mobile integration.",
          "Led engineering efforts for a B2B2C E-commerce Platform, simplifying corporate telco plan management and handling multiple corporate accounts.",
          "Developed automation tools for improving CI workflow, testing, type coverage, and observability. Also worked on DevSecOps pipeline and MLOps workflows for credit scoring and customer segmentation models.",
        ],
        technologies: [
          "react",
          "nextjs",
          "supabase",
          "awsAmplify",
          "express",
          "jest",
          "cypress",
          "storybook",
          "snowflake",
          "airflow",
          "kubernetes",
          "docker",
        ],
        href: null,
        link: null,
      },
    ],
  },
  {
    date: 2021,
    logo: "https://media.licdn.com/dms/image/C560BAQEuyCzPQOPMuQ/company-logo_200_200/0/1610947719563?e=1692835200&v=beta&t=4zkxs7SQ8YAiHOeGhJJ1nmoqBNbnGYASZW-9JCTljiQ",
    link: "https://www.rocketacademy.co/",
    company: "Rocket Academy",
    roles: [
      {
        position: "Software Engineering Instructor",
        description: [
          "Partior is an open-industry, blockchain-powered exchange that enables banks to access real-time, cross-border, multi-currency payments, such as DVP and PVP, tokenized asset borrowing and lending, and support for CBDC initiatives.",
          "I implement the DevSecOps & CI/CD platform to provide cross-border payments through Quorum blockchain. I maintain a security testing cadence (SAST, DAST, SCA and pentests) and integrate compliance and security pipelines.",
        ],
        technologies: ["mongodb", "express", "react", "nodejs", "typescript"],

        href: "#",
        link: "Learn more",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif">About Me</h1>
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
                {item.company}
                {index === 0 && (
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">
                    Current
                  </span>
                )}
              </h3>
              {item.roles && (
                <ul className="ml-6">
                  {item.roles.map((role, index) => (
                    <>
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

                      {role.href && role.link && (
                        <a
                          href={role.href}
                          className="my-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        >
                          Learn more{" "}
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
                    </>
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
