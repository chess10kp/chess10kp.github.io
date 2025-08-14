"use client";
import React from "react";
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
import { motion } from "framer-motion";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Header />
      <motion.main
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
    </ThemeProvider>
  );
}