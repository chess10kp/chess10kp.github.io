"use client";
import ProjectDialog from "./project-dialog";
import config from "@/siteConfig";
import { Project } from "@/lib/types";
import { useState } from "react";
import ProjectCard from "./project-card";

const projectsList = config.projects;

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-16">
      <div className="flex flex-col">
        <h2 className="geist text-3xl font-bold text-left my-8">
          Projects I've Worked On
        </h2>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projectsList.map((project, i) => {
            return (
              <ProjectCard
                onClick={() => handleProjectClick(project)}
                key={i}
                project={project}
              />
            );
          })}
        </div>
      </div>
      {selectedProject && (
        <ProjectDialog project={selectedProject} onClose={handleCloseDialog} />
      )}
    </section>
  );
};

export default Projects;

