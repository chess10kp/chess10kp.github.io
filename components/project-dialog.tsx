import { Project } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  if (!project) {
    return null;
  }

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
        </DialogHeader>
        <div>
          {project.image && (
            <Image
              src={project.image}
              alt={project.name}
              width={500}
              height={300}
              className="rounded-lg object-cover"
            />
          )}
          <p className="mt-4">{project.description}</p>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Website
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
