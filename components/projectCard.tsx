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
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import { motion } from "framer-motion";

export type Project = {
  name: string;
  description: string;
  stack: [StaticImport, string, boolean?][];
  href: string;
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className="h-full text-center border-0 backdrop-blur-screen bg-card/50 rounded-lg transition duration-500 hover:bg-card/90 flex flex-col">
        <CardHeader>
          <CardTitle className="geist">{project.name}</CardTitle>
        </CardHeader>
        <CardDescription className="text-left geist text-lg text-muted-foreground mx-8">
          {project.description}
        </CardDescription>
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
          <Link href={project.href}>
            <Github width="20" height="20"></Github>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
