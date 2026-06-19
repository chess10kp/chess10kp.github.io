"use client";
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
  if (!latestPosts || latestPosts.length === 0) return null;

  return (
    <div id="blog" className="py-10 scroll-mt-24">
      <div className="org-modern-headline">
        <h2 className="text-xl md:text-3xl font-semibold font-mono text-foreground">Latest Posts</h2>
      </div>
      <div className="space-y-2 gap-4 flex flex-col">
        {latestPosts.map(({ id, date, title, tags, tagline }, index) => (
          <a key={id} href={`/blog/${id}`}>
            <Card className="h-full w-full bg-background border-0 border-l-2 hover:bg-muted/10 transition-colors">
              <CardHeader>
                <div className="flex flex-row justify-between items-start">
                  <CardTitle className="text-accent font-mono text-xl">{title}</CardTitle>
                </div>
                <CardDescription className="font-mono">{tagline}</CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
      {posts.length > 3 && (
        <div className="mt-6 text-left">
          <a href="/blog">
            <button className="group hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-200 font-mono text-xs border px-4 py-2">
              [Check out everything else]
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default LatestBlogPosts;
