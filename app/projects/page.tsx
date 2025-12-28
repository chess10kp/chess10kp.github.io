import ProjectCard from "@/components/project-card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import siteConfig from "@/siteConfig";

export default function ProjectsPage() {
  return (
    <div>
      <Header />
      <section id="projects" className="py-16 pb-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center my-8">
            All Projects
          </h1>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.projects.map((project, i) => {
              return (
                <ProjectCard
                  key={i}
                  project={project}
                />
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
