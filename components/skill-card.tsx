"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Code } from "lucide-react";

interface SkillCardProps {
  name: string;
  icon?: string | StaticImageData;
}

const cardVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const SkillCard = ({ name, icon }: SkillCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card className="h-full bg-card/50 hover:bg-accent/5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] border-transparent transition-all duration-300 flex flex-col items-center justify-center p-3 rounded-none">
        <CardHeader className="p-0 flex-col items-center gap-2">
          {icon ? (
            <Image
              src={icon}
              width={24}
              height={24}
              alt={`${name} icon`}
              className="dark:invert-0"
            />
          ) : (
            <Code className="w-6 h-6 text-muted-foreground group-hover:text-accent transition-colors duration-200" />
          )}
          <CardTitle className="geist text-xs font-medium text-center leading-tight">
            {name}
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default SkillCard;