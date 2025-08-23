"use client";
import { motion, Variants } from "framer-motion";

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.0, ease: "easeInOut" } },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

const loadingBarVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      repeat: 0,
      repeatType: "reverse",
    },
  },
};

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      variants={loaderVariants as Variants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1
        className="geist text-4xl font-bold text-foreground"
        variants={textVariants as Variants}
      >
        N M
      </motion.h1>
      <div className="w-32 h-1 mt-4 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          variants={loadingBarVariants as Variants}
        />
      </div>
    </motion.div>
  );
};

export default Loader;
