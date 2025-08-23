"use client";
import ProjectCard from "@/components/projectCard";
import { Project } from "@/components/projectCard";
import { motion } from "framer-motion";
import Header from "@/components/header";
import siteConfig from "@/siteConfig";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ProjectsPage() {
  return (
    <div>
      <Header />
      <section id="projects" className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="geist text-5xl font-bold text-center my-8">
            All Projects
          </h1>
          <motion.div
            className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {siteConfig.projects.map((project, i) => {
              return <ProjectCard onClick={() => {}} key={i} project={project} />;
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
