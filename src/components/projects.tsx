"use client";
import { ArrowUpRight, BookOpen } from "lucide-react";

interface ProjectData {
  name: string;
  description: string;
  stack: string[];
  href: string;
  demo: string;
  blogId: string;
}

interface ProjectsProps {
  projects: ProjectData[];
  availableBlogPosts?: string[];
}

const Projects = ({ projects, availableBlogPosts = [] }: ProjectsProps) => {
  return (
    <div id="projects" className="scroll-mt-16 sm:scroll-ml-12">
      <header className="mb-7">
        <p
          id="projects-heading"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary"
        >
          Selected work
        </p>
      </header>

      <div className="space-y-4">
        {projects.map((project) => {
          const hasBlogPost = Boolean(
            project.blogId && availableBlogPosts.includes(project.blogId),
          );

          return (
            <article
              key={project.name}
              className="border border-border bg-card/30 p-5 transition-colors hover:border-border/80 hover:bg-card/60"
            >
              <h3 className="mb-2 text-base font-semibold leading-snug text-accent">
                {project.name}
              </h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.name} technology stack`}>
                {project.stack.map((technology) => (
                  <li
                    key={technology}
                    className="border border-border bg-muted px-2 py-0.5 text-[11px] text-foreground/80"
                  >
                    {technology}
                  </li>
                ))}
              </ul>

              {(project.href || hasBlogPost) && (
                <div className="mt-5 flex flex-wrap gap-4 border-t border-border/70 pt-4">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80"
                    >
                      View project
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  )}
                  {hasBlogPost && (
                    <a
                      href={`/blog/${project.blogId}`}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <BookOpen size={13} aria-hidden="true" />
                      Read case study
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
