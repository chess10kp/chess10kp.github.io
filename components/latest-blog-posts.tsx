"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div id="blog" className="py-10 scroll-mt-24">
      <AnimatedSection animation="fade-up">
        <div className="org-modern-headline">
          <p className="text-accent font-mono text-xs mb-1">;; Blog</p>
          <h2 className="text-xl md:text-2xl font-semibold font-mono text-foreground">
            ** Latest Posts
          </h2>
        </div>
      </AnimatedSection>

      <div className="space-y-2">
        {latestPosts.map(({ id, date, title, tags, tagline }, index) => (
          <AnimatedSection key={id} animation="fade-up" delay={index * 60}>
            <Link href={`/blog/${id}`}>
              <div className="h-full py-1.5 hover:bg-muted/10 transition-colors group">
                <div className="text-accent font-mono text-sm leading-relaxed">
                  [[{title}][{title}]]
                </div>
                <Badge variant={"secondary"} className="text-xs font-mono mt-1">
                  {date}
                </Badge>
                <div className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {tagline}
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      {posts.length > 3 && (
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="mt-6 text-left">
            <Link href="/blog">
              <Button
                variant="outline"
                className="group hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-200 font-mono text-xs"
              >
                [View All Posts]
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
};

export default LatestBlogPosts;
