"use client";
import React, { useState, useEffect } from "react";
import siteConfig from "@/siteConfig";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const ChessSvg = (props: any) => (
  <svg
    width={14}
    height={14}
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

const Footer = () => {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getBufferName = () => {
    if (pathname === "/") return "index.org";
    if (pathname === "/about") return "about.org";
    if (pathname.startsWith("/blog")) return "blog.org";
    if (pathname.startsWith("/projects")) return "projects.org";
    return pathname.replace(/\//g, "") + ".org";
  };

  const getModeName = () => {
    if (pathname === "/") return "Website";
    if (pathname === "/about") return "About";
    if (pathname.startsWith("/blog")) return "Blog";
    if (pathname.startsWith("/projects")) return "Projects";
    return "Fundamental";
  };

  const getTimeString = () => {
    return currentTime.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const bufferName = getBufferName();
  const modeName = getModeName();
  const timeString = getTimeString();
  const lineCol = "L1 C1";

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/chess10kp",
      label: "GitHub",
      username: "@chess10kp",
    },
    {
      icon: Linkedin,
      href: siteConfig.links.linkedin,
      label: "LinkedIn",
      username: "Nitin Shankar Madhu",
    },
    {
      icon: Mail,
      href: siteConfig.links.email,
      label: "Email",
      username: siteConfig.links.email,
    },
    {
      icon: ChessSvg,
      href: siteConfig.links.chess,
      label: "Chess",
      username: "chess10kp",
    },
  ];

  return (
    <>
      {/* Emacs Mode Line */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] bg-background border-t border-border">
        <div className="flex items-center justify-between px-2 md:px-4 py-1 text-xs font-mono">
          {/* Left: Buffer info */}
          <div className="flex items-center gap-2">
            <span className="text-foreground font-bold">---</span>
            <span className="text-foreground/80">{bufferName}</span>
            <span className="text-foreground/60">--</span>
            <span className="text-accent font-semibold">{modeName}</span>
            <span className="text-foreground/60">--</span>
            <span className="text-foreground/60">L1</span>
            <span className="text-foreground/60">--</span>
            <span className="text-foreground/60">C1</span>
            <span className="text-foreground/60">--</span>
            <span className="text-foreground/80">Fundamental</span>
          </div>

          {/* Center: Social links */}
          <div className="hidden md:flex items-center gap-1">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-foreground hover:bg-foreground/20 px-2 py-0.5 transition-all duration-100"
                aria-label={link.label}
              >
                {link.icon === ChessSvg ? (
                  <ChessSvg />
                ) : (
                  <link.icon size={11} />
                )}
              </motion.a>
            ))}
          </div>

          {/* Right: Time and position */}
          <div className="flex items-center gap-2">
            <span className="text-foreground/60">U</span>
            <span className="text-foreground/60">--</span>
            <span className="text-foreground/80">UTF-8</span>
            <span className="text-foreground/60">--</span>
            <span className="text-foreground/80">Top</span>
            <span className="text-foreground/60">--</span>
            <span className="text-foreground font-bold">{timeString}</span>
          </div>
        </div>
      </div>

      {/* Add padding to main content to account for fixed mode line */}
      <div className="h-6"></div>
    </>
  );
};

export default Footer;
