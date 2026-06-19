"use client";
import { PathnameProvider } from "./pathname-provider";
import Header from "./header";
import Footer from "./footer";
import Projects from "./projects";

interface ProjectsPageProps {
  currentPath: string;
  projects: {
    name: string;
    description: string;
    stack: string[];
    href: string;
    demo: string;
    blogId: string;
  }[];
  availableBlogPosts: string[];
}

export function ProjectsPage({ currentPath, projects, availableBlogPosts }: ProjectsPageProps) {
  return (
    <PathnameProvider path={currentPath}>
      <Header />
        <section id="projects" className="py-16 md:py-24 pb-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col">
              <Projects projects={projects} availableBlogPosts={availableBlogPosts} />
            </div>
          </div>
        </section>
        <Footer currentPath={currentPath} />
    </PathnameProvider>
  );
}
