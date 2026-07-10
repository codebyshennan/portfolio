type SiteFaviconProps = {
  domain: string;
  name: string;
  src?: string;
  className?: string;
  grayscale?: boolean;
};

export default function SiteFavicon({
  name,
  className = "",
  grayscale = true,
}: SiteFaviconProps) {
  const initial = name.trim().charAt(0).toLowerCase();

  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-current text-[9px] font-semibold leading-none transition-opacity group-hover:opacity-100 ${
        grayscale ? "grayscale opacity-70" : "opacity-100"
      } ${className}`}
    >
      {initial}
    </span>
  );
}
