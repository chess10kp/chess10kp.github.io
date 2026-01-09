"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Skills from "@/components/Skills";
import { Experience } from "@/components/experience";

import Projects from "@/components/projects";
import LatestBlogPosts from "@/components/latest-blog-posts";
import { ContactSection } from "@/components/contact-section";
import Footer from "@/components/footer";
import { type Post } from "@/components/latest-blog-posts";
import { AnimationProvider } from "@/contexts/animation-context";
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
    <AnimationProvider>
      {/* <AnimatePresence>{isLoading && <Loader />}</AnimatePresence> */}

      {!isLoading && (
        <>
          <Header />
           <div className="relative mx-auto flex w-screen items-center justify-center">
             <main className="relative">
               <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                  <div className="py-12 md:py-16 border-b border-border/30">
                    <Hero />
                  </div>
                  <div className="py-24 border-b border-border/30">
                    <Experience />
                  </div>
                  <div className="py-24 border-b border-border/30" id="projects">
                    <Projects availableBlogPosts={availableBlogPosts} />
                  </div>
                  <div className="py-24 border-b border-border/30">
                    <LatestBlogPosts posts={posts} />
                  </div>
                  <div className="py-12 md:py-16 border-b border-border/30">
                    <Skills />
                  </div>
                  <div className="py-24">
                    <ContactSection />
                  </div>
                  <div className="py-12 pb-24">
                    {/* Extra padding for mode line */}
                  </div>
                </div>
              </div>
            </main>
          </div>
          <Footer />
        </>
      )}
    </AnimationProvider>
  );
};

export default HomeContent;
