"use client";
import siteConfig from "@/siteConfig";
import { AnimatedSection } from "./animated-section";

const Skills = () => {
  const allSkills = [
    ...siteConfig.skills.software,
    ...siteConfig.skills.ml,
    ...siteConfig.skills.llm,
  ];

  return (
    <section className="space-y-8">
      <AnimatedSection threshold={0.1} animation="fade-up" delay={0}>
        <div className="space-y-4">
          <p className="text-accent font-mono text-sm tracking-widest uppercase">
            I work with
          </p>
          <p className="geist text-xl md:text-2xl flex flex-wrap text-muted-foreground max-w-2xl leading-relaxed">
            {allSkills.map((skill, idx) => (
              <div className="inline-block bg-secondary text-background p-2 mr-2 mb-2" key={idx}>
                {skill}
              </div>
            ))}
          </p>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Skills;
