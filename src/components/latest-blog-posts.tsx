"use client";
import React from "react";

export type Post = {
  id: string;
  date: string;
  title: string;
  tags: string[];
  tagline: string;
};

type Props = {
  posts: Post[];
};

const LatestBlogPosts = ({ posts }: Props) => {
  const latestPosts = posts.slice(0, 3);

  if (!latestPosts || latestPosts.length === 0) {
    return null;
  }

  return (
    <div id="blog" className="py-10 scroll-mt-24">
      <p
        id="latest-posts-heading"
        className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-secondary"
      >
        Posts
      </p>

      <ul className="space-y-5">
        {latestPosts.map(({ id, date, title }) => (
          <li key={id}>
            <a href={`/blog/${id}`} className="block group">
              <span className="block font-semibold font-mono text-base text-foreground group-hover:text-accent transition-colors">
                {title}
              </span>
              <span className="mt-1 block font-mono text-xs text-muted-foreground">
                {date}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestBlogPosts;
