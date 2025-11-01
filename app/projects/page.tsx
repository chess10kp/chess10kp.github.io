"use client";
import { useState } from "react";
import ProjectCard from "@/components/project-card";
import { Project } from "@/lib/types";
import Header from "@/components/header";
import siteConfig from "@/siteConfig";
import ProjectDialog from "@/components/project-dialog";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  return (
    <div>
      <Header />
      <section id="projects" className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="geist text-5xl font-bold text-center my-8">
            All Projects
          </h1>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.projects.map((project, i) => {
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
      </section>
      {selectedProject && (
        <ProjectDialog project={selectedProject} onClose={handleCloseDialog} />
      )}
    </div>
  );
}
