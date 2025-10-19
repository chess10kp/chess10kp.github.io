"use client";
import ProjectCard from "@/components/projectCard";
import { motion } from "framer-motion";
import config from "@/siteConfig";

const projectsList = config.projects

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Projects = () => {
  return (
    <section id="projects" className="py-16">
      <div className="flex flex-col">
        <h2 className="geist text-3xl font-bold text-left my-8">
          Projects I've Worked On
        </h2>
        <motion.div
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projectsList.map((project, i) => {
            return <ProjectCard onClick={() => {}} key={i} project={project} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
