"use client";
import siteConfig from "@/siteConfig";
import { motion } from "framer-motion";
import SkillCard from "./skill-card";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// Import SVGs as static assets
import nextjsSvg from "@/assets/images/nextjs.svg";
import reactSvg from "@/assets/images/React.svg";
import typescriptSvg from "@/assets/images/Typescript.svg";
import javascriptSvg from "@/assets/images/Javascript.svg";
import pythonSvg from "@/assets/images/Python.svg";
import cssSvg from "@/assets/images/CSS.svg";

const iconMap: { [key: string]: StaticImport } = {
  "Next.js": nextjsSvg,
  React: reactSvg,
  Typescript: typescriptSvg,
  Javascript: javascriptSvg,
  Python: pythonSvg,
  "HTML/CSS": cssSvg,
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Skills = () => {
  return (
    <div id="skills">
      <h2 className="geist text-3xl font-bold text-left my-8">
        Technical Skills
      </h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="geist text-2xl font-semibold text-left my-4">Software</h3>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {siteConfig.skills.software.map((skill) => (
              <SkillCard key={skill} name={skill} icon={iconMap[skill]} />
            ))}
          </motion.div>
        </div>

        <div>
          <h3 className="geist text-2xl font-semibold text-left my-4">Machine Learning</h3>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {siteConfig.skills.ml.map((skill) => (
              <SkillCard key={skill} name={skill} icon={iconMap[skill]} />
            ))}
          </motion.div>
        </div>

        <div>
          <h3 className="geist text-2xl font-semibold text-left my-4">LLM Technologies</h3>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {siteConfig.skills.llm.map((skill) => (
              <SkillCard key={skill} name={skill} icon={iconMap[skill]} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Skills;