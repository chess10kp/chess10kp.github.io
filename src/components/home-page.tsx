"use client";
import type { CSSProperties } from "react";
import { PathnameProvider } from "./pathname-provider";
import Header from "./header";
import Footer from "./footer";
import Hero from "./hero";
import Projects from "./projects";
import { Experience } from "./experience";
import LatestBlogPosts from "./latest-blog-posts";
import type { Post } from "./latest-blog-posts";

interface HomePageProps {
  currentPath: string;
  introText: string;
  experiences: {
    position: string;
    employer: string;
    timeline: string;
    description: string;
    tech: string[];
  }[];
  projects: {
    name: string;
    description: string;
    stack: string[];
    href: string;
    demo: string;
    blogId: string;
  }[];
  posts: Post[];
}

/**
 * Portal layout — a horizontal strip of fixed-width columns (à la kitlangton.com).
 *
 *   mobile  (<sm): columns stack vertically, the portal scrolls vertically
 *   desktop (sm+): columns sit side-by-side, the portal scrolls horizontally,
 *                  each column scrolls vertically within the viewport.
 *
 * The portal is pinned between the fixed Header and Footer bars via
 * `--header-h` / `--footer-h`. Column width is `--col-width` (32rem).
 * Colors and fonts are untouched — this is layout only.
 */
export function HomePage({ currentPath, introText, experiences, projects, posts }: HomePageProps) {
  return (
    <PathnameProvider path={currentPath}>
      <Header />
      <main
        className="
          flex flex-col sm:flex-row
          fixed top-[var(--header-h)] bottom-[var(--footer-h)] left-0 right-0
          overflow-y-auto sm:overflow-y-hidden sm:overflow-x-auto
        "
        style={{ "--col-width": "32rem" } as CSSProperties}
      >
        {/* Column 1 — Hero */}
        <section
          className="
            portal-column flex-shrink-0 w-full sm:w-[var(--col-width)] h-auto sm:h-full
            overflow-y-auto sm:border-r border-border
          "
        >
          <div className="portal-column-inner px-6 py-8 sm:p-12">
            <Hero introText={introText} />
          </div>
        </section>

        {/* Column 2 — Experience */}
        <section
          className="
            portal-column flex-shrink-0 w-full sm:w-[var(--col-width)] h-auto sm:h-full
            overflow-y-auto sm:border-r border-border
          "
          aria-labelledby="experience-heading"
        >
          <div className="portal-column-inner px-6 py-8 sm:p-12">
            <Experience experiences={experiences} />
          </div>
        </section>

        {/* Column 3 — Projects */}
        <section
          className="
            portal-column flex-shrink-0 w-full sm:w-[var(--col-width)] h-auto sm:h-full
            overflow-y-auto sm:border-r border-border
          "
          aria-labelledby="projects-heading"
        >
          <div className="portal-column-inner px-6 py-8 sm:p-12">
            <Projects projects={projects} availableBlogPosts={posts.map((post) => post.id)} />
          </div>
        </section>

        {/* Column 4 — Latest Posts */}
        <section
          className="
            portal-column flex-shrink-0 w-full sm:w-[var(--col-width)] h-auto sm:h-full
            overflow-y-auto
          "
        >
          <div className="portal-column-inner px-6 py-8 sm:p-12">
            <LatestBlogPosts posts={posts} />
          </div>
        </section>
      </main>
      <Footer currentPath={currentPath} />
    </PathnameProvider>
  );
}
