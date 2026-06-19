"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";

type Props = {
  posts: {
    id: string;
    date: string;
    title: string;
    tags: string[];
    tagline: string;
  }[];
};

const BlogPosts = ({ posts }: Props) => {
  return (
    <div className="min-h-[80vh] pt-16">
      <h1 className="text-xl">Mostly yapping about functional programming and agents. But also other stuff.</h1>
      <ul className="space-y-3">
        {posts &&
          posts.map(({ id, date, title, tags, tagline }, index) => {
            return (
              <li
                key={id}
                className="flex justify-center p-3 rounded-none bg-card/30 hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex gap-2 items-center">
                    <Badge variant={"secondary"} className="text-xs font-mono">
                      {date}
                    </Badge>
                    <a className="inline-block max-h-fit p-0 m-0" href={`/blog/${id}`}>
                      {title}
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogPosts;
