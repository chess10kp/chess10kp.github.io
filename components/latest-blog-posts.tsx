"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/animated-section";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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
          <h2 className="text-xl  md:text-3xl font-semibold font-mono text-foreground">
            Latest Posts
          </h2>
        </div>
      </AnimatedSection>

      <div className="space-y-2 gap-4 flex flex-col">
        {latestPosts.map(({ id, date, title, tags, tagline }, index) => (
          <AnimatedSection key={id} animation="fade-up" delay={index * 60}>
            <Link href={`/blog/${id}`}>
              <Card className="h-full w-full bg-background border-0 border-l-2 hover:bg-muted/10 transition-colors">
                <CardHeader>
                  <div className="flex flex-row justify-between items-start">
                    <CardTitle className="text-accent font-mono text-xl">{title}</CardTitle>
                    
                  </div>
                  <CardDescription className="font-mono">
                    {tagline}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      {posts.length > 3 && (
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="mt-6 text-left">
            <Link href="/projects">
              <Button
                variant="outline"
                className="group hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-200 font-mono text-xs"
              >
                [Check out everything else]
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
};

export default LatestBlogPosts;
