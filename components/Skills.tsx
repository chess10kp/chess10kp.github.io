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
    <section className="space-y-4">
      <AnimatedSection threshold={0.1} animation="fade-up" delay={0}>
        <div className="space-y-2">
          <p className="text-accent font-mono text-xs">
            ;; I work with
          </p>
          <div className="py-2">
            <div className="font-mono text-sm md:text-base text-foreground leading-relaxed">
              {allSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-block mr-2 mb-1"
                >
                  {skill}
                  {idx < allSkills.length - 1 && '::'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default Skills;
