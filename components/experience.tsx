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
      <Card className="grid border border-border/30 md:grid-cols-4 bg-card/40 backdrop-blur-xl mb-6 p-6 hover:bg-card/60 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500">
        <CardHeader className="text-muted-foreground text-left p-0 my-2 mono md:col-span-1 font-semibold">
          {timeline}
        </CardHeader>
        <CardContent className="my-2 mx-0 px-0 space-y-5 text-left md:col-span-3">
          <div className="text-xl md:text-2xl mono font-semibold">
            <span className="text-accent">{position}</span>
            <span className="text-muted-foreground mx-2">@</span>
            <span className="text-foreground">{employer}</span>
          </div>
          <p className="text-muted-foreground geist leading-relaxed">
            {description}
          </p>
          <div className="flex mono flex-wrap gap-2">
            {tech.map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary"
                className="bg-card/50 hover:bg-accent/10 transition-colors"
              >
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
    <div id="experience" className="scroll-mt-24">
      <AnimatedSection animation="fade-up">
        <div className="mb-12">
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-2">
            Professional Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mono text-foreground/90">
            Experience
          </h2>
        </div>
      </AnimatedSection>
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
