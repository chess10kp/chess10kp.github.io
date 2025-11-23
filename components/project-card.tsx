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
import { Github } from "@geist-ui/icons";
import Link from "next/link";
import { Project } from "@/lib/types";
import { motion } from "framer-motion";
import { useId } from "react";

const ProjectCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: (project: Project) => void;
}) => {
  const id = useId();
  
  return (
    <motion.div 
      layoutId={`project-card-${project.name}-${id}`}
      onClick={() => onClick(project)}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="h-full"
    >
      <Card className="h-full text-center border-0 backdrop-blur-xl bg-card/50 rounded-lg hover:bg-card/90 hover:border-accent/40 border-transparent transition-all duration-300 flex flex-col cursor-pointer">
        <CardHeader>
          <motion.div layoutId={`project-title-${project.name}-${id}`}>
            <CardTitle className="geist">{project.name}</CardTitle>
          </motion.div>
        </CardHeader>
        <motion.div layoutId={`project-description-${project.name}-${id}`}>
          <CardDescription className="text-left geist text-lg text-muted-foreground mx-8">
            {project.description}
          </CardDescription>
        </motion.div>
        <CardContent className="flex-grow">
          {/* This will take up the remaining space */}
        </CardContent>
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
          <motion.div layoutId={`project-github-${project.name}-${id}`}>
            <Link href={project.href} className="hover:text-accent transition-colors duration-200">
              <Github width="20" height="20"></Github>
            </Link>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
