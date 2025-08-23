"use client";
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
import rustSvg from "../assets/images/rust.svg";
import ProjectCard from "@/components/projectCard";
import { Project } from "@/components/projectCard";
import { motion } from "framer-motion";
import supabase from "@/assets/images/supabase.svg";
import cs from "@/assets/images/CS.svg";

const projectsList: Project[] = [
  {
    name: "OPilot",
    description: "A smart desktop AI assistant for automating your daily tasks",
    stack: [
      [typescriptSvg, "Typescript"],
      [nextSvg, "Next.js", true],
      [geminiSvg, "Google Gemini", true],
      [rustSvg, "Rust", true],
    ],
    href: "https://github.com/chess10kp/opilot",
    demo: "",
    image: "",
  },
  {
    name: "HD4",
    description: "A cross platform mobile app for UM Dearborn's HackDearborn 4",
    stack: [
      [typescriptSvg, "Typescript"],
      [reactSvg, "React Native"],
      [javaSvg, "Java"],
      [supabase, "Supabase"],
    ],
    href: "https://play.google.com/store/apps/details?id=org.hackdearborn.hackdearbornapp&pli=1",
    demo: "",
    image: "",
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
    demo: "",
    image: "",
  },
  {
    name: "Snip",
    description: "A typescript interpreter written in C#",
    stack: [[cs, "C#"]],
    href: "https://github.com/snip-lang/snip",
    demo: "",
    image: "",
  },
  {
    name: "PCFMB",
    description: "A mobile app to get you our of awkward meetings",
    stack: [
      [typescriptSvg, "Typescript"],
      [reactSvg, "React Native"],
    ],
    href: "https://github.com/chess10kp/pcfmb",
    demo: "",
    image: "",
  },
  // {
  //   name: "Evalyn",
  //   description: "A scheme interpreter written with Haskell and Parsec",
  //   stack: [[haskellSvg, "haskell"]],
  //   href: "https://github.com/chess10kp/evalyn",
  // },
];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Projects = () => {
  return (
    <section id="projects" className="py-16">
      <div className="flex flex-col">
        <h2 className="geist text-3xl font-bold text-left my-8">
          Projects I've Worked On
        </h2>
        <motion.div
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projectsList.map((project, i) => {
            return <ProjectCard onClick={() => {}} key={i} project={project} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
