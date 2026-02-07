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
          <div className="relative flex w-screen justify-center">
            <main className="relative w-full max-w-4xl">
              <div className="container px-4 sm:px-6 lg:px-8">
                <div className="w-full pt-8 pb-24">
                  <div className="py-8 md:py-12 relative z-10">
                    <Hero />
                  </div>
                  <div className="org-modern-hr" />
                  <div className="py-8 md:py-12 relative z-10">
                    <Experience />
                  </div>
                  <div className="org-modern-hr" />
                  <div className="py-8 md:py-12 relative z-10" id="projects">
                    <Projects availableBlogPosts={availableBlogPosts} />
                  </div>
                  <div className="org-modern-hr" />
                  <div className="py-8 md:py-12 relative z-10">
                    <LatestBlogPosts posts={posts} />
                  </div>
                  <div className="org-modern-hr" />
                  <div className="py-8 md:py-12 relative z-10">
                    <Skills />
                  </div>
                  <div className="org-modern-hr" />
                  <div className="py-8 md:py-12 relative z-10">
                    <ContactSection />
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
