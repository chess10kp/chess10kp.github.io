"use client";
import { Card } from "@/components/ui/card";

interface ProjectData {
  name: string;
  description: string;
  stack: string[];
  href: string;
  demo: string;
  blogId: string;
}

const ProjectCard = ({
  name,
  description,
  stack,
  href,
  blogId,
  hasBlogPost,
}: ProjectData & { hasBlogPost: boolean }) => {
  const CardContent = (
    <div className="my-2 mx-0 px-0 space-y-2 text-left">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base text-accent text-accent/90 font-semibold font-mono">{name}</h3>
        <div className="flex flex-wrap justify-center items-center gap-1.5">
          {stack.map((s) => (
            <span key={s} className="px-2 py-0.5 text-xs font-mono bg-secondary text-accent-foreground rounded-none">
              {s}
            </span>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground font-mono text-sm leading-relaxed">{description}</p>
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
  );

  if (hasBlogPost) {
    return (
      <a href={`/blog/${blogId}`}>
        <Card className="border border-border/30 bg-card/40 backdrop-blur-xl mb-6 p-6 cursor-pointer hover:bg-card/60 hover:border-accent/30 transition-all duration-200 group">
          {CardContent}
        </Card>
      </a>
    );
  }

  return (
    <Card className="border border-border/30 bg-card/40 backdrop-blur-xl mb-6 p-6 hover:bg-card/60 hover:border-accent/30 transition-all duration-200 group">
      {CardContent}
    </Card>
  );
};

interface ProjectsProps {
  projects: ProjectData[];
  availableBlogPosts?: string[];
}

const Projects = ({ projects, availableBlogPosts = [] }: ProjectsProps) => {
  return (
    <div id="projects" className="scroll-mt-24">
      <div className="org-modern-headline">
        <h2 className="text-xl md:text-2xl font-semibold font-mono text-foreground">Projects</h2>
      </div>
      <div>
        {projects.map((project, i) => {
          const hasBlogPost = Boolean(project.blogId && availableBlogPosts?.includes(project.blogId));
          return <ProjectCard key={i} {...project} hasBlogPost={hasBlogPost} />;
        })}
      </div>
    </div>
  );
};

export default Projects;
