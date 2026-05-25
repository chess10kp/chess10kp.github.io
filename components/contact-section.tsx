"use client";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form"
import siteConfig from "@/siteConfig";

const socialLinksData = [
  { platform: "GitHub", url: siteConfig.links.github, icon: "Github" },
  { platform: "LinkedIn", url: siteConfig.links.linkedin, icon: "Linkedin" },
  { platform: "Email", url: siteConfig.links.email, icon: "Mail" },
  { platform: "Chess", url: siteConfig.links.chess, icon: "Gamepad2" },
  { platform: "LeetCode", url: siteConfig.links.leetcode, icon: "Code" },
];

export function ContactSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-semibold font-mono text-foreground mb-3">
          Reach Out
        </h2>
      </div>
      <div className="py-2">
        <div className="">
          <ContactForm />
        </div>
      </div>
    </motion.div>
  )
}
