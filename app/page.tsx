import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Projects from "@/components/projects";
import { Experience } from "@/components/experience";
import { ContactSidebar } from "@/components/ContactSidebar";
import "./page.css";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Header></Header>
      <main className="relative">
        <ContactSidebar />
        <div className="scroller">
          <Hero />
          <Experience />
        </div>
        <div className="scroller" id="projects">
          <Projects />
        </div>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
