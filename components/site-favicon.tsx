type SiteFaviconProps = {
  domain: string;
  name: string;
  src?: string;
  className?: string;
  grayscale?: boolean;
};

export default function SiteFavicon({
  domain,
  name,
  src,
  className = "",
  grayscale = true,
}: SiteFaviconProps) {
  return (
    <img
      src={src ?? `https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`h-4 w-4 shrink-0 transition-opacity group-hover:opacity-100 ${
        grayscale ? "grayscale opacity-70" : "opacity-100"
      } ${className}`}
    />
  );
}
