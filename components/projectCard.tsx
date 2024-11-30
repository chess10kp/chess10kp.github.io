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
import { Github } from "@geist-ui/icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";

export type Project = {
  name: string;
  description: string;
  stack: [StaticImport, string][];
  href: string;
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="text-center backdrop-blur-screen m-2 bg-accent/10 rounded-lg">
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
        <p className="p-2">Built with</p>
        <div className="flex flex-1 space-x-2  w-fit p-2">
          {project.stack.map((tech, i) => {
            return (
              <HoverCard key={i}>
                <HoverCardTrigger>
                  <Image src={tech[0]} width="20" height="20" alt="svg icon" />
                </HoverCardTrigger>
                <HoverCardContent className="p-0 m-0 w-fit">
                  {tech[1]}
                </HoverCardContent>
              </HoverCard>
            );
          })}
        </div>
        <Link href={project.href}>
          <Github width="20" height="20"></Github>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
