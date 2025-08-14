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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const SkillCard = ({ name, icon }: SkillCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card className="h-full bg-card/50 hover:bg-card/90 transition-colors duration-300 flex flex-col items-center justify-center p-6">
        <CardHeader className="p-0 flex-col items-center gap-4">
          {icon ? (
            <Image
              src={icon}
              width={40}
              height={40}
              alt={`${name} icon`}
              className="dark:invert-0"
            />
          ) : (
            <Code className="w-10 h-10 text-muted-foreground" />
          )}
          <CardTitle className="geist text-lg font-medium text-center">
            {name}
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default SkillCard;