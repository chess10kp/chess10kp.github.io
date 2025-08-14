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
import { AnimationProvider } from "@/contexts/animation-context";

export default function Home() {
  return (
    <AnimationProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <Header></Header>
        <main className="relative">
          <ContactSidebar />
          <div className="mx-16 lg:mx-32">
            <div className="scroller">
              <Hero />
              <Experience />
            </div>
            <div className="scroller" id="projects">
              <Projects />
              <Skills></Skills>
            </div>
            <div>
              <ContactForm></ContactForm>
            </div>
          </div>
        </main>
        <Footer />
      </ThemeProvider>
    </AnimationProvider>
  );
}
