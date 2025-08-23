"use client";

import { Card } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  onClick: () => void;
}

export function ProjectCard({ title, onClick }: ProjectCardProps) {
  return (
    <Card
      className="bg-zinc-800/50 border-zinc-700 overflow-hidden group hover:border-cyan-500/50 transition-all h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <h3 className="font-medium text-sm sm:text-base">{title}</h3>
      </div>
    </Card>
  );
}
