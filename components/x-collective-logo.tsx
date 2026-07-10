export default function XCollectiveLogo() {
  return (
    <div className="flex flex-col gap-2" aria-label="x-collective">
      <img
        src="/brand/logo.svg"
        alt="x-collective"
        width={220}
        height={55}
        className="h-auto w-[220px] max-w-full"
      />
      <p className="text-xs uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
        Operating studio
      </p>
    </div>
  );
}
