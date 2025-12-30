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
      <div className="my-2 mx-0 px-0 space-y-4 text-left md:col-span-4">
        <div className="text-xl flex gap-4 mono">
          <span className="text-accent">{name}</span>
          <div className="flex flex-wrap gap-1">
            {stack.slice(0, 6).map((tech: any, i: number) => (
              <Image
                key={i}
                src={tech[0]}
                width="16"
                height="16"
                alt="svg icon"
                className={`${tech[2] == true ? "dark:invert" : ""}`}
              />
            ))}
            {stack.length > 6 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{stack.length - 6}
              </span>
            )}
          </div>
        </div>
        <div className="text-left wrap text-muted-foreground geist">
          {description}
        </div>
        <div className="flex items-center justify-between">
          {href && (
            <a href={href} target="_blank" onClick={(e) => e.stopPropagation()}>
              <Badge variant="secondary">
                Repo
              </Badge>
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
          <Card className="grid border-0 md:grid-cols-4 bg-card/50 backdrop-blur-xl mb-8 rounded-lg p-4 cursor-pointer hover:bg-card/90 transition-colors">
            {CardContent}
          </Card>
        </Link>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection animation="fade-up" delay={delay}>
      <Card className="grid border-0 md:grid-cols-4 bg-card/50 backdrop-blur-xl mb-8 rounded-lg p-4">
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
    <div id="projects">
      <h2 className="text-3xl mono text-muted-foreground/30 font-bold text-left my-4">
        ** projects
      </h2>
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
              delay={i * 200}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
