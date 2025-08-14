"use client";
import { motion } from "framer-motion";

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      variants={loaderVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="geist text-4xl font-bold text-foreground"
        variants={textVariants}
      >
        NM
      </motion.h1>
    </motion.div>
  );
};

export default Loader;
