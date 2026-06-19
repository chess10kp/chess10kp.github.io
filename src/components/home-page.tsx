"use client";
import { PathnameProvider } from "./pathname-provider";
import Header from "./header";
import Footer from "./footer";
import Hero from "./hero";
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
  posts: Post[];
}

export function HomePage({ currentPath, introText, experiences, posts }: HomePageProps) {
  return (
    <PathnameProvider path={currentPath}>
      <Header />
        <div className="relative flex w-screen justify-center">
          <main className="relative w-full max-w-4xl">
            <div className="container px-4 sm:px-6 lg:px-8">
              <div className="w-full pt-8 pb-24">
                <div className="py-8 md:py-12 relative z-10">
                  <Hero introText={introText} />
                </div>
                <div className="org-modern-hr" />
                <div className="py-8 md:py-12 relative z-10">
                  <Experience experiences={experiences} />
                </div>
                <div className="org-modern-hr" />
                <div className="py-8 md:py-12 relative z-10">
                  <LatestBlogPosts posts={posts} />
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer currentPath={currentPath} />
    </PathnameProvider>
  );
}
