const technologies = {
  mongodb: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[1em] h-[1em]">
        <path d="M13 2c0 0-1 1.5-1 4s1 5 1 8c0 2-.5 4-.5 6h-1c0-2-.5-4-.5-6 0-3 1-5.5 1-8s-1-4-1-4h1z" />
        <path d="M12 2C9 5 7 8 7 12c0 3 1.5 5.5 3.5 7.5l.5.5h2l.5-.5c2-2 3.5-4.5 3.5-7.5 0-4-2-7-5-10z" opacity="0.3" />
      </svg>
    ),
    link: "https://www.mongodb.com/",
    color: "green-500",
  },
  postgresql: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[1em] h-[1em]">
        <ellipse cx="12" cy="7" rx="7" ry="4" />
        <path d="M5 7v5c0 2.2 3.1 4 7 4s7-1.8 7-4V7" />
        <path d="M5 12v5c0 2.2 3.1 4 7 4s7-1.8 7-4v-5" />
      </svg>
    ),
    link: "https://www.postgresql.org/",
    color: "blue-600",
  },
  bigquery: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[1em] h-[1em]">
        <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" />
        <circle cx="11" cy="11" r="4" />
        <path d="M14 14l3 3" />
      </svg>
    ),
    link: "https://cloud.google.com/bigquery",
    color: "blue-500",
  },
  nodejs: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[1em] h-[1em]">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8v8M8 12h4v4M16 8v4h-4" />
      </svg>
    ),
    link: "https://nodejs.org/en/",
    color: "green-500",
  },
  python: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M12 2c-2 0-4 .5-4 2.5V7h4v1H6.5C4.5 8 3 9.5 3 12s1.5 4 3.5 4H8v-2.5C8 11.5 9.5 10 12 10h4c1.5 0 2.5-1 2.5-2.5v-3C18.5 2.5 16.5 2 14 2h-2z" />
        <path d="M12 22c2 0 4-.5 4-2.5V17h-4v-1h5.5c2 0 3.5-1.5 3.5-4s-1.5-4-3.5-4H16v2.5c0 2-1.5 3.5-4 3.5h-4c-1.5 0-2.5 1-2.5 2.5v3c0 2 2 2.5 4.5 2.5h2z" />
        <circle cx="9.5" cy="5.5" r="0.8" fill="currentColor" />
        <circle cx="14.5" cy="18.5" r="0.8" fill="currentColor" />
      </svg>
    ),
    link: "https://www.python.org/",
    color: "blue-500",
  },
  react: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-[1em] h-[1em]">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
    link: "https://reactjs.org/",
    color: "blue-500",
  },
  openai: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[1em] h-[1em]">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="8" r="1.5" fill="currentColor" />
        <circle cx="8" cy="14" r="1.5" fill="currentColor" />
        <circle cx="16" cy="14" r="1.5" fill="currentColor" />
        <path d="M12 9.5v2.5l-3.5 2M12 12l3.5 2" />
      </svg>
    ),
    link: "https://openai.com/",
    color: "emerald-500",
  },
  nextjs: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        <path d="M8 8v8M8 8l8 10" />
        <path d="M16 8v4" />
      </svg>
    ),
    link: "https://nextjs.org/",
    color: "gray-300",
  },
  reactNative: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-[1em] h-[1em]">
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        <rect x="9" y="4" width="6" height="10" rx="1" strokeWidth={0.8} opacity="0.4" />
      </svg>
    ),
    link: "https://reactnative.dev/",
    color: "blue-500",
  },
  typescript: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-[1em] h-[1em]">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10h5M9.5 10v7" strokeWidth={2} />
        <path d="M17 10c-1.5 0-3 .5-3 2s1 1.8 3 2.2 3 .7 3 2.3-1.5 2-3 2" strokeWidth={1.5} />
      </svg>
    ),
    link: "https://www.typescriptlang.org/",
    color: "blue-500",
  },
  golang: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M17 7c-3 0-5 2-5 5s2 5 5 5" />
        <path d="M7 7v10M3 7h8" />
      </svg>
    ),
    link: "https://golang.org/",
    color: "blue-500",
  },
  cypress: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="w-[1em] h-[1em]">
        <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
        <path d="M17 8c-1.5-1.5-3.5-2-5.5-1.5S7.5 9 7.5 12s1.5 4.5 3.5 5 4-0 5.5-1.5" />
      </svg>
    ),
    link: "https://www.cypress.io/",
    color: "green-500",
  },
  storybook: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M4 4h10a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
        <path d="M16 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-2" />
        <path d="M7 8v8M10 8v8" />
      </svg>
    ),
    link: "https://storybook.js.org/",
    color: "pink-500",
  },
  supabase: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z" />
      </svg>
    ),
    link: "https://supabase.io/",
    color: "blue-500",
  },
  jest: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M14 4v8h-3v4c0 2-1.5 4-4 4" />
        <circle cx="12" cy="19" r="2.5" strokeWidth={1.5} />
      </svg>
    ),
    link: "https://jestjs.io/",
    color: "green-500",
  },
  express: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M5 7h8M5 12h6M5 17h8" />
        <path d="M17 7l3 5-3 5" />
      </svg>
    ),
    link: "https://expressjs.com/",
    color: "blue-300",
  },
  pwa: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <circle cx="12" cy="17" r="1.5" />
        <path d="M9 7h6M9 10h6" />
      </svg>
    ),
    link: "https://web.dev/progressive-web-apps/",
    color: "purple-500",
  },
  aws: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M3 15c1-2 3-4 6-4s4 2 4 4" />
        <path d="M10 13c1-1.5 2.5-3 5-3s4 1.5 5 3" />
        <path d="M3 15h18" />
      </svg>
    ),
    link: "https://aws.amazon.com/",
    color: "yellow-500",
  },
  awsAmplify: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M3 17L12 5l9 12" />
        <path d="M7 17l5-8 5 8" />
      </svg>
    ),
    link: "https://aws.amazon.com/amplify/",
    color: "yellow-500",
  },
  auth0: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M12 3L4 7v5c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V7l-8-4z" />
        <rect x="10" y="9" width="4" height="5" rx="1" />
        <circle cx="12" cy="8" r="1.5" />
      </svg>
    ),
    link: "https://auth0.com/",
    color: "gray-300",
  },
  airflow: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M2 12c3-4 6-4 9 0s6 4 9 0" />
        <path d="M2 8c3-4 6-4 9 0s6 4 9 0" />
        <path d="M2 16c3-4 6-4 9 0s6 4 9 0" />
      </svg>
    ),
    link: "https://airflow.apache.org/",
    color: "blue-500",
  },
  snowflake: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <path d="M12 2v20M2 12h20" />
        <path d="M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
        <path d="M12 2l-2 3M12 2l2 3M12 22l-2-3M12 22l2-3M2 12l3-2M2 12l3 2M22 12l-3-2M22 12l-3 2" />
      </svg>
    ),
    link: "https://www.snowflake.com/",
    color: "blue-500",
  },
  kubernetes: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.6 5.6l4.3 4.3M14.1 14.1l4.3 4.3M18.4 5.6l-4.3 4.3M9.9 14.1l-4.3 4.3" />
      </svg>
    ),
    link: "https://kubernetes.io/",
    color: "blue-500",
  },
  docker: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <rect x="1" y="11" width="22" height="8" rx="2" />
        <rect x="4" y="7" width="4" height="4" />
        <rect x="10" y="7" width="4" height="4" />
        <rect x="10" y="3" width="4" height="4" />
        <rect x="16" y="7" width="4" height="4" />
      </svg>
    ),
    link: "https://www.docker.com/",
    color: "blue-500",
  },
  vault: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <polygon points="12 2 22 8 22 16 12 22 2 16 2 8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 9v-1M12 16v-1" />
      </svg>
    ),
    link: "https://www.vaultproject.io/",
    color: "yellow-500",
  },
  terraform: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <rect x="9" y="2" width="6" height="6" />
        <rect x="9" y="10" width="6" height="6" />
        <rect x="2" y="6" width="6" height="6" />
        <rect x="16" y="6" width="6" height="6" />
      </svg>
    ),
    link: "https://www.terraform.io/",
    color: "purple-500",
  },
  ansible: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6l4 12M12 6L8 18M9 14h6" strokeWidth={2} />
      </svg>
    ),
    link: "https://www.ansible.com/",
    color: "gray-300",
  },
  consul: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="8" r="1" fill="currentColor" />
        <circle cx="19" cy="12" r="1" fill="currentColor" />
        <circle cx="18" cy="16" r="1" fill="currentColor" />
      </svg>
    ),
    link: "https://www.consul.io/",
    color: "blue-500",
  },
  tank: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <rect x="3" y="12" width="18" height="6" rx="3" />
        <rect x="6" y="8" width="10" height="4" rx="1" />
        <path d="M16 10h5" />
        <circle cx="6" cy="15" r="1.5" />
        <circle cx="12" cy="15" r="1.5" />
        <circle cx="18" cy="15" r="1.5" />
      </svg>
    ),
    link: null,
    color: "gray-300",
  },
  notion: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7v10M8 7l8 10M16 7v10" strokeWidth={2} />
      </svg>
    ),
    link: "https://notion.so/",
    color: "gray-300",
  },
  git: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <circle cx="12" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <circle cx="18" cy="12" r="2" />
        <path d="M12 8v8M12 8c2 0 4 1 6 4" />
      </svg>
    ),
    link: "https://git-scm.com/",
    color: "orange-500",
  },
  github: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[1em] h-[1em]">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    link: "https://github.com/",
    color: "gray-300",
  },
  sqlite: {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-[1em] h-[1em]">
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v12c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
        <path d="M5 12c0 1.66 3.13 3 7 3s7-1.34 7-3" />
      </svg>
    ),
    link: "https://www.sqlite.org/",
    color: "blue-400",
  },
};

export default technologies;
