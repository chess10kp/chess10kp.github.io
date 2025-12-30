"use client";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
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
    <AnimatedSection threshold={0.2} animation="fade-up" delay={delay}>
      <Card className="grid border-0 md:grid-cols-4 bg-card/50 backdrop-blur-xl mb-8 rounded-lg p-4">
        <CardHeader className="text-muted-foreground text-left p-0 my-2 mono md:col-span-1">
          {timeline}
        </CardHeader>
        <CardContent className="my-2 mx-0 px-0 space-y-4 text-left md:col-span-3">
          <div className="text-xl mono">
            <span className="text-accent">{position}</span> @{" "}
            <span className="text-foreground">{employer}</span>
          </div>
          <div className="text-left wrap text-muted-foreground geist">
            {description}
          </div>
          <div className="flex mono flex-wrap gap-2">
            {tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
};

export function Experience() {
  const experiences: ExperienceCardType[] = [
    {
      position: "Software Innovation Intern",
      timeline: "Jun — Present",
      employer: "Ancor",
      employer_link: "weareancor.com",
      description:
        "Developed a React Native app to track 10k auto parts through RFID scanning. Sold to client for a 5 figure annual license. Currently working on RAG and AI chatbots.",
      tech: ["Next.js", "React Native", "RAG"],
    },
    {
      position: "Research Assistant",
      timeline: "Oct - Present",
      employer: "UofM",
      employer_link: "https://github.com/chess10kp/cobas",
      description:
        "Working on wireless battery sensing with Deep Neural Networks",
      tech: ["Python", "PyTorch", "Numpy"],
    },
    {
      position: "Research Assistant",
      timeline: "Jan —  Apr 2025",
      employer: "UofM",
      employer_link: "https://github.com/chess10kp/compass",
      description:
        "Trained ML models to detect bias in inmate sentencing classification systems. Developed fairness-aware algorithms to compensate for bias in predictive models",
      tech: ["Python", "PyTorch", "Numpy", "Tensorflow"],
    },
    {
      position: "Development Intern",
      timeline: "May — Aug 2024",
      employer: "Michigan Medicine",
      employer_link: "https://www.michiganmedicine.org",
      description:
        "Analyzed patient family engagment data with Python to uncover behaviorial trends. Conducted data analysis with python to visualize findings for internal research.",
      tech: ["Python", "Matplotlib", "Numpy"],
    },
  ];
  return (
    <div id="experience">
      <h2 className="text-3xl mono text-muted-foreground/30 font-bold text-left my-4">
        ** updates
      </h2>
      {experiences.map((exp, i) => (
        <ExperienceCard
          key={i}
          tech={exp.tech}
          position={exp.position}
          timeline={exp.timeline}
          employer={exp.employer}
          employer_link={exp.employer_link}
          description={exp.description}
          delay={i * 100}
        />
      ))}
    </div>
  );
}
