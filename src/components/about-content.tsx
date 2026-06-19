"use client";
import { PathnameProvider } from "./pathname-provider";
import Header from "./header";
import Footer from "./footer";

export function AboutPage() {
  return (
    <PathnameProvider path="/about">
      <Header />
      <div className="flex flex-col my-10 mt-24 items-center min-h-[80vh] pb-24">
        <div className="text-center mb-10">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 blur-lg opacity-30" />
              <div className="w-28 h-28 border-4 border-card relative overflow-hidden">
                <img src="/me.jpg" alt="@nitinmadhu" className="object-cover w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-center gap-3 flex-wrap">
            <a href="https://github.com/chess10kp" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 text-sm text-accent hover:text-foreground bg-card/50 hover:bg-card border border-border/30 transition-all duration-300 group font-mono">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nitin-shankar-madhu" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 text-sm text-accent hover:text-foreground bg-card/50 hover:bg-card border border-border/30 transition-all duration-300 group font-mono">
              LinkedIn
            </a>
            <a href="mailto:nmadhu@umich.edu" className="flex items-center gap-2 px-3 py-1.5 text-sm text-accent hover:text-foreground bg-card/50 hover:bg-card border border-border/30 transition-all duration-300 group font-mono">
              Email
            </a>
          </div>
        </div>

        {/*
          ✨ EDIT YOUR ABOUT TEXT HERE ✨
          Just change the paragraphs in this component.
        */}
        <div>
          <div className="flex flex-col lg:mx-0 md:mx-16 text-base gap-6 mx-6 md:mx-12 max-w-4xl">
            <p>
              I'm a CS undergraduate currently at Jaseci Labs. Here I'm working on tooling across the Jac stack. I love programming language design, compilers and functional programming. Recently, I've also taken an interest in AI agents and shoving AI into everything I do.
            </p>
            <p>
              My research interests as of writing this include harness engineering, language design and finetuning. I don't actually have any pubs, but I've heard it's good to manifest your desires.
            </p>
            <p>
              When I'm not programming, you'll find me playing chess. Here's me hitting 2650 on{" "}
              <a href="https://www.chess.com/member/n_s_m/stats" target="_blank" rel="noopener noreferrer"
                 className="text-accent hover:text-accent/80 transition-colors underline underline-offset-4 decoration-2 hover:decoration-accent">
                chess.com
              </a>.
            </p>
            <div className="relative w-full h-64 md:h-80 mt-4 overflow-hidden border border-border/30">
              <img src="/gain_rating.png" alt="chess rating"
                   className="object-cover hover:scale-105 transition-transform duration-700 w-full h-full"
                   style={{ objectFit: "contain" }} />
            </div>
          </div>
        </div>
      </div>
      <Footer currentPath="/about" />
    </PathnameProvider>
  );
}
