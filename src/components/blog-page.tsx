"use client";
import { PathnameProvider } from "./pathname-provider";
import Header from "./header";
import Footer from "./footer";
import BlogPosts from "./blogPosts";

interface BlogPageProps {
  currentPath: string;
  posts: {
    id: string;
    date: string;
    title: string;
    tags: string[];
    tagline: string;
  }[];
}

export function BlogPage({ currentPath, posts }: BlogPageProps) {
  return (
    <PathnameProvider path={currentPath}>
      <Header />
        <section className="flex flex-col items-start justify-center my-10 px-4 md:px-2 pb-24">
          <div className="w-full">
            <BlogPosts posts={posts} />
          </div>
        </section>
        <Footer currentPath={currentPath} />
    </PathnameProvider>
  );
}
