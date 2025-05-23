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

export type Project = {
  name: string;
  description: string;
  stack: [StaticImport, string, boolean?][];
  href: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="text-center border-0 backdrop-blur-screen m-2 bg-accent/10 rounded-lg transition duration-500 hover:scale-105 ">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardDescription className="text-left mx-8">
        {project.description}
      </CardDescription>
      <CardContent>
        <CardDescription className="flex text-bold" />
      </CardContent>
      <CardFooter>
        <div className="flex flex-1 space-x-2  w-fit p-2">
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
                  <TooltipContent className={`p-0 m-0 w-fit `}>
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
  );
};

export default ProjectCard;
