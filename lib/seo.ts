// Set HIDE_VENTURES=true in the Vercel project env to strip the consultancy and
// product portfolio from this site's public surface: the Launching grid, the
// /collective page, the llms.txt manifest, SEO keywords, and the venture project
// pages (which also drop out of the sitemap).
//
// Deliberately NOT named SEO_HIDDEN, which is the flag the venture sites use to
// noindex themselves wholesale. byshennan.com stays indexed on purpose — a
// recruiter finding a clean portfolio beats one finding nothing at all. This flag
// only hides the ventures *within* an otherwise-visible site.
export const hideVentures = process.env.HIDE_VENTURES === "true";

// Content slugs that exist to promote a venture. Kept here so the sitemap, the
// project pages, and llms.txt all filter on one list rather than three copies.
export const ventureProjectSlugs = ["notionplus", "firstyearin", "whatsinmy"];
export const ventureBlogSlugs = ["builder-investor"];

const hiddenSlugs = new Set([...ventureProjectSlugs, ...ventureBlogSlugs]);

// Drops venture posts from any listing (index pages, RSS, llms.txt, sitemap)
// while HIDE_VENTURES is on. The pages themselves also carry a noindex — the
// listing filter alone would not deindex a URL Google already knows.
export function withoutHiddenVentures<T extends { slug: string }>(
  posts: T[]
): T[] {
  if (!hideVentures) return posts;
  return posts.filter((post) => !hiddenSlugs.has(post.slug));
}
