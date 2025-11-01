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
      staggerChildren: 0.03,
    },
  },
};

const Skills = () => {
  // Combine all skills into one array
  const allSkills = [
    ...siteConfig.skills.software,
    ...siteConfig.skills.ml,
    ...siteConfig.skills.llm,
  ];

  return (
    <div id="skills" className="mb-12">
      <h2 className="geist text-2xl font-bold text-left my-6">
        Skills & Technologies
      </h2>

      <motion.div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {allSkills.map((skill) => (
          <SkillCard
            key={skill}
            name={skill}
            icon={iconMap[skill] as StaticImageData}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
