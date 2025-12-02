import React from "react";
import BlogPosts from "@/components/blogPosts";
import { getSortedPostsData } from "@/lib/posts";
import { AnimationProvider } from "@/contexts/animation-context";

const Blog = () => {
  const posts = getSortedPostsData();
  return (
    <AnimationProvider>
      <section className="flex flex-col items-center my-10 md:mx-8 mx-4">
        <BlogPosts posts={posts} />
      </section>
    </AnimationProvider>
  );
};

export default Blog;
