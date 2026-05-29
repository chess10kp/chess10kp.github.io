import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/animated-section";

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
      <ul className="space-y-3">
        {posts &&
          posts.map(({ id, date, title, tags, tagline }, index) => {
            return (
              <AnimatedSection
                key={id}
                animation="fade-up"
                delay={index * 50 + 100}
                className="flex items-start justify-between p-3 rounded-none bg-card/30 hover:bg-card/50  transition-all duration-300"
              >
              <div className="flex-1">
                <div className="flex items-center gap-2 items-center">
                <Badge variant={"secondary"} className="text-xs font-mono">
                {date}
                </Badge>
                  <Link href={`/blog/${id}`}>
                    <h1 className="text-lg h-fit p-0 bg-white font-bold text-accent hover:text-accent/80 transition-colors font-mono">
                      {title}
                    </h1>
                  </Link>
                  </div>
                  {tagline && (
                    <p className="text-sm text-muted-foreground/80 mt-1 line-clamp-2 font-mono">
                      {tagline}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 ml-4">
                  {tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="transition-colors text-secondary text-xs font-mono"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs font-mono">
                      +{tags.length - 3}
                    </Badge>
                  )}
                </div>
              </AnimatedSection>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogPosts;
