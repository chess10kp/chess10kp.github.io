"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Post = {
  id: string;
  title: string;
  date: string;
};

type Props = {
  prev: Post | null;
  next: Post | null;
};

const BlogNavigation = ({ prev, next }: Props) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoadingId("loading");
    const handleRouteChangeComplete = () => setLoadingId(null);

    window.addEventListener("beforeunload", handleRouteChangeStart);

    return () => {
      window.removeEventListener("beforeunload", handleRouteChangeStart);
    };
  }, []);

  const NavButton = ({
    post,
    direction,
    icon: Icon,
    className,
  }: {
    post: Post;
    direction: "prev" | "next";
    icon: any;
    className?: string;
  }) => (
    <Link
      href={`/blog/${post.id}`}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-lg
        border border-border/30 bg-card/40
        hover:bg-card/60 hover:border-accent/30
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      onClick={() => setLoadingId(post.id)}
    >
      {direction === "prev" && <Icon size={18} />}
      <div className="flex flex-col items-start">
        <span className="text-xs text-muted-foreground font-mono uppercase">
          {direction === "prev" ? "Previous" : "Next"}
        </span>
        <span className="text-sm font-semibold text-foreground line-clamp-1 max-w-[150px] md:max-w-[200px]">
          {post.title}
        </span>
      </div>
      {direction === "next" && <Icon size={18} />}
      {loadingId === post.id && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/80 rounded-lg">
          <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </Link>
  );

  return (
    <div className="flex justify-between items-center gap-4 mt-12 pt-8 border-t border-border/30">
      <div className="flex-1">
        {prev ? (
          <NavButton post={prev} direction="prev" icon={ArrowLeft} />
        ) : (
          <div className="flex-1" />
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {next ? (
          <NavButton post={next} direction="next" icon={ArrowRight} className="flex-row-reverse text-right" />
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
};

export default BlogNavigation;
