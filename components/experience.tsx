"use client";
import { AnimatedSection } from "./animated-section";

type ExperienceCardType = {
  timeline: string;
  position: string;
  employer: string;
  employer_link: string;
  description: string;
  tech: string[];
  delay?: number;
};

const ExperienceCard = ({
  timeline,
  position,
  employer,
  description,
  tech,
  delay = 0,
}: ExperienceCardType) => {
  return (
    <AnimatedSection
      className="w-full"
      threshold={0.2}
      animation="fade-up"
      delay={delay}
    >
      <div className="py-1.5 mb-6 pl-4 border-l border-border">
        <div className="space-y-2 flex-col gap-4  text-left">
          <div className="mb-8">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="md:text-base gap-2 flex flex-col md:flex-row font-mono font-semibold">
                <span className="text-accent text-xl">{position}</span>
                <span className="text-muted-foreground text-xl md:flex hidden mx-1">
                  @
                </span>
                <span className=" md:text-xl text-md  text-foreground">
                  {employer}
                </span>
              </div>

              <div className="md:flex hidden flex-wrap gap-1.5 shrink-0">
                {tech.map((t: string) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-xs font-mono bg-secondary text-accent-foreground rounded-none"
                  >
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
            description
              .split(".")
              .filter(Boolean)
              .map((p, i) => (
                <p
                  key={i}
                  className="text-muted-foreground font-mono text-sm leading-relaxed"
                >
                  {p}
                </p>
              ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export function Experience() {
  const experiences: ExperienceCardType[] = [
    {
      position: "Software Innovation Intern",
      timeline: "Jun 2025 — Present",
      employer: "Ancor",
      employer_link: "weareancor.com",
      description:
        "Built a React Native RFID tracking app for 10k+ auto parts, shipped to an enterprise client. Closed out a 5-figure annual license. Currently building LLM-powered asset management tools.",
      tech: ["Next.js", "React Native", "RAG"],
    },
    {
      position: "Research Assistant",
      timeline: "Oct 2025 - Present",
      employer: "UofM",
      employer_link: "https://github.com/chess10kp/cobas",
      description:
        "Finetuning ResNet models to wirelessly predict battery charge in low-fidelity environments. Worked on feature extraction from ultrasonic chirped excitation .",
      tech: ["Python", "PyTorch", "Numpy"],
    },
    {
      position: "Student Software Developer",
      employer_link: "https://hackdearborn.com",
      timeline: "Sep 2024 — Dec 2025",
      employer: "GDG",
      description:
        "Worked on the HackDearborn's mobile app to improve event discovery and user engagement. Serving on the board as an advisor",
      tech: ["React Native", "TypeScript"],
    },
    {
      position: "Research Assistant",
      timeline: "Jan 2025 —  Apr 2025",
      employer: "UofM",
      employer_link: "https://github.com/chess10kp/compass",
      description:
        "Risk engines often perpetuate historical bias. Trained regression models and built fairness metrics to quantify bias in sentencing prediction systems.",
      tech: ["Python", "Numpy", "Tensorflow"],
    },
    {
      position: "Development Intern",
      timeline: "May 2024 — Aug 2024",
      employer: "Michigan Medicine",
      employer_link: "https://www.michiganmedicine.org",
      description:
        "Analyzed patient family engagement data to identify effective fundraising channels. Built visualizations that showed digital outreach significantly outperformed traditional mail.",
      tech: ["Python", "Matplotlib", "Numpy"],
    },
  ];
  return (
    <div id="experience" className="scroll-mt-24">
      <AnimatedSection animation="fade-up">
        <div className="org-modern-headline">
          <h2 className="font-semibold font-mono text-foreground">
            Experience
          </h2>
        </div>
      </AnimatedSection>
      <div className="flex flex-wrap gap-4 justify-center">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={i}
            tech={exp.tech}
            position={exp.position}
            timeline={exp.timeline}
            employer={exp.employer}
            employer_link={exp.employer_link}
            description={exp.description}
            delay={i * 80}
          />
        ))}
      </div>
    </div>
  );
}
