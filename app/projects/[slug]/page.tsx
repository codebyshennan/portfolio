import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPublished, getSinglePostBySlug } from "lib/content";
import PostDetail from "components/posts/details";
import JsonLd from "components/json-ld";

export function generateStaticParams() {
  return getAllPublished()
    .filter((post) => post.category === "Project")
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = getSinglePostBySlug(slug);
  if (!post) return;

  const { title, description, keywords } = post.metadata;
  const ogImage = `https://byshennan.com/api/og?type=project&slug=${slug}&title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: `https://byshennan.com/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.metadata.publishedAt,
      url: `https://byshennan.com/projects/${slug}`,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const post = getSinglePostBySlug(slug);

  if (!post) {
    notFound();
  }

  const softwareSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: post.metadata.title,
    description: post.metadata.description,
    author: {
      "@type": "Person",
      name: "Shen Nan Wong",
      url: "https://byshennan.com",
    },
  };

  const projectUrl = post.metadata.website || post.metadata.github;
  if (projectUrl) {
    softwareSchema.url = projectUrl;
  }

  return (
    <section>
      <JsonLd data={softwareSchema} />
      <PostDetail post={post} slug={slug} />
    </section>
  );
}
