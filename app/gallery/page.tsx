import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Gallery of my work and projects.",
};

export const revalidate = 86400; // Revalidate once per day (static page)

export default function GalleryPage() {
  return (
    <section>
      <h1>Gallery</h1>
    </section>
  );
}
