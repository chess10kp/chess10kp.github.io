import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

type ExperienceCardType = {
  timeline: string;
  position: string;
  employer: string;
  employer_link: string;
  description: string;
  tech: string[];
};

const ExperienceCard = ({
  timeline,
  position,
  employer,
  employer_link,
  description,
  tech,
}: ExperienceCardType) => {
  return (
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
  );
};

export function Experience() {
  const experiences: ExperienceCardType[] = [
    {
      position: "Software Engineer Intern",
      timeline: "Jun — Aug 2025",
      employer: "Ancor Automotive",
      employer_link: "ancorinfo.com",
      description: "Incoming Summer 2025 Intern",
      tech: ["Next.js", "ASP.NET"],
    },
    {
      position: "Research Assistant",
      timeline: "Jan —  Apr 2025",
      employer: "UofM",
      employer_link: "https://www.michiganmedicine.org",
      description:
        "Train a machine learning model to detect bias in classification algorithms used by judiciary to estimate inmate sentence based on inmate profiles. Developed fairness-aware algorithms to compensate for bias in predictive models",
      tech: ["Python", "PyTorch", "Numpy", "Tensorflow"],
    },
    {
      position: "Development Intern",
      timeline: "May — Aug 2024",
      employer: "Michigan Medicine",
      employer_link: "https://www.michiganmedicine.org",
      description:
        "Analyze patient family engagment to uncover behavior trends to encourage patient donor gifts. Conduct data analysis with python visualize findings for internal research.",
      tech: ["Python", "Matplotlib", "Numpy"],
    },
  ];
  return (
    <div className="mx-16 lg:mx-32 text-center w-fit flex-col items-center m-auto">
      <h2 className="mono text-2xl text-left my-4">Experience</h2>
      <div className="text-center w-fit">
        {experiences.map((exp) => (
          <ExperienceCard
            tech={exp.tech}
            position={exp.position}
            timeline={exp.timeline}
            employer={exp.employer}
            employer_link={exp.employer_link}
            description={exp.description}
          />
        ))}
      </div>
    </div>
  );
}
