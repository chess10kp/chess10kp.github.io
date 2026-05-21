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
import rustSvg from "@/assets/images/rust.svg";
import nodeSvg from "@/assets/images/Node.svg";
import awsSvg from "@/assets/images/AWS.svg";
import mongoSvg from "@/assets/images/MongoDB.svg";
import jsSvg from "@/assets/images/Javascript.svg";

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
      name: "Triad",
      description:
        "Uncompromising trimodal remote computer accessibility. Best Accessibility Hack at SpartaHack 11.",
      stack: [
        [pythonSvg, "python"],
        [geminisvg, "gemini", true],
      ],
      href: "https://devpost.com/software/the-four",
      demo: "https://devpost.com/software/the-four",
      image: "",
      blogId: "",
    },
    {
      name: "Checkpoint",
      description:
        "Your chessboard plays on anyone's screen. Winner of the Hardware Track & Jaseci Labs Best Use of Agentic AI at RocketHacks 2026.",
      stack: [
        [awsSvg, "aws"],
        [jsSvg, "javascript"],
        [reactSvg, "react native"],
      ],
      href: "https://devpost.com/software/checkpoint-bywsm1",
      demo: "https://devpost.com/software/checkpoint-bywsm1",
      image: "",
      blogId: "",
    },
    {
      name: "PinPoint",
      description:
        "Your desk is your classroom. 2nd Place and MLH Best Use of Vultr at GrizzHacks 8.",
      stack: [[pythonSvg, "python"]],
      href: "https://devpost.com/software/embettered",
      demo: "https://devpost.com/software/embettered",
      image: "",
      blogId: "",
    },
    {
      name: "Hijac",
      description:
        "Hijacks your routine. 1st Place in the Social Impact Track at JacHacks.",
      stack: [[typescriptsvg, "typescript"]],
      href: "https://devpost.com/software/hijac",
      demo: "https://devpost.com/software/hijac",
      image: "",
      blogId: "",
    },
    {
      name: "Tether",
      description:
        "A tether to your financial goals. 1st Place at WayneHacks 4.",
      stack: [[reactSvg, "react native"]],
      href: "https://devpost.com/software/tether-nw1i2x",
      demo: "https://devpost.com/software/tether-nw1i2x",
      image: "",
      blogId: "",
    },
    {
      name: "X Wrapped",
      description:
        "Generate personalized X (Twitter) personality wrapped experiences with AI-powered analysis and cinematic video generation. Best Use of Magic Hour at FalconHacks by MongoDB.",
      stack: [
        [mongoSvg, "mongodb"],
        [typescriptsvg, "typescript"],
      ],
      href: "https://devpost.com/software/x-wrapped",
      demo: "https://devpost.com/software/x-wrapped",
      image: "",
      blogId: "",
    },
    {
      name: "Chesh",
      description:
        "An opensource TUI chess game viewer written in Ink, using the Lichess API.",
      stack: [[typescriptsvg, "typescript"]],
      href: "https://github.com/chess10kp/chesh",
      demo: "https://www.npmjs.com/package/chesh",
      image: "",
      blogId: "",
    },
    {
      name: "Chessbreak",
      description:
        "Chess players often lose focus by continuing to play when they are tired. Chessbreak is an extension that monitors accuracy and tracks online chess sessions. This blocks users when their play quality drops, ensuring they only play at their best.",
      stack: [[typescriptsvg, "typescript"]],
      href: "https://github.com/inkscribe-org/chessbreak",
      demo: "https://github.com/inkscribe-org/chessbreak",
      image: "",
      blogid: "improving_my_rating",
    },
    {
      name: "MType",
      description:
        "A lightweight, local first monkeytype alternative that still looks good",
      stack: [[typescriptsvg, "typescript"]],
      href: "https://github.com/chess10kp/mtype",
      demo: "typing.nitinm.dev",
      image: "",
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
