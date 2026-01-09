"use client";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/lib/types";
import { useId } from "react";

const ProjectCard = ({ project }: { project: Project }) => {
  const id = useId();

  return (
    <Link href={`/blog/${project.blogId}`}>
      <motion.div
        className="h-full"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Card className="h-full text-center border border-border bg-card/50 rounded-none hover:bg-accent/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] transition-all duration-300 flex flex-col cursor-pointer">
          <CardHeader className="border-b border-border">
            <CardTitle className="font-mono text-accent ">
              {project.name}
            </CardTitle>
          </CardHeader>
          <div>
            <CardDescription className="text-left font-mono text-muted-foreground p-4">
              {project.description}
            </CardDescription>
          </div>
          <CardContent className="flex-grow"></CardContent>
          <CardFooter>
            <div className="flex flex-1 space-x-2 w-fit p-2">
              <TooltipProvider delayDuration={100}>
                {project.stack.map((tech, i) => {
                  return (
                    <Tooltip key={i}>
                      <TooltipTrigger>
                        <Image
                          src={tech[0]}
                          width="20"
                          height="20"
                          alt="svg icon"
                          className={`${tech[2] == true ? "dark:invert" : ""}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent className={`p-0 mono m-0 w-fit `}>
                        {tech[1]}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>
            <div>
              <Link
                href={project.href}
                className="hover:text-accent transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                Demo
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
