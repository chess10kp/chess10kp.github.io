import React from "react";
import BlogPosts from "@/components/blogPosts";
import { getSortedPostsData } from "@/lib/posts";
import { AnimationProvider } from "@/contexts/animation-context";

const Blog = () => {
  const posts = getSortedPostsData();
  
  return (
    <AnimationProvider>
      <section className="flex flex-col items-center my-10 px-4 md:px-8 lg:px-96 pb-24">
        <div className="w-full max-w-4xl">
          <BlogPosts posts={posts} />
        </div>
      </section>
    </AnimationProvider>
  );
};

export default Blog;
