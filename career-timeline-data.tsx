import { Fragment } from 'react';
import {
  TbBrandCypress,
  TbBrandGolang,
  TbBrandNextjs,
  TbBrandReactNative,
  TbBrandStorybook,
  TbBrandSupabase,
  TbBrandTypescript,
} from 'react-icons/tb';
import { GiBattleTank } from 'react-icons/gi';
import {
  SiAnsible,
  SiApacheairflow,
  SiAuth0,
  SiAwsamplify,
  SiConsul,
  SiDocker,
  SiExpress,
  SiJest,
  SiKubernetes,
  SiPwa,
  SiSnowflake,
  SiTerraform,
  SiVault,
} from 'react-icons/si';
import { FaAws, FaPython, FaReact } from 'react-icons/fa';

const technologies = {
  mongodb: {
    icon: <SiSnowflake />,
    link: 'https://www.mongodb.com/',
    color: 'green-500',
  },
  nodejs: {
    icon: <SiSnowflake />,
    link: 'https://nodejs.org/en/',
    color: 'green-500',
  },
  python: {
    icon: <FaPython />,
    link: 'https://www.python.org/',
    color: 'blue-500',
  },
  react: {
    icon: <FaReact />,
    link: 'https://reactjs.org/',
    color: 'blue-500',
  },
  nextjs: {
    icon: <TbBrandNextjs />,
    link: 'https://nextjs.org/',
    color: 'gray-300',
  },
  reactNative: {
    icon: <TbBrandReactNative />,
    link: 'https://reactnative.dev/',
    color: 'blue-500',
  },
  typescript: {
    icon: <TbBrandTypescript />,
    link: 'https://www.typescriptlang.org/',
    color: 'blue-500',
  },
  golang: {
    icon: <TbBrandGolang />,
    link: 'https://golang.org/',
    color: 'blue-500',
  },
  cypress: {
    icon: <TbBrandCypress />,
    link: 'https://www.cypress.io/',
    color: 'green-500',
  },
  storybook: {
    icon: <TbBrandStorybook />,
    link: 'https://storybook.js.org/',
    color: 'pink-500',
  },
  supabase: {
    icon: <TbBrandSupabase />,
    link: 'https://supabase.io/',
    color: 'blue-500',
  },
  jest: {
    icon: <SiJest />,
    link: 'https://jestjs.io/',
    color: 'green-500',
  },
  express: {
    icon: <SiExpress />,
    link: 'https://expressjs.com/',
    color: 'blue-300',
  },
  pwa: {
    icon: <SiPwa />,
    link: 'https://web.dev/progressive-web-apps/',
    color: 'purple-500',
  },
  aws: {
    icon: <FaAws />,
    link: 'https://aws.amazon.com/',
    color: 'yellow-500',
  },
  awsAmplify: {
    icon: <SiAwsamplify />,
    link: 'https://aws.amazon.com/amplify/',
    color: 'yellow-500',
  },
  auth0: {
    icon: <SiAuth0 />,
    link: 'https://auth0.com/',
    color: 'gray-300',
  },
  airflow: {
    icon: <SiApacheairflow />,
    link: 'https://airflow.apache.org/',
    color: 'blue-500',
  },
  snowflake: {
    icon: <SiSnowflake />,
    link: 'https://www.snowflake.com/',
    color: 'blue-500',
  },
  kubernetes: {
    icon: <SiKubernetes />,
    link: 'https://kubernetes.io/',
    color: 'blue-500',
  },
  docker: {
    icon: <SiDocker />,
    link: 'https://www.docker.com/',
    color: 'blue-500',
  },
  vault: {
    icon: <SiVault />,
    link: 'https://www.vaultproject.io/',
    color: 'yellow-500',
  },
  terraform: {
    icon: <SiTerraform />,
    link: 'https://www.terraform.io/',
    color: 'purple-500',
  },
  ansible: {
    icon: <SiAnsible />,
    link: 'https://www.ansible.com/',
    color: 'gray-300',
  },
  consul: {
    icon: <SiConsul />,
    link: 'https://www.consul.io/',
    color: 'blue-500',
  },
  tank: {
    icon: <GiBattleTank />,
    link: null,
    color: 'gray-300',
  },
};

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
                          {role.hook}{' '}
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

interface Timeline {
  date: string;
  logo: string;
  link: string;
  company: string;
  roles: Role[];
}

interface Role {
  position: string;
  description: string[];
  technologies: string[];
  href: string | null;
  hook: string | null;
}

