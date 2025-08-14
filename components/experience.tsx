import { AnimatedSection } from "./animated-section";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

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
  employer_link,
  description,
  tech,
  delay,
}: ExperienceCardType) => {
  return (
    <AnimatedSection delay={delay} forceAnimate={true}>
      <Card className="grid border-0 md:grid-flow-row md:grid-cols-2 ">
        <CardHeader className="text-slate-500 text-left p-0 my-2">
          {timeline}
        </CardHeader>
        <CardContent className="my-2 mx-0 px-0 space-y-4 text-left">
          <div className="text-xl">
            {position} @ {employer}
          </div>
          <div className="text-left wrap">{description}</div>
          <div className="float-start flex">
            {tech.map((tech) => (
              <Badge className="ml-2">{tech}</Badge>
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
    <div
      id="experience"
      className="text-center w-fit flex-col mt-16 items-center m-auto"
    >
      <AnimatedSection delay={100} forceAnimate={true}>
        <h2 className="mono text-2xl text-left my-4">Experience</h2>
      </AnimatedSection>
      <div className="text-center w-fit">
        {experiences.map((exp, i) => (
          <ExperienceCard
            tech={exp.tech}
            position={exp.position}
            timeline={exp.timeline}
            employer={exp.employer}
            employer_link={exp.employer_link}
            description={exp.description}
            delay={100 +  i * 100}
          />
        ))}
      </div>
    </div>
  );
}
