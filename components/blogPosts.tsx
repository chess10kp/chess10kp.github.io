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
      <ul className="space-y-3">
        {posts &&
          posts.map(({ id, date, title, tags }) => {
            return (
              <li className="flex items-center justify-between p-3 rounded-lg bg-card/30 hover:bg-card/50 border border-transparent hover:border-accent/30 transition-all duration-300">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">
                    {date}
                  </p>
                  <Link href={`/blog/${id}`}>
                    <h1 className="text-lg mono font-bold text-accent hover:text-accent/80 transition-colors">{title}</h1>
                  </Link>
                </div>
                <div className="flex space-x-2 ml-4">
                  {tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="hover:bg-accent/20 hover:text-accent transition-colors text-xs">{tag}</Badge>
                  ))}
                  {tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">+{tags.length - 3}</Badge>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogPosts;
