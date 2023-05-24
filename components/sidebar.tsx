"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import {
  faHome,
  faUser,
  faDashboard,
  faBullhorn,
  faScrewdriverWrench,
  faFolder,
  faBlog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "usehooks-ts";

const navItems = {
  "/": {
    name: "home",
    icon: faHome,
  },
  "/about": {
    name: "about",
    icon: faUser,
  },
  "/blog": {
    name: "blog",
    icon: faBlog,
  },
  "/projects": {
    name: "projects",
    icon: faFolder,
  },
  "/dashboard": {
    name: "dashboard",
    icon: faDashboard,
  },
  "/tools": {
    name: "tools",
    icon: faScrewdriverWrench,
  },
  "/guestbook": {
    name: "guestbook",
    icon: faBullhorn,
  },
};

function Logo() {
  return (
    <Link aria-label="Shen Nan, Wong" href="/">
      <motion.svg
        className="text-black dark:text-white h-[25px] md:h-[37px]"
        width="25"
        height="37"
        viewBox="0 0 232 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{
            opacity: 0,
            pathLength: 0,
          }}
          animate={{
            opacity: 1,
            pathLength: 1,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          d="M39 316V0"
          stroke="currentColor"
          strokeWidth={78}
        />
        <motion.path
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          d="M232 314.998H129.852L232 232.887V314.998Z"
          fill="currentColor"
        />
      </motion.svg>
    </Link>
  );
}

export default function Navbar() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }
  const matchMd = useMediaQuery("(min-width: 768px)");

  return (
    <aside className="md:w-[150px] bg-white dark:bg-[#111010] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0 font-serif sticky top-0 z-50">
      <div className="lg:sticky lg:top-20">
        <div className="mt-16 ml-2 md:ml-[12px] mb-2 px-4 md:px-0 md:mb-8 space-y-10 flex flex-col md:flex-row items-start ">
          <Logo />
        </div>
        <LayoutGroup>
          <nav
            className="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-0 fade md:overflow-auto scroll-pr-6 "
            id="nav"
          >
            <div className="flex flex-row md:flex-col space-x-0 pr-10 mb-2 mt-2 md:mt-0">
              {Object.entries(navItems).map(([path, { name, icon }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={clsx(
                      "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle",
                      {
                        "text-neutral-500": !isActive,
                        "font-bold": isActive,
                      }
                    )}
                  >
                    <span className="relative py-[5px] px-[10px]">
                      {matchMd ? name : <FontAwesomeIcon icon={icon} />}
                      {path === pathname ? (
                        <motion.div
                          className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-md z-[-1]"
                          layoutId="sidebar"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
}
