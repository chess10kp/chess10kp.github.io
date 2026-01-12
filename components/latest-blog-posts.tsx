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
    <div id="blog" className="py-16 scroll-mt-24">
      <AnimatedSection animation="fade-up">
        <div className="mb-12">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-2">
            Thoughts & Writing
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mono text-foreground/90">
            Latest Posts
          </h2>
        </div>
      </AnimatedSection>

      <div className="space-y-6">
        {latestPosts.map(({ id, date, title, tags, tagline }, index) => (
          <AnimatedSection
            key={id}
            animation="fade-up"
            delay={index * 100}
          >
            <Link href={`/blog/${id}`}>
              <div className="h-full p-6 md:p-8 border border-border/30 bg-card/40 backdrop-blur-xl hover:bg-card/60 hover:border-accent/30 transition-all duration-200 group">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span className="font-mono">{date}</span>
                </div>
                <h3 className="text-xl md:text-2xl mono font-semibold mb-4 line-clamp-2 text-accent group-hover:text-accent/80 transition-colors">
                  {title}
                </h3>
                <p className="text-md text-muted-foreground leading-relaxed">
                  {tagline}
                </p>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      {posts.length > 3 && (
        <AnimatedSection animation="fade-up" delay={300}>
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button 
                variant="outline" 
                className="group hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-200"
              >
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
};

export default LatestBlogPosts;
