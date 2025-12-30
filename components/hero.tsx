"use client";
import React, { useState } from "react";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import siteConfig from "@/siteConfig";
import { AnimatedSection } from "./animated-section";

const ChessSvg = (props: any) => (
  <svg
    width={20}
    height={20}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    {...props}
  >
    <path
      fill="currentColor"
      d="M232 152A72 72 0 1 0 88 152a72 72 0 1 0 144 0zm24 120l-12.6 0 10.7 80-48.4 0L195 272l-35 0-35 0-10.7 80-48.4 0 10.7-80L64 272c-13.3 0-24-10.7-24-24s10.7-24 24-24c-15.1-20.1-24-45-24-72C40 85.7 93.7 32 160 32s120 53.7 120 120c0 27-8.9 51.9-24 72c13.3 0 24 10.7 24 24s-10.7 24-24 24zM52.7 464l214.7 0-16.6-32L69.2 432 52.7 464zm207.9-80c12 0 22.9 6.7 28.4 17.3l26.5 51.2c3 5.8 4.6 12.2 4.6 18.7c0 22.5-18.2 40.8-40.8 40.8L40.8 512C18.2 512 0 493.8 0 471.2c0-6.5 1.6-12.9 4.6-18.7l26.5-51.2C36.5 390.7 47.5 384 59.5 384l201 0z"
    />
  </svg>
);

const Hero = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/chess10kp",
      label: "GitHub",
      color: "hover:text-gray-400",
      username: "@chess10kp",
    },
    {
      icon: Linkedin,
      href: siteConfig.links.linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-500",
      username: "Nitin Shankar Madhu",
    },
    {
      icon: Mail,
      href: "mailto:" + siteConfig.links.email,
      label: "Email",
      color: "hover:text-green-500",
      username: siteConfig.links.email,
      copyable: true,
    },
    {
      icon: ChessSvg,
      href: siteConfig.links.chess,
      label: "Chess",
      color: "hover:text-yellow-500",
      username: "chess10kp",
    },
  ];

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section className="flex flex-col space-y-6">
      <div className="pt-8">
        <AnimatedSection className="geist text-lg md:text-xl text-muted-foreground space-y-6">
          <p>
            I'm Nitin, a student at UMich. I love making software. Currently SWE Intern at
            Ancor.
          </p>
          <p className="">
            Wanna know more about{" "}
            <a
              href="/about"
              className="text-accent hover:underline ml-1 transition-colors"
            >
              me?
            </a>
          </p>
        </AnimatedSection>
      </div>

      {/* Social Links */}

      <motion.div
        className="flex items-center gap-4 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
          <p className="">
            Reach out to me:
          </p>
        {socialLinks.map((link, idx) => (
          <motion.div
            key={idx}
            className="relative group"
            onMouseEnter={() => setActiveTooltip(idx)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <motion.button
              onClick={
                link.copyable ? () => handleCopyEmail(link.username) : undefined
              }
              className={`p-3 text-muted-foreground transition-all duration-300 rounded-lg hover:bg-card/50 ${link.color}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={link.label}
            >
              {link.copyable && copiedEmail && link.username.includes("@") ? (
                <Check size={18} className="text-green-500" />
              ) : link.icon === ChessSvg ? (
                <ChessSvg />
              ) : (
                <link.icon size={18} />
              )}
            </motion.button>

            <AnimatePresence>
              {activeTooltip === idx && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-lg border border-border whitespace-nowrap z-50"
                >
                  <div className="text-sm font-medium">{link.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {link.username}
                  </div>
                  {link.copyable && (
                    <div className="text-xs text-blue-500 mt-1">
                      Click to copy
                    </div>
                  )}
                  {!link.copyable && (
                    <ExternalLink size={12} className="inline ml-1" />
                  )}

                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-l border-b border-border rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* External link handler */}
            {!link.copyable && (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label={`Visit ${link.label}`}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Success Toast for Email Copy */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 left-6 z-50 bg-green-500/10 border border-green-500/20 text-green-500 px-4 py-3 rounded-lg backdrop-blur-xl flex items-center gap-2"
          >
            <Check size={18} />
            <span className="text-sm font-medium">
              Email copied to clipboard!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
