"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { Experience } from "@/components/experience";
import { ContactSidebar } from "@/components/ContactSidebar";
import Projects from "@/components/projects";
import Skills from "@/components/Skills";
import LatestBlogPosts from "@/components/latest-blog-posts";
import { ContactSection } from "@/components/contact-section";
import { getAllPostIds } from "@/lib/posts";
import Footer from "@/components/footer";

type Post = {
  id: string;
  date: string;
  title: string;
  tags: string[];
};

interface HomeContentProps {
  posts: Post[];
  availableBlogPosts: string[];
}

const HomeContent = ({ posts, availableBlogPosts }: HomeContentProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <AnimatePresence>{isLoading && <Loader />}</AnimatePresence> */}

      {!isLoading && (
        <>
          <Header />
          <div className="relative mx-auto flex w-screen items-center justify-center bg-white dark:bg-[#0e1419]">
            <div
              className={cn(
                "absolute inset-0",
                "[background-size:20px_20px]",
                "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
              )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#0e1419]"></div>
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <ContactSidebar />
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="py-16">
                    <Hero />
                  </div>
                  <div className="py-16">
                    <Experience />
                  </div>
                  <div className="py-16" id="projects">
                    <Projects availableBlogPosts={availableBlogPosts} />
                  </div>
                  <div className="py-16">
                    <LatestBlogPosts posts={posts} />
                  </div>
                  <div className="py-16">
                    <ContactSection />
                  </div>
                </div>
              </div>
            </motion.main>
          </div>
          <Footer /> 
        </>
      )}
    </>
  );
};

export default HomeContent;
