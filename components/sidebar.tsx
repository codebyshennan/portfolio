"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M3 12l9-9 9 9" />
    <path d="M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21a8 8 0 10-16 0" />
  </svg>
);

const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);

const navItems = {
  "/": {
    name: "home",
    icon: <HomeIcon />,
  },
  "/about": {
    name: "about",
    icon: <UserIcon />,
  },
  "/blog": {
    name: "blog",
    icon: <BlogIcon />,
  },
  "/projects": {
    name: "projects",
    icon: <FolderIcon />,
  },
};

export default function Navbar() {
  let pathname = usePathname() || "/";
  if (pathname.includes("/blog/")) {
    pathname = "/blog";
  }

  return (
    <aside className="md:w-[180px] bg-white dark:bg-[#111010] md:flex-shrink-0 -mx-4 md:mx-0 md:px-0 font-serif sticky top-0 z-50 backdrop-blur-md bg-opacity-50 md:min-w-[180px]">
      <div className="lg:sticky lg:top-20">
        <div className="mt-8 ml-2 md:ml-[12px] mb-2 px-4 md:px-0 md:mb-8 space-y-10 flex flex-col md:flex-row items-start ">
          {/* <Logo /> */}
        </div>
        <nav
          className="flex flex-row md:flex-col items-start relative px-4 md:px-0 pb-4 fade md:overflow-auto scroll-pr-6"
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
                    "transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle md:w-full",
                    {
                      "text-neutral-500": !isActive,
                    }
                  )}
                >
                  <span className="relative py-[5px] px-[10px] w-full md:w-[140px] inline-block text-left">
                    {/* Icon on mobile */}
                    <span className="md:hidden flex items-center justify-center">
                      {icon}
                    </span>
                    {/* Text on desktop */}
                    <span className="hidden md:inline-block w-full relative">
                      {/* Always reserve space for bold version to prevent layout shift */}
                      <span className="font-bold invisible pointer-events-none block">
                        {name}
                      </span>
                      <span className={clsx("absolute inset-0 flex items-center", {
                        "font-bold": isActive,
                      })}>
                        {name}
                      </span>
                    </span>
                    {path === pathname ? (
                      <div
                        className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-md z-[-1] transition-all duration-300"
                      />
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
