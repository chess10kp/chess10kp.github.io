import React from "react";
import BlogPosts from "@/components/blogPosts";
import { getSortedPostsData } from "@/lib/posts";

const Blog = () => {
    console.log("hi")
  const posts = getSortedPostsData();
  return (
    <section>
      <h2>Blogg</h2>
      <BlogPosts posts={posts} />
    </section>
  );
};

export default Blog;
