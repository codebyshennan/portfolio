"use client";

import { useState } from "react";

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

export type ViewMode = "list" | "grid";

export default function ViewToggle({
  view,
  onViewChange,
}: {
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}) {
  return (
    <div className="flex items-center gap-1 border border-neutral-200 dark:border-neutral-700 rounded-md p-0.5">
      <button
        onClick={() => onViewChange("list")}
        className={`p-1.5 rounded transition-colors ${
          view === "list"
            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
        }`}
        aria-label="List view"
      >
        <ListIcon />
      </button>
      <button
        onClick={() => onViewChange("grid")}
        className={`p-1.5 rounded transition-colors ${
          view === "grid"
            ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            : "text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
        }`}
        aria-label="Grid view"
      >
        <GridIcon />
      </button>
    </div>
  );
}
