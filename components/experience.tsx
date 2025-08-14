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
      <Card className="grid border-0 md:grid-cols-4 bg-transparent mb-8">
        <CardHeader className="text-muted-foreground text-left p-0 my-2 geist md:col-span-1">
          {timeline}
        </CardHeader>
        <CardContent className="my-2 mx-0 px-0 space-y-4 text-left md:col-span-3">
          <div className="text-xl geist text-foreground">
            {position} @ {employer}
          </div>
          <div className="text-left wrap text-muted-foreground geist">{description}</div>
          <div className="flex flex-wrap gap-2">
            {tech.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
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
      position: "Software Engineer Intern",
      timeline: "Jun — Aug 2025",
      employer: "Ancor Automotive",
      employer_link: "ancorinfo.com",
      description:
        "Developed a React Native app to track 10k auto parts in 3 warehouses and manage inventory. Built a RAG and GPT powered chatbot to query inventory to answer questions about parts availability",
      tech: ["Next.js", "React Native", "RAG"],
    },
    {
      position: "Research Assistant",
      timeline: "Jan —  Apr 2025",
      employer: "UofM",
      employer_link: "https://www.michiganmedicine.org",
      description:
        "Trained a machine learning model with Torch to detect bias inmate sentencing classification systems. Developed fairness-aware algorithms to compensate for bias in predictive models",
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
      <h2 className="geist text-3xl font-bold text-left my-4">Experience</h2>
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
