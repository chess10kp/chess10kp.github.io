"use client";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { motion } from "framer-motion";

type ExperienceCardType = {
  timeline: string;
  position: string;
  employer: string;
  employer_link: string;
  description: string;
  tech: string[];
};

const experienceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ExperienceCard = ({
  timeline,
  position,
  employer,
  description,
  tech,
}: ExperienceCardType) => {
  return (
    <motion.div variants={experienceVariants}>
      <Card className="grid border-0 md:grid-cols-4 bg-transparent mb-8 hover:bg-accent/20 transition-colors duration-300 rounded-lg p-4">
        <CardHeader className="text-muted-foreground text-left p-0 my-2 geist md:col-span-1">
          {timeline}
        </CardHeader>
        <CardContent className="my-2 mx-0 px-0 space-y-4 text-left md:col-span-3">
          <div className="text-xl geist">
            <span className="text-accent">{position}</span> @ <span className="text-foreground">{employer}</span>
          </div>
          <div className="text-left wrap text-muted-foreground geist">
            {description}
          </div>
          <div className="flex flex-wrap gap-2">
            {tech.map((tech) => (
              <Badge key={tech} variant="secondary" className="hover:bg-accent/20 hover:text-accent transition-colors">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
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
        "Developed a React Native app to track 10k auto parts in 3 auto warehouses and manage inventory through wireless RFID scanning. Sold to client for a 5 figure annual license. Currently working on RAG and AI chatbots.",
      tech: ["Next.js", "React Native", "RAG"],
    },
    {
      position: "Research Assistant",
      timeline: "Nov - Present",
      employer: "UofM",
      employer_link: "https://github.com/chess10kp/cobas",
      description:
        "Currently working on wireless battery sensing with Deep Neural Networks",
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
      <h2 className="geist text-3xl font-bold text-left my-4 text-accent">
        Experience
      </h2>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2 }}
      >
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={i}
            tech={exp.tech}
            position={exp.position}
            timeline={exp.timeline}
            employer={exp.employer}
            employer_link={exp.employer_link}
            description={exp.description}
          />
        ))}
      </motion.div>
    </div>
  );
}
