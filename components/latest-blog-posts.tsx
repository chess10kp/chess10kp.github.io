"use client";
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

type Post = {
  id: string;
  date: string;
  title: string;
  tags: string[];
};

type Props = {
  posts: Post[];
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const LatestBlogPosts = ({ posts }: Props) => {
  // Show all posts
  const latestPosts = posts;

  if (!latestPosts || latestPosts.length === 0) {
    return null;
  }

  return (
    <div id="blog" className="py-16">
      <h2 className="geist text-3xl font-bold text-left mb-8">Blog Posts</h2>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {latestPosts.map(({ id, date, title, tags }) => (
          <motion.div
            key={id}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Link href={`/blog/${id}`}>
              <div className="h-full p-6 border rounded-lg bg-card/50 hover:bg-card/90 transition-colors">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {date}
                </div>
                <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                  {title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LatestBlogPosts;