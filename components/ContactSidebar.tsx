"use client";
import info from "@/siteConfig";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import { motion } from "framer-motion";
import siteConfig from "@/siteConfig";

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

const Leetcode = (props: any) => (
  <svg
    fill="currentColor"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>LeetCode icon</title>
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

const ContactSidebar = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.div
        className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-4 p-4 bg-card/80 backdrop-blur-xl rounded-t-lg border border-border/50 border-b-0">
          {socialLinks.map((link, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setActiveTooltip(idx)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <motion.button
                onClick={
                  link.copyable
                    ? () => handleCopyEmail(link.username)
                    : undefined
                }
                className={`p-3 text-muted-foreground transition-all duration-300 rounded-lg hover:bg-card/50 ${link.color}`}
                whileHover={{ scale: 1.1, x: 5 }}
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
                    initial={{ opacity: 0, x: -10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.9 }}
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-popover text-popover-foreground rounded-lg shadow-lg border border-border whitespace-nowrap z-50"
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
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 bg-popover border-l border-t border-border rotate-45" />
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
        </div>

        {/* Connecting Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="w-px h-20 bg-gradient-to-b from-muted-foreground/50 to-transparent"
        />
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
    </>
  );
};

export { ContactSidebar };
