import React from "react";
import Link from "next/link";

type Props = {
  posts: { id: string; date: string; title: string }[];
};

const BlogPosts = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="min-h-[80vh] mt-6">
      <ul>
        {posts &&
          posts.map(({ id, date, title }) => {
            return (
              <li className="flex flex-col">
                <p className="text-balance text-sm leading-loose text-muted-foreground md:text-left">
                  {date}
                </p>
                <Link href={`/blog/${id}`}>
                  <h3 className="text-2xl font-bold">{title}</h3>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogPosts;
