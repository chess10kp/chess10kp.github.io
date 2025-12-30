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
      <div className="mb-12">
        <p className="text-accent font-mono text-sm tracking-widest uppercase mb-2">
          Start a Conversation
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mono text-foreground/90 mb-4">
          Get in Touch
        </h2>
      </div>
      <div className="grid border border-border/30 md:grid-cols-4 bg-card/40 backdrop-blur-xl p-6 md:p-8 hover:bg-card/60 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-500">
        <div className="md:col-span-5 md:pl-8">
          <ContactForm />
        </div>
      </div>
    </motion.div>
  )
}
