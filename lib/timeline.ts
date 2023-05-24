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
    date: "2023",
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

        href: null,
        hook: null,
      },
    ],
  },
  {
    date: "2022",
    logo: "https://media.licdn.com/dms/image/C510BAQE66pFvLAVb9g/company-logo_200_200/0/1562664339084?e=1692835200&v=beta&t=YLC-xJusUaLmv3lC8yuapqHyqNPm9dK4oXaHAW2l1Hs",
    link: "https://www.circles.life/",
    company: "Circles.Life",
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
        href: "https://circles-x.com/products",
        hook: "About Circles-X",
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
        href: "https://labs.circleslife.co/",
        hook: "About Labs",
      },
    ],
  },
  {
    date: "2021",
    logo: "https://media.licdn.com/dms/image/C560BAQEuyCzPQOPMuQ/company-logo_200_200/0/1610947719563?e=1692835200&v=beta&t=4zkxs7SQ8YAiHOeGhJJ1nmoqBNbnGYASZW-9JCTljiQ",
    link: "https://www.rocketacademy.co/",
    company: "Rocket Academy",
    roles: [
      {
        position: "Software Engineering Instructor",
        description: [
          "Rocket Academy is the premier software engineering bootcamp in Singapore.",
          "After honing my chops at their bootcamp, I transferred my knowledge to over 100 students in areas of programmatic thinking, data structures and algorithms. Even a few students landed jobs after the six-week course!",
        ],
        technologies: ["mongodb", "express", "react", "nodejs", "typescript"],

        href: "https://www.rocketacademy.co/courses/coding-course",
        hook: "Learn more",
      },
    ],
  },
  {
    date: "2016 - 2021",
    logo: "https://media.licdn.com/dms/image/C560BAQEqaycg6_-zMQ/company-logo_200_200/0/1679987387274?e=1692835200&v=beta&t=r-DuVn1LXbj6eGPOad6Y8gghI8eNzp80vj9mBAsirJM",
    link: "https://www.mindef.gov.sg/oms/arc/",
    company: "MINDEF / SAF",
    roles: [
      {
        position: "Military Officer",
        description: ["I blew things up and then had to clean up the mess."],
        technologies: ["tank"],
        href: null,
        hook: null,
      },
    ],
  },
];

export default timeline;
