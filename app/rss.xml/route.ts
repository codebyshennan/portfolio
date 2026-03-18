import { getAllPublished } from "lib/content";

export function GET() {
  const posts = getAllPublished().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const items = posts
    .map((post) => {
      const link =
        post.category === "Blog"
          ? `https://byshennan.com/blog/${post.slug}`
          : `https://byshennan.com/projects/${post.slug}`;
      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${link}</link>
      <guid>${link}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shen Nan, Wong</title>
    <link>https://byshennan.com</link>
    <description>Builder-investor based in SEA. Data infrastructure, AI systems, and venture.</description>
    <language>en-us</language>
    <atom:link href="https://byshennan.com/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
