import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type Props = {
  posts: { id: string; date: string; title: string; tags: string[] }[];
};

const BlogPosts = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="min-h-[80vh] pt-20">
      <ul>
        {posts &&
          posts.map(({ id, date, title, tags }) => {
            return (
              <li className="flex flex-col my-4 mono">
                <p className="text-balance text-sm leading-loose text-muted-foreground md:text-left">
                  {date}
                </p>
                <Link href={`/blog/${id}`}>
                  <h1 className="text-xl mono font-bold">{title}</h1>
                </Link>
                <div className="flex space-x-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogPosts;
