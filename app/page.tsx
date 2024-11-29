import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Projects from "@/components/projects";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <main className="bg-background">
        <Header />
        <div className="scroller">
          <Hero />
        </div>
        <div className="scroller">
          <Projects />
        </div>
        <Footer></Footer>
      </main>
    </ThemeProvider>
  );
}
