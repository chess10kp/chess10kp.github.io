import cppSvg from "../assets/images/CPP.svg";
import nasmSvg from "../assets/images/Nasm.svg";
import pythonSvg from "../assets/images/Python.svg";
import haskellSvg from "../assets/images/Haskell.svg";
import reactSvg from "../assets/images/React.svg";
import nextSvg from "../assets/images/nextjs.svg";
import geminiSvg from "../assets/images/gemini.svg";
import fastAPISvg from "../assets/images/fastapi.svg";
import typescriptSvg from "../assets/images/Typescript.svg";
import javaSvg from "../assets/images/Java.svg";
import rustSvg from "../assets/images/rust.svg"
import ProjectCard from "@/components/projectCard";
import { Project } from "@/components/projectCard";

const Projects = () => {
  const projects: Project[] = [
    {
      name: "OPilot",
      description:
        "A smart desktop AI assistant for automating your daily tasks",
      stack: [
        [typescriptSvg, "Typescript"],
        [nextSvg, "Next.js", true],
        [geminiSvg, "Google Gemini", true],
        [rustSvg, "Rust", true]
      ],
      href: "https://github.com/chess10kp/opilot",
    },
    {
      name: "HD3",
      description:
        "A cross platform mobile app for UM Dearborn's HackDearborn 3",
      stack: [
        [typescriptSvg, "Typescript"],
        [reactSvg, "React Native"],
        [javaSvg, "Java"],
      ],
      href: "https://play.google.com/store/apps/details?id=org.hackdearborn.hackdearbornapp&pli=1",
    },
    {
      name: "Socraticoin",
      description: "An educational tool to simulate cryptocurrencies",
      stack: [
        [typescriptSvg, "Typescript"],
        [reactSvg, "React"],
        [pythonSvg, "Python"],
        [fastAPISvg, "FastAPI"],
      ],
      href: "https://github.com/chess10kp/socraticoin",
    },
    {
      name: "Snip",
      description: "A C-style interpreted programming language",
      stack: [
        [cppSvg, "C++"],
        [nasmSvg, "NASM"],
      ],
      href: "https://github.com/snip-lang/snip",
    },
    {
      name: "Evalyn",
      description: "A scheme interpreter written with Haskell and Parsec",
      stack: [[haskellSvg, "haskell"]],
      href: "https://github.com/chess10kp/evalyn",
    },
  ];
  return (
    <section>
      <div className="flex flex-col md:mx-16 lg:mx-32">
        <h2 className="font-medium md:text-left text-xl text-center md:text-2xl mono">Projects I've worked on</h2>
        <div className="grid gap-4 cursor-pointer grid-cols-1  md:grid-cols-2  my-4 auto-rows-[1fr] lg:gap-4 lg:grid-cols-4 md:gap-4 md:gap-cols-2">
          {projects.map((project, i) => {
            return <ProjectCard key={i} project={project} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
