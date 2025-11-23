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
              <li className="flex flex-col my-4 mono p-4 rounded-lg bg-card/30 hover:bg-card/50 border border-transparent hover:border-accent/30 transition-all duration-300">
                <p className="text-balance text-sm leading-loose text-muted-foreground md:text-left">
                  {date}
                </p>
                <Link href={`/blog/${id}`}>
                  <h1 className="text-xl mono font-bold text-accent hover:text-accent/80 transition-colors">{title}</h1>
                </Link>
                <div className="flex space-x-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="hover:bg-accent/20 hover:text-accent transition-colors">{tag}</Badge>
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
