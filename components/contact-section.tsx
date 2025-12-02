"use client";
import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact-form"
import { UserIcon, Mail, Phone, MapPin, Clock } from "lucide-react"
import { SocialLinks } from "@/components/social-links"
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
      <h2 className="mono underline underline-offset-8 text-3xl font-bold text-left my-4 text-accent">
        Get in Touch
      </h2>
      <div className="grid border-0 md:grid-cols-4 bg-card/50 backdrop-blur-xl rounded-lg p-6 mb-8">
        <div className="md:col-span-5 md:pl-8">
          <ContactForm />
        </div>
      </div>
    </motion.div>
  )
}
