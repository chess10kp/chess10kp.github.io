import cppSvg from "../assets/images/CPP.svg";
import nasmSvg from "../assets/images/Nasm.svg";
import pythonSvg from "../assets/images/Python.svg";
import haskellSvg from "../assets/images/Haskell.svg";
import reactSvg from "../assets/images/React.svg";
import nextSvg from "../assets/images/next.svg";
import fastAPISvg from "../assets/images/fastapi.svg";
import typescriptSvg from "../assets/images/Typescript.svg";
import javaSvg from "../assets/images/Java.svg";
import ProjectCard from "@/components/projectCard";
import { Project } from "@/components/projectCard";

const Projects = () => {
  const projects: Project[] = [
    {
      name: "HD3",
      description: "A cross platform app for UM Dearborn's HackDearborn 3",
      stack: [
        [typescriptSvg, "Typescript"],
        [reactSvg, "react native"],
        [javaSvg, "java"],
      ],
      href: "https://play.google.com/store/apps/details?id=org.hackdearborn.hackdearbornapp&pli=1",
    },
    {
      name: "Socraticoin",
      description:
        "An educational tool to understand how cryptocurrencies work",
      stack: [
        [typescriptSvg, "Typescript"],
        [reactSvg, "React"],
        [pythonSvg, "Python"],
        [fastAPISvg, "FastAPI"],
      ],
      href: "https://github.com/chess10kp/socraticoin",
    },
    {
      name: "GitGraft",
      description: "An expense tracker",
      stack: [
        [typescriptSvg, "Typescript"],
        [reactSvg, "React"],
        [pythonSvg, "Python"],
        [fastAPISvg, "FastAPI"],
      ],
      href: "https://github.com/chess10kp/graft",
    },
    {
      name: "Snip",
      description: "A C-style programming language",
      stack: [
        [cppSvg, "C++"],
        [nasmSvg, "NASM"],
      ],
      href: "https://github.com/snip-lang/snip",
    },
    {
      name: "Evalyn",
      description: "The scheme interpreter with scripting potential",
      stack: [[haskellSvg, "haskell"]],
      href: "https://github.com/chess10kp/evalyn",
    },
  ];
  return (
    <section>
      <div className="flex flex-col mx-16">
        <h2 className="font-light text-center text-5xl mb-14">Projects</h2>
        <div className="grid gap-4 cursor-pointer grid-cols-0 my-10 auto-rows-[1fr] lg:gap-4 lg:grid-cols-3 md:gap-4 md:gap-cols-3">
          {projects.map((project, i) => {
            return <ProjectCard key={i} project={project} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
