import {
  TbBrandCypress,
  TbBrandGolang,
  TbBrandNextjs,
  TbBrandReactNative,
  TbBrandStorybook,
  TbBrandSupabase,
  TbBrandTypescript,
} from "react-icons/tb";
import { GiBattleTank } from "react-icons/gi";
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
} from "react-icons/si";
import { FaAws, FaPython, FaReact } from "react-icons/fa";

const technologies = {
  mongodb: {
    icon: <SiSnowflake />,
    link: "https://www.mongodb.com/",
    color: "green-500",
  },
  nodejs: {
    icon: <SiSnowflake />,
    link: "https://nodejs.org/en/",
    color: "green-500",
  },
  python: {
    icon: <FaPython />,
    link: "https://www.python.org/",
    color: "blue-500",
  },
  react: {
    icon: <FaReact />,
    link: "https://reactjs.org/",
    color: "blue-500",
  },
  nextjs: {
    icon: <TbBrandNextjs />,
    link: "https://nextjs.org/",
    color: "gray-300",
  },
  reactNative: {
    icon: <TbBrandReactNative />,
    link: "https://reactnative.dev/",
    color: "blue-500",
  },
  typescript: {
    icon: <TbBrandTypescript />,
    link: "https://www.typescriptlang.org/",
    color: "blue-500",
  },
  golang: {
    icon: <TbBrandGolang />,
    link: "https://golang.org/",
    color: "blue-500",
  },
  cypress: {
    icon: <TbBrandCypress />,
    link: "https://www.cypress.io/",
    color: "green-500",
  },
  storybook: {
    icon: <TbBrandStorybook />,
    link: "https://storybook.js.org/",
    color: "pink-500",
  },
  supabase: {
    icon: <TbBrandSupabase />,
    link: "https://supabase.io/",
    color: "blue-500",
  },
  jest: {
    icon: <SiJest />,
    link: "https://jestjs.io/",
    color: "green-500",
  },
  express: {
    icon: <SiExpress />,
    link: "https://expressjs.com/",
    color: "blue-300",
  },
  pwa: {
    icon: <SiPwa />,
    link: "https://web.dev/progressive-web-apps/",
    color: "purple-500",
  },
  aws: {
    icon: <FaAws />,
    link: "https://aws.amazon.com/",
    color: "yellow-500",
  },
  awsAmplify: {
    icon: <SiAwsamplify />,
    link: "https://aws.amazon.com/amplify/",
    color: "yellow-500",
  },
  auth0: {
    icon: <SiAuth0 />,
    link: "https://auth0.com/",
    color: "gray-300",
  },
  airflow: {
    icon: <SiApacheairflow />,
    link: "https://airflow.apache.org/",
    color: "blue-500",
  },
  snowflake: {
    icon: <SiSnowflake />,
    link: "https://www.snowflake.com/",
    color: "blue-500",
  },
  kubernetes: {
    icon: <SiKubernetes />,
    link: "https://kubernetes.io/",
    color: "blue-500",
  },
  docker: {
    icon: <SiDocker />,
    link: "https://www.docker.com/",
    color: "blue-500",
  },
  vault: {
    icon: <SiVault />,
    link: "https://www.vaultproject.io/",
    color: "yellow-500",
  },
  terraform: {
    icon: <SiTerraform />,
    link: "https://www.terraform.io/",
    color: "purple-500",
  },
  ansible: {
    icon: <SiAnsible />,
    link: "https://www.ansible.com/",
    color: "gray-300",
  },
  consul: {
    icon: <SiConsul />,
    link: "https://www.consul.io/",
    color: "blue-500",
  },
  tank: {
    icon: <GiBattleTank />,
    link: null,
    color: "gray-300",
  },
};

export default technologies;
