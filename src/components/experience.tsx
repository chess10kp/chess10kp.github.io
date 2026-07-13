"use client";

interface ExperienceCardProps {
  position: string;
  employer: string;
  timeline: string;
  description: string;
  tech: string[];
}

const ExperienceCard = ({ position, employer, timeline, description, tech }: ExperienceCardProps) => {
  const paragraphs = description
    ? description
        .split(".")
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="border border-border bg-card/30 p-5 transition-colors hover:border-border/80 hover:bg-card/60">
      <h3 className="mb-1 text-base font-semibold leading-snug text-accent">{position}</h3>
      <p className="mb-3 text-xs font-medium text-muted-foreground">
        {employer}
        <span className="mx-1.5 text-secondary">·</span>
        {timeline}
      </p>

      {paragraphs.map((p, i) => (
        <p key={i} className="mb-2 text-sm leading-6 text-muted-foreground">
          {p}.
        </p>
      ))}

      {tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${position} technologies`}>
          {tech.map((t) => (
            <li
              key={t}
              className="border border-border bg-muted px-2 py-0.5 text-[11px] text-foreground/80"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
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
    <div id="experience" className="scroll-mt-16 sm:scroll-ml-12">
      <header className="mb-7">
        <p
          id="experience-heading"
          className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary"
        >
          Career
        </p>
      </header>

      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <ExperienceCard key={`${exp.employer}-${i}`} {...exp} />
        ))}
      </div>
    </div>
  );
}
