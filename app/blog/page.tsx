import React from "react";
import BlogPosts from "@/components/blogPosts";
import { getSortedPostsData } from "@/lib/posts";
import { AnimationProvider } from "@/contexts/animation-context";

const Blog = () => {
  const posts = getSortedPostsData();

  return (
    <AnimationProvider>
      <section className="flex flex-col items-start justify-center my-10 px-4 md:px-8 pb-24">
        <div className="w-full">
          <BlogPosts posts={posts} />
        </div>
      </section>
    </AnimationProvider>
  );
};

export default Blog;
