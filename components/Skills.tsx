type SkillsProps = {};
import { AnimatedSection } from "./animated-section";
import { CodeIcon } from "lucide-react";
import { CardContent, Card } from "@/components/ui/card";
import { SkillTag } from "./skill-tag";
import siteConfig from "@/siteConfig";
import { AnimationProvider } from "@/contexts/animation-context";

const SkillTagComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 py-1 bg-zinc-800 rounded-full text-xs font-medium text-zinc-400">
      {children}
    </div>
  );
};

const Skills = () => {
  return (
    <div>
      <AnimationProvider>
        <AnimatedSection animation="fade-up" id="skills">
          <Card className="border-0">
            <CardContent className="p-0">
              <div className=" mb-4">
                <h3 className="text-2xl font-medium mono">Technical Skills</h3>
              </div>

              <div className="grid grid-cols-1  md:grid-cols-2 gap-4 sm:gap-6">
                <AnimatedSection animation="slide-right" delay={100}>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-zinc-400">
                      Machine Learning
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {siteConfig.skills.ml.map((skill, index) => (
                        <SkillTagComponent key={index}>
                          {skill}
                        </SkillTagComponent>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="slide-left" delay={200}>
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-zinc-400">
                      Development
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {siteConfig.skills.software.map(
                        (skill, index: number) => (
                          <SkillTagComponent key={index}>
                            {skill}
                          </SkillTagComponent>
                        ),
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </AnimationProvider>
    </div>
  );
};

export default Skills;