const timeline: Timeline[] = [
  {
    date: '2024',
    company: 'Iterative Capital',
    logo: 'https://media.licdn.com/dms/image/C510BAQE8kVcekG6NdA/company-logo_100_100/0/1630588508797/iterative_capital_logo?e=1730332800&v=beta&t=m6YSpnXh4njUDe6sXwqp0fzW0NI4SHR2NWrtyVXDWes',
    link: 'https://iterative.vc/',
    roles: [
      {
        position: 'Software Engineer, Investments',
        description: [
          'Iterative Capital is an early stage, generalist venture capital firm, providing full investment amount upfront. Iterative supports startups with an investment of USD150k to USD500k, and provide close founder mentorship, guidance and support thoroughout their startup journey.',
          'I help the investments team make better investment decisions faster, through hyperautomation, tech due diligence checks and R&D on latest innovations in different spaces.',
        ],
        technologies: ['python', 'nextjs', 'supabase'],
        href: null,
        hook: null,
      },
    ],
  },
  {
    date: '2023',
    logo: 'https://media.licdn.com/dms/image/D560BAQHtFUwwHh4sjw/company-logo_200_200/0/1713257813025/partior_logo?e=1730332800&v=beta&t=RVDT8hsTJAnzuYZG1yw1PfBesr4JZFuEwen-swk_p8c',
    link: 'https://www.partior.com/',
    company: 'Partior',
    roles: [
      {
        position: 'Snr DevSecOps Engineer',
        description: [
          'Partior is an open-industry, blockchain-powered exchange that enables banks to access real-time, cross-border, multi-currency payments, such as DVP and PVP, tokenized asset borrowing and lending, and support for CBDC initiatives.',
          'I implement the DevSecOps & CI/CD platform to provide cross-border payments through Quorum blockchain. I maintain a security testing cadence (SAST, DAST, SCA and pentests) and integrate compliance and security pipelines.',
        ],
        technologies: [
          'kubernetes',
          'docker',
          'vault',
          'terraform',
          'ansible',
          'consul',
        ],

        href: null,
        hook: null,
      },
    ],
  },
  {
    date: '2022',
    logo: 'https://media.licdn.com/dms/image/D560BAQF-umRQNeNuyA/company-logo_200_200/0/1719257627163/circles1_logo?e=1730332800&v=beta&t=DrB-CJH1L2Y16K2hlGD_3y6FfN7RheGHumslWuZgZlQ',
    link: 'https://www.circles.life/',
    company: 'Circles.Life',
    roles: [
      {
        position: 'Snr Software Engineer',
        description: [
          'Managed a portfolio of three software products and implemented formalized engineering practices. Led a team of five engineers and focused on their training and development.',
          'Fostered close collaboration between engineering, product, and design teams to ensure seamless coordination and efficient project execution.',
          'Implemented an in-house Customer Data Platform that facilitated real-time, hyper-personalized customer experiences through segmented omni-channel communication.',
          'Developed an API Sandbox, providing engineers with a testing environment for mock APIs. Included customizable responses and a proxy gateway for accelerated prototyping and RPC testing via Diameter Protocol with a partner telco.',
          'Created a Telco Demo Platform, featuring a module-federated Circles-X launch platform. Incorporated role-based access control to streamline onboarding for potential customers and pre-sales consultants, reducing the process from days to minutes.',
        ],
        technologies: [
          'golang',
          'airflow',
          'snowflake',
          'aws',
          'reactNative',
          'auth0',
          'pwa',
          // "DDD",
          // "Diameter Protocol (Gx, Gy)",
        ],
        href: 'https://circles-x.com/products',
        hook: 'About Circles-X',
      },
      {
        position: 'Software Engineer',
        description: [
          'Circles.Life is a mobile virtual network operator disrupting the global telecommunications industry.',
          "Built a full-stack web application for Jetpac's Roaming ESim and Pokemon Campaign, focusing on frontend development and mobile integration.",
          'Led engineering efforts for a B2B2C E-commerce Platform, simplifying corporate telco plan management and handling multiple corporate accounts.',
          'Developed automation tools for improving CI workflow, testing, type coverage, and observability. Also worked on DevSecOps pipeline and MLOps workflows for credit scoring and customer segmentation models.',
        ],
        technologies: [
          'react',
          'nextjs',
          'supabase',
          'awsAmplify',
          'express',
          'jest',
          'cypress',
          'storybook',
          'snowflake',
          'airflow',
          'kubernetes',
          'docker',
        ],
        href: 'https://labs.circleslife.co/',
        hook: 'About Labs',
      },
    ],
  },
  {
    date: '2021',
    logo: 'https://media.licdn.com/dms/image/C560BAQEuyCzPQOPMuQ/company-logo_200_200/0/1630649652804/rocketacademyco_logo?e=1730332800&v=beta&t=uKeI_VVCqSdoK9R71TVX2bB3zl_Dr2rnurNDRdRK-zA',
    link: 'https://www.rocketacademy.co/',
    company: 'Rocket Academy',
    roles: [
      {
        position: 'Software Engineering Instructor',
        description: [
          'Rocket Academy is the premier software engineering bootcamp in Singapore.',
          'After honing my chops at their bootcamp, I transferred my knowledge to over 100 students in areas of programmatic thinking, data structures and algorithms. Even a few students landed jobs after the six-week course!',
        ],
        technologies: ['mongodb', 'express', 'react', 'nodejs', 'typescript'],

        href: 'https://www.rocketacademy.co/courses/coding-course',
        hook: 'Learn more',
      },
    ],
  },
  {
    date: '2016 - 2021',
    logo: 'https://media.licdn.com/dms/image/C510BAQGDgtEeUUSbDg/company-logo_100_100/0/1630631104566/ministry_of_defence_singapore_logo?e=1730332800&v=beta&t=C6oJKrsTLQgNrbBH0b_n1Lm2dimjtc9ymRV-LyUaHXk',
    link: 'https://www.mindef.gov.sg/oms/arc/',
    company: 'MINDEF / SAF',
    roles: [
      {
        position: 'Military Officer',
        description: ['I blew things up and then had to clean up the mess.'],
        technologies: ['tank'],
        href: null,
        hook: null,
      },
    ],
  },
];
