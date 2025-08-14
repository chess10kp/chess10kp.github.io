"use client";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Projects from "@/components/projects";
import Skills from "@/components/Skills";
import { Experience } from "@/components/experience";
import { ContactSidebar } from "@/components/ContactSidebar";
import "./page.css";
import { ContactForm } from "@/components/contact-form";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate loading for 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <Header />
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
                  <Projects />
                </div>
                <div className="py-16">
                  <Skills />
                </div>
                <div className="py-16">
                  <ContactForm />
                </div>
              </div>
            </div>
          </motion.main>
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
}
