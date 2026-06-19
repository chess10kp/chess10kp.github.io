"use client";
import { Badge } from "@/components/ui/badge";

interface ExperienceCardProps {
  position: string;
  employer: string;
  timeline: string;
  description: string;
  tech: string[];
  delay?: number;
}

const ExperienceCard = ({ position, employer, timeline, description, tech, delay = 0 }: ExperienceCardProps) => {
  return (
    <div className="py-1.5 mb-6 pl-4 border-l border-border">
      <div className="space-y-2 flex-col gap-4 text-left">
        <div className="mb-8">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="md:text-base gap-2 flex flex-col md:flex-row font-mono font-semibold">
              <span className="text-accent text-xl">{position}</span>
              <span className="text-muted-foreground text-xl md:flex hidden mx-1">@</span>
              <span className="md:text-xl text-md text-foreground">{employer}</span>
            </div>
            <div className="md:flex hidden flex-wrap gap-1.5 shrink-0">
              {tech.map((t) => (
                <span key={t} className="px-2 py-0.5 text-xs font-mono bg-secondary text-accent-foreground rounded-none">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="text-muted-foreground mt-4 text-left font-mono font-semibold text-md">
            {timeline}
          </div>
        </div>
        {description &&
          description.split(".").filter(Boolean).map((p, i) => (
            <p key={i} className="text-muted-foreground font-mono text-sm leading-relaxed">
              {p}
            </p>
          ))}
      </div>
    </div>
  );
};

interface ExperienceData {
  position: string;
  employer: string;
  timeline: string;
  description: string;
  tech: string[];
}

export function Experience({ experiences }: { experiences: ExperienceData[] }) {
  return (
    <div id="experience" className="scroll-mt-24">
      <div className="org-modern-headline">
        <h2 className="font-semibold font-mono text-foreground">Experience</h2>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {experiences.map((exp, i) => (
          <div key={i} className="w-full">
            <ExperienceCard {...exp} delay={i * 80} />
          </div>
        ))}
      </div>
    </div>
  );
}
