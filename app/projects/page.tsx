"use client"

import ProjectCard from "@/components/project-card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import siteConfig from "@/siteConfig";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <div>
      <Header />
      <section id="projects" className="py-16 md:py-24 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-accent font-mono text-sm tracking-widest uppercase mb-2">
              Full Portfolio
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mono text-foreground/90">
              All Projects
            </h1>
          </div>
          <div className="grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.projects.map((project, i) => {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
