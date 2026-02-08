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
      <div className="my-2 mx-0 px-0 space-y-2 text-left">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base text- text-accent text-accent/90 font-semibold font-mono">
            {name}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-1.5">
            {stack.map((s: any) => (
              <span
                key={s[1]}
                className="px-2 py-0.5 text-xs font-mono bg-secondary text-accent-foreground rounded-none"
              >
                {s[1]}
              </span>
            ))}
          </div>
        </div>
        <p className="text-muted-foreground font-mono text-sm leading-relaxed">
          {description}
        </p>

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs font-mono text-accent hover:text-accent/80 transition-colors group"
          >
            <span>[View Project]</span>
          </a>
        )}
      </div>
    </>
  );

  if (hasBlogPost) {
    return (
      <AnimatedSection animation="fade-up" delay={delay}>
        <Link href={`/blog/${blogId}`}>
          <Card className="border border-border/30 bg-card/40 backdrop-blur-xl mb-6 p-6 cursor-pointer hover:bg-card/60 hover:border-accent/30 transition-all duration-200 group">
            {CardContent}
          </Card>
        </Link>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection animation="fade-up" delay={delay}>
      <Card className="border border-border/30 bg-card/40 backdrop-blur-xl mb-6 p-6 hover:bg-card/60 hover:border-accent/30 transition-all duration-200 group">
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
        <div className="org-modern-headline">
          <h2 className="text-xl md:text-2xl font-semibold font-mono text-foreground">
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
              delay={i * 80}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
