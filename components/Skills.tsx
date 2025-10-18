"use client";
import siteConfig from "@/siteConfig";
import { motion } from "framer-motion";
import SkillCard from "./skill-card";
import {
  StaticImageData,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";

// Import SVGs as static assets
import nextjs from "@/assets/images/nextjs.svg";
import react from "@/assets/images/React.svg";
import typescript from "@/assets/images/Typescript.svg";
import javascript from "@/assets/images/Javascript.svg";
import python from "@/assets/images/Python.svg";
import css from "@/assets/images/CSS.svg";
import dotnet from "@/assets/images/Dotnet.svg";
import cs from "@/assets/images/CS.svg";
import pytorch from "@/assets/images/Pytorch.svg";
import tensorflow from "@/assets/images/Tensorflow.svg";
import numpy from "@/assets/images/Numpy.svg";
import pandas from "@/assets/images/Pandas.svg";
import langchain from "@/assets/images/langchain.svg";

const iconMap: { [key: string]: StaticImport } = {
  "Next.js": nextjs,
  React: react,
  Typescript: typescript,
  Python: python,
  "HTML/CSS": css,
  "ASP.NET": dotnet,
  "C#": cs,
  Pytorch: pytorch,
  Tensorflow: tensorflow,
  Pandas: pandas,
  NumPy: numpy,
  LangChain: langchain,
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
        What I'm good at
      </h2>

      <div className="space-y-8">
        <div>
          <h3 className="geist text-2xl font-semibold text-left my-4">
            ML/LLM
          </h3>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {siteConfig.skills.ml.map((skill) => (
              <SkillCard
                key={skill}
                name={skill}
                icon={iconMap[skill] as StaticImageData}
              />
            ))}
            {siteConfig.skills.llm.map((skill) => (
              <SkillCard
                key={skill}
                name={skill}
                icon={iconMap[skill] as StaticImageData}
              />
            ))}
          </motion.div>
        </div>

        <div>
          <h3 className="geist text-2xl font-semibold text-left my-4">
            Software Development
          </h3>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {siteConfig.skills.software.map((skill) => (
              <SkillCard
                key={skill}
                name={skill}
                icon={iconMap[skill] as StaticImageData}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
