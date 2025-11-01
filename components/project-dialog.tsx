"use client";

import { Project } from "@/lib/types";
import Image from "next/image";
import { Github } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useId } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  useOutsideClick(ref, () => onClose());

  if (!project) {
    return null;
  }

  return (
    <AnimatePresence>
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 h-full w-full z-10"
        />
        <div className="fixed inset-0 grid place-items-center z-[100]">
        <motion.button
          key={`button-${project.name}-${id}`}
          layout
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.05,
            },
          }}
          className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
          onClick={onClose}
        >
          <CloseIcon />
        </motion.button>
        <motion.div
          layoutId={`project-card-${project.name}-${id}`}
          ref={ref}
          className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
        >
          <div className="p-6">
            <motion.div layoutId={`project-title-${project.name}-${id}`}>
              <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-200 mb-4">
                {project.name}
              </h2>
            </motion.div>
            
            <motion.div layoutId={`project-description-${project.name}-${id}`}>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                {project.description}
              </p>
            </motion.div>

            {project.image && (
              <motion.div layoutId={`project-image-${project.name}-${id}`}>
                <Image
                  src={project.image}
                  alt={project.name}
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full mb-6"
                />
              </motion.div>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech, i) => (
                <div key={i} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                  <Image
                    src={tech[0]}
                    width="16"
                    height="16"
                    alt="svg icon"
                    className={`${tech[2] == true ? "dark:invert" : ""}`}
                  />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    {tech[1]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <motion.div layoutId={`project-github-${project.name}-${id}`}>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-black dark:text-white"
                  >
                    <Github width="16" height="16" />
                    <span>GitHub</span>
                  </a>
                )}
              </motion.div>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm rounded-full font-bold bg-green-500 hover:bg-green-600 text-white"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      </>
    </AnimatePresence>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
