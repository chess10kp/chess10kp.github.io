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
                className="flex justify-center  p-3 rounded-none bg-card/30 hover:bg-card/50  transition-all duration-300"
              >
              <div className="flex-1">
                <div className="flex gap-2 items-center">
                <Badge variant={"secondary"} className="text-xs font-mono">
                {date}
                </Badge>
                  <Link className="inline-block max-h-fit p-0 m-0" href={`/blog/${id}`}>
                      {title}
                  </Link>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogPosts;
