import React from "react";
import BlogPosts from "@/components/blogPosts";
import { getSortedPostsData } from "@/lib/posts";

const Blog = () => {
  const posts = getSortedPostsData();
  return (
    <section className="flex flex-col items-center">
      <BlogPosts posts={posts} />
    </section>
  );
};

export default Blog;
