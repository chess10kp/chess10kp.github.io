import React from "react";
import Link from "next/link";

type Props = {
  posts: { id: string; date: string; title: string }[];
};

const BlogPosts = ({ posts }: Props) => {
    console.log(posts)
  return (
    <ul>
      {posts && posts.map(({ id, date, title }) => {
        return (
          <li>
            <Link href={`/blog/${id}`}>{id}</Link>
            <h1>{date}</h1>
            <h1>{title}</h1>
          </li>
        );
      })}
    </ul>
  );
};

export default BlogPosts;
