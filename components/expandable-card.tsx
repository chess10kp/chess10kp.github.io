"use client";
import config from "@/siteConfig";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Image from "next/image";
import { Github } from "@geist-ui/icons";

const projectsList = config.projects;

const tween = {
  type: "tween",
  duration: 0.05,
  ease: "easeInOut",
};

const Projects = () => {
  const [active, setActive] = useState<(typeof projectsList)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section id="projects" className="py-16">
      <div className="flex flex-col">
        <h2 className="geist text-3xl font-bold text-left my-8">
          Stuff I've made
        </h2>
        
        {/* Background Overlay - Already uses opacity transition */}
        <AnimatePresence>
          {active && typeof active === "object" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
          )}
        </AnimatePresence>
        
        {/* Modal Container */}
        <AnimatePresence>
          {active && typeof active === "object" ? (
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.button
                key={`button-${active.name}-${id}`}
                // Removed layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05, type: "tween" } }}
                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                // REMOVED layoutId={`card-${active.name}-${id}`}
                initial={{ opacity: 0, scale: 0.95 }} // Add a subtle scale for entry
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={tween} // Use the defined tween for a clean fade
                ref={ref}
                className="w-full max-w-[400px] h-full md:h-fit md:max-h-[90%] flex flex-col border-0 backdrop-blur-xl bg-card/50 rounded-lg sm:rounded-3xl overflow-hidden transition duration-200 hover:bg-card/90"
              >
                {/* Note: Image component removed from original code, kept as is */}

                <div>
                  <div className="flex justify-between items-start p-4">
                    <div>
                      <motion.h3
                        // REMOVED layoutId={`title-${active.name}-${id}`}
                        className="geist font-bold text-lg"
                      >
                        {active.name}
                      </motion.h3>
                      <motion.p
                        // REMOVED layoutId={`description-${active.name}-${id}`}
                        className="text-left geist text-lg text-muted-foreground"
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    <div className="flex gap-2">
                      {active.href && (
                        <motion.a
                          // REMOVED layoutId={`github-${active.name}-${id}`}
                          href={active.href}
                          target="_blank"
                          className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                        >
                          <Github width="16" height="16" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  <div className="pt-4 relative px-4">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                    >
                      <div className="flex flex-wrap gap-1">
                        {active.stack.map((tech, i) => (
                          <Image
                            key={i}
                            src={tech[0]}
                            width="20"
                            height="20"
                            alt="svg icon"
                            className={`${tech[2] == true ? "dark:invert" : ""}`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : null}
        </AnimatePresence>
        
        {/* Project Grid */}
        <ul className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projectsList.map((project, _) => (
            <motion.div
              // REMOVED layoutId={`card-${project.name}-${id}`}
              key={project.name}
              onClick={() => setActive(project)}
              className="h-full text-center border-0 backdrop-blur-xl bg-card/50 rounded-lg transition duration- hover:bg-card/90 flex flex-col cursor-pointer"
            >
              <div className="flex flex-col h-full p-6">
                
                <motion.h3
                  // REMOVED layoutId={`title-${project.name}-${id}`}
                  className="geist font-bold text-lg mb-2"
                >
                  {project.name}
                </motion.h3>
                
                <motion.p
                  // REMOVED layoutId={`description-${project.name}-${id}`}
                  className="text-left geist text-lg text-muted-foreground mb-4 flex-grow"
                >
                  {project.description}
                </motion.p>
                
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex flex-wrap gap-1">
                    {project.stack.slice(0, 3).map((tech, i) => (
                      <Image
                        key={i}
                        src={tech[0]}
                        width="20"
                        height="20"
                        alt="svg icon"
                        className={`${tech[2] == true ? "dark:invert" : ""}`}
                      />
                    ))}
                    {project.stack.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{project.stack.length - 3}</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.href && (
                      <motion.a
                        // REMOVED layoutId={`github-${project.name}-${id}`}
                        href={project.href}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                      >
                        <Github width="16" height="16" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </ul>
      </div>
    </section>
  );
};

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05, type: "tween" } }}
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

export default Projects;
