"use client";
import React, { useState } from "react";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ExternalLink, ArrowRight } from "lucide-react";
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
    <section className="min-h-[70vh] flex flex-col justify-center space-y-12 py-20">
      <div className="space-y-8">
        <AnimatedSection threshold={0.1} animation="fade-up" delay={0}>
          <div className="space-y-4">
            <p className="text-accent font-mono text-sm tracking-widest uppercase">
              Hello, I'm
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight">
              Nitin
              <span className="block text-muted-foreground/60">
                Madhu
              </span>
            </h1>
          </div>
        </AnimatedSection>

        <AnimatedSection threshold={0.1} animation="fade-up" delay={150}>
          <p className="geist text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            I'm a student at UMich who loves making software. Currently a SWE Intern at
            <span className="text-accent font-medium"> Ancor</span>.
          </p>
        </AnimatedSection>

        <AnimatedSection threshold={0.1} animation="fade-up" delay={300}>
          <div className="inline-flex items-center gap-2 group cursor-pointer">
            <a
              href="/about"
              className="text-foreground hover:text-accent transition-colors duration-300 flex items-center gap-2"
            >
              <span className="text-lg geist">Learn more about me</span>
              <ArrowRight 
                size={18} 
                className="transform group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>
        </AnimatedSection>
      </div>

      {/* Social Links */}
      <AnimatedSection threshold={0.1} animation="fade-up" delay={450}>
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4 font-mono">
            Let's connect
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((link, idx) => (
              <motion.div
                key={idx}
                className="relative group"
                onMouseEnter={() => setActiveTooltip(idx)}
                onMouseLeave={() => setActiveTooltip(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
              >
                <motion.button
                  onClick={
                    link.copyable ? () => handleCopyEmail(link.username) : undefined
                  }
                  className={`relative p-4 text-muted-foreground transition-all duration-500 bg-card/30 border border-border/30 backdrop-blur-sm ${link.color}`}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 10px 30px -10px hsl(var(--primary) / 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={link.label}
                >
                  {link.copyable && copiedEmail && link.username.includes("@") ? (
                    <Check size={20} className="text-green-500" />
                  ) : link.icon === ChessSvg ? (
                    <ChessSvg />
                  ) : (
                    <link.icon size={20} />
                  )}
                </motion.button>

                <AnimatePresence>
                  {activeTooltip === idx && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 px-4 py-3 bg-popover text-popover-foreground shadow-2xl border border-border whitespace-nowrap z-50"
                    >
                      <div className="text-sm font-semibold mb-1">{link.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {link.username}
                      </div>
                      {link.copyable && (
                        <div className="text-xs text-accent mt-2 flex items-center gap-1">
                          Click to copy
                        </div>
                      )}
                      {!link.copyable && (
                        <ExternalLink size={12} className="inline ml-1 text-muted-foreground" />
                      )}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-r border-b border-border rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

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
        </div>
      </AnimatedSection>

      {/* Success Toast for Email Copy */}
      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-50 bg-green-500/10 border border-green-500/30 text-green-500 px-6 py-4 backdrop-blur-xl flex items-center gap-3 shadow-2xl"
          >
            <Check size={20} />
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
