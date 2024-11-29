import React from "react";

type Props = {
  posts: { id: string; date: string; title: string }[];
};

const BlogPosts = ({ posts }: Props) => {
  return (
    <ul>
      {posts && posts.map(({ id, date, title }) => {
        return (
          <li>
            <h1>{id}</h1>
            <h1>{date}</h1>
            <h1>{title}</h1>
          </li>
        );
      })}
    </ul>
  );
};

export default BlogPosts;
