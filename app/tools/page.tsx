import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Here's what tech I'm currently using for coding, work and surfing the web.",
};

export default function UsesPage() {
  return (
    <section>
      <h1 className="font-bold text-3xl font-serif mb-8">Uses</h1>
      <p className="text-neutral-400 dark:text-neutral-300 mt-2 mb-8">
        Here's what tech I'm currently using for coding, work and surfing the
        web.
      </p>
      <div className="prose prose-neutral dark:prose-invert">
        <h3 id="computer-office">Computer / Office</h3>
        <ul>
          <li>14&quot; Macbook Pro (2021)</li>
          <li>27&quot; Prism PG270</li>
          <li>Logitech MX Master 3 Mouse</li>
          <li>Keychron k6</li>
          <li>OmniDesk Essential</li>
          <li>Ergotune Supreme V2</li>
        </ul>
        <h3 id="coding">Coding</h3>
        <ul>
          <li>
            Editor: VSCode (
            <a href="https://gist.github.com/leerob/e7883ab35d900b8cbb684ac77e7c4703">
              Settings / Extensions
            </a>
            )
          </li>
          <li>Theme: Theme Flat</li>
          <li>Terminal: warp / oh-my-zsh</li>
        </ul>
        <h3 id="software">Software</h3>
        <ul>
          <li>1Password</li>
          <li>Lens</li>
          <li>SetApp</li>
          <li>Arc / Sidekick</li>
          <li>Raycast</li>
        </ul>
        <h3 id="other-tech">Other Tech</h3>
        <ul>
          <li>Garmin Fenix 5 Sapphire</li>
          <li>Google Pixel 7 Pro</li>
        </ul>
      </div>
    </section>
  );
}
