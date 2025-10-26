import { Project } from "@/lib/types";
import supabase from "@/assets/images/supabase.svg";
import cs from "@/assets/images/CS.svg";
import cppSvg from "@/assets/images/CPP.svg";
import nasmSvg from "@/assets/images/Nasm.svg";
import pythonSvg from "@/assets/images/Python.svg";
import haskellSvg from "@/assets/images/Haskell.svg";
import reactSvg from "@/assets/images/React.svg";
import nextSvg from "@/assets/images/nextjs.svg";
import geminiSvg from "@/assets/images/gemini.svg";
import fastAPISvg from "@/assets/images/fastapi.svg";
import typescriptSvg from "@/assets/images/Typescript.svg";
import javaSvg from "@/assets/images/Java.svg";
import rustSvg from "@/assets/images/rust.svg";
import langChainSvg from "@/assets/images/langchain.svg";

export default {
  currentStanding: () => {
    switch (new Date().getFullYear() - 2022) {
      case 0:
        return "Freshman";
      case 1:
        return "Sophomore";
      case 2:
        return "Junior";
      case 3:
        return "Senior";
      default:
        return "Graduate";
    }
  },
  links: {
    github: "https://github.com/chess10kp",
    linkedin: "https://www.linkedin.com/in/nitin-shankar-madhu",
    email: "mailto:nmadhu@umich.edu",
    chess: "https://chess.com/member/N_S_M",
    leetcode: "https://leetcode.com/u/chess10kp",
  },
  personal: {
    name: "Nitin Madhu",
    university: "UofM Dearborn",
    university_link: "https://umdearborn.edu",
    graduationYear: 2026,
    major: "CS",
  },
  skills: {
    software: ["Next.js", "React", "Typescript", "C#", "ASP.NET", "HTML/CSS"],
    ml: ["Pytorch", "Tensorflow", "NumPy", "Pandas"],
    llm: ["LangChain"],
  },
  projects: [
    {
      name: "BabbleFish",
      description:
        "Multi-agent extension powered by Gemini 2.5 that collaboratively translates and summarizes messages across Discord, Slack, and WhatsApp.",
      stack: [
        [typescriptSvg, "Typescript"],
        [geminiSvg, "Google Gemini", true],
        [fastAPISvg, "FastAPI", true],
        [langChainSvg, "LangChain", true],
      ],
      href: "https://devpost.com/software/babelfetch",
      demo: "https://devpost.com/software/babelfetch",
      image: "",
    },
    {
      name: "OPilot",
      description:
        "A smart desktop AI assistant for automating your daily tasks",
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
      demo: "",
      image: "",
      description:
        "A cross platform mobile app for UM Dearborn's HackDearborn 4",
      stack: [
        [typescriptSvg, "Typescript"],
        [reactSvg, "React Native"],
        [javaSvg, "Java"],
        [supabase, "Supabase"],
      ],
      href: "https://play.google.com/store/apps/details?id=org.hackdearborn.hackdearbornapp&pli=1",
    },
    {
      name: "Socraticoin",
      demo: "",
      image: "",
      description: "An interactive blockchain simulation platform that implements core cryptocurrency protocols and consensus mechanisms",
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
      demo: "",
      image: "",
      description: "A C-style interpreted programming language",
      stack: [[cs, "C#"]],
      href: "https://github.com/snip-lang/snip",
    },
  ] as Project[],
  hiddenProjects: [
    {
      name: "Evalyn",
      description: "A scheme interpreter written with Haskell and Parsec",
      stack: [[haskellSvg, "haskell"]],
      href: "https://github.com/chess10kp/evalyn",
    },
  ],
};
