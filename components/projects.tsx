import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";

import { HoverCardTrigger, HoverCardContent, HoverCard } from "./ui/hover-card";

import cppSvg from "../assets/images/CPP.svg";
import nasmSvg from "../assets/images/Nasm.svg";
import pythonSvg from "../assets/images/Python.svg";
import haskellSvg from "../assets/images/Haskell.svg";
import reactSvg from "../assets/images/React.svg";
import nextSvg from "../assets/images/next.svg";
import fastAPISvg from "../assets/images/fastapi.svg";
import typescriptSvg from "../assets/images/Typescript.svg";

const Projects = () => {
  const projects = [
    {
      name: "Socraticoin",
      description: "An educational cryptocurrency",
      stack: [
        [typescriptSvg, "typescript"],
        [reactSvg, "react"],
        [pythonSvg, "python"],
        [fastAPISvg, "fastAPI"],
      ],
      href: "https://github.com/chess10kp/socraticoin",
    },
    {
      name: "GitGraft",
      description: "An expense tracker",
      stack: [
        [typescriptSvg, "typescript"],
        [reactSvg, "react"],
        [pythonSvg, "python"],
        [fastAPISvg, "fastAPI"],
      ],
      href: "https://github.com/chess10kp/graft",
    },
    {
      name: "Snip",
      description: "A programming language written in C++",
      stack: [
        [cppSvg, "cpp"],
        [nasmSvg, "nasm"],
      ],
      href: "https://github.com/snip-lang/snip",
    },

    {
      name: "Evalyn",
      description: "A scheme interpreter written in Haskell",
      stack: [[haskellSvg, "haskell"]],
      href: "https://github.com/chess10kp/evalyn",
    },
  ];
  return (
    <section>
      <div className="flex flex-col mx-16">
        <h2 className="font-light text-center text-4xl my-4">
          Projects I've worked on
        </h2>
        <div className="grid gap-4 grid-cols-3 grid-rows-3">
          {projects.map((project) => {
            return (
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardDescription>{project.description}</CardDescription>
                <CardContent>
                  <CardDescription className="flex flex-col justify-items-end text-bold">
                    <p>Built with</p>
                    <div className="flex">
                      {project.stack.map((tech) => {
                        return (
                          <HoverCard>
                            <HoverCardTrigger>
                              <Image
                                src={tech[0]}
                                width="20"
                                height="20"
                                alt="svg icon"
                              ></Image>
                            </HoverCardTrigger>
                            <HoverCardContent className="p-0 m-0 w-fit">
                              {tech[1]}
                            </HoverCardContent>
                          </HoverCard>
                        );
                      })}
                    </div>
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
