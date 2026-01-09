import { Project } from "@/lib/types";
import supabase from "@/assets/images/supabase.svg";
import typescriptsvg from "@/assets/images/Typescript.svg";
import nextsvg from "@/assets/images/nextjs.svg";
import geminisvg from "@/assets/images/gemini.svg";
import fastapisvg from "@/assets/images/fastapi.svg";
import javasvg from "@/assets/images/Java.svg";
import langchainsvg from "@/assets/images/langchain.svg";
import cs from "@/assets/images/CS.svg";
import pythonSvg from "@/assets/images/Python.svg";
import haskellSvg from "@/assets/images/Haskell.svg";
import reactSvg from "@/assets/images/React.svg";
import nextSvg from "@/assets/images/nextjs.svg";
import geminiSvg from "@/assets/images/gemini.svg";
import fastAPISvg from "@/assets/images/fastapi.svg";
import typescriptSvg from "@/assets/images/Typescript.svg";
import javaSvg from "@/assets/images/Java.svg";
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
    software: ["Next.js", "React", "Typescript", "C#", "ASP.NET"],
    ml: ["Pytorch", "Tensorflow", "NumPy", "Pandas"],
    llm: ["LangChain"],
  },
  projects: [
    {
      name: "Chatherine",
      description:
        "Non-technical business owners lack the expertise to manage web hosting and deployments. Chatherine is a content management system that lets business owners update content on their website and app with a Telegram Bot.",
      stack: [
        [typescriptsvg, "typescript"],
        [nextsvg, "next.js", true],
        [geminisvg, "google gemini", true],
        [fastapisvg, "fastapi", true],
      ],
      href: "https://github.com/inkscribe-org/chatherine",
      demo: "",
      image: "",
      blogId: "",
    },
    {
      name: "Babelfish",
      description:
        "Discord doesn't have a native translation layer despite hosting thousands of diverse communities. BabelFish is an AI layer on top of Discord to translate messages in real-time and provides instant chat summarization",
      stack: [
        [typescriptsvg, "typescript"],
        [geminisvg, "google gemini", true],
        [fastapisvg, "fastapi", true],
        [langchainsvg, "langchain", true],
      ],
      href: "https://devpost.com/software/babelfetch",
      demo: "https://devpost.com/software/babelfetch",
      image: "",
      blogid: "babelfish",
    },

    // {
    //   name: "hd4",
    //   demo: "",
    //   image: "",
    //   description:
    //     "a cross platform mobile app for um dearborn's hackdearborn 4",
    //   stack: [
    //     [typescriptsvg, "typescript"],
    //     [reactsvg, "react native"],
    //     [javasvg, "java"],
    //     [supabase, "supabase"],
    //   ],
    //   href: "https://play.google.com/store/apps/details?id=org.hackdearborn.hackdearbornapp&pli=1",
    //   blogid: "hd4",
    // },
    {
      name: "Chessbreak",
      description:
        "Chess players often lose focus by continuing to play when they are tired. Chessbreak is an extension that monitors accuracy and tracks sessions on chess.com. This blocks users when their play quality drops, ensuring they only play at their best.",
      stack: [[typescriptsvg, "typescript"]],
      href: "https://github.com/inkscribe-org/chessbreak",
      demo: "https://github.com/inkscribe-org/chessbreak",
      image: "",
      blogid: "improving_my_rating",
    },
    // {
    //   name: "socraticoin",
    //   demo: "",
    //   image: "",
    //   description:
    //     "an interactive blockchain simulation platform that implements core cryptocurrency protocols and consensus mechanisms",
    //   stack: [
    //     [typescriptsvg, "typescript"],
    //     [reactSvg, "React"],
    //     [pythonSvg, "Python"],
    //     [fastAPISvg, "FastAPI"],
    //   ],
    //   href: "https://github.com/chess10kp/socraticoin",
    //   blogId: "socraticoin",
    // },
    // {
    //   name: "Snip",
    //   demo: "",
    //   image: "",
    //   description: "A JS-style interpreted programming language",
    //   stack: [[cs, "C#"]],
    //   href: "https://github.com/snip-lang/snip",
    //   blogId: "snip",
    // },
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
