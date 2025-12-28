"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import { ArrowRight } from "lucide-react";

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
    <div id="blog" className="py-16">
      <h2 className="mono text-muted-foreground/30 text-3xl font-bold text-left mb-8">
        ** blog
      </h2>

      <div className="grid gap-6 md:grid-cols-1">
        {latestPosts.map(({ id, date, title, tags, tagline }, index) => (
          <AnimatedSection
            key={id}
            animation="fade-up"
            delay={index * 100}
            className="h-full p-6 border rounded-lg bg-card/50 hover:bg-card/70 border-transparent transition-all duration-300"
          >
            <Link href={`/blog/${id}`}>
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  {date}
                </div>
                <h3 className="text-xl mono font-semibold mb-3 line-clamp-2 text-accent hover:text-accent/80 transition-colors">
                  {title}
                </h3>
                <p className="text-md text-muted-foreground">
                  {tagline}
                </p>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      {posts.length > 3 && (
        <div className="mt-8 text-center">
          <Link href="/blog">
            <Button variant="outline" className="group">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LatestBlogPosts;
