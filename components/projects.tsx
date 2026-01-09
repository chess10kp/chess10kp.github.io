"use client";
import config from "@/siteConfig";
import { Card } from "./ui/card";
import { AnimatedSection } from "./animated-section";
import Image from "next/image";
import gitSvg from "@/assets/images/Git.svg";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type ProjectCardType = {
  name: string;
  description: string;
  stack: any[];
  href: string;
  blogId: string;
};

const ProjectCard = ({
  name,
  description,
  stack,
  href,
  blogId,
  hasBlogPost,
  delay = 0,
}: ProjectCardType & { hasBlogPost: boolean; delay?: number }) => {
  const CardContent = (
    <>
      <div className="my-2 mx-0 px-0 space-y-5 text-left md:col-span-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl text-accent text-accent/80 font-semibold mono">
            {name}
          </h3>
        </div>
        <p className="text-muted-foreground geist leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {stack.slice(0, 6).map((tech: any, i: number) => (
              <div
                key={i}
                className="relative group"
              >
                <Image
                  src={tech[0]}
                  width="20"
                  height="20"
                  alt={tech[1]}
                  className={`${tech[2] == true ? "dark:invert" : ""} transition-transform group-hover:scale-110`}
                />
              </div>
            ))}
            {stack.length > 6 && (
              <span className="text-xs text-muted-foreground/60 font-mono py-1">
                +{stack.length - 6}
              </span>
            )}
          </div>
          {href && (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm font-mono text-accent hover:text-accent/80 transition-colors group"
            >
              <span>View Project</span>
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </>
  );

  if (hasBlogPost) {
    return (
      <AnimatedSection  animation="fade-up" delay={delay}>
        <Link href={`/blog/${blogId}`}>
          <Card className="grid border border-border/30 md:grid-cols-4 bg-card/40 backdrop-blur-xl mb-6 p-6 cursor-pointer hover:bg-card/60 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500 group">
            {CardContent}
          </Card>
        </Link>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection animation="fade-up" delay={delay}>
      <Card className="grid border border-border/30 md:grid-cols-4 bg-card/40 backdrop-blur-xl mb-6 p-6 hover:bg-card/60 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500 group">
        {CardContent}
      </Card>
    </AnimatedSection>
  );
};

interface ProjectsProps {
  availableBlogPosts?: string[];
}

const Projects = ({ availableBlogPosts = [] }: ProjectsProps) => {
  const projectsList = config.projects;

  return (
    <div id="projects" className="scroll-mt-24">
      <AnimatedSection animation="fade-up">
        <div className="mb-12">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-2">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mono text-foreground/90">
            Projects
          </h2>
        </div>
      </AnimatedSection>
      <div>
        {projectsList.map((project, i) => {
          const hasBlogPost = Boolean(
            project.blogId && availableBlogPosts?.includes(project.blogId),
          );

          return (
            <ProjectCard
              key={i}
              name={project.name}
              description={project.description}
              stack={project.stack}
              href={project.href}
              blogId={project.blogId}
              hasBlogPost={hasBlogPost}
              delay={i * 100}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
