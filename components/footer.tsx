"use client";
import React, { useState, useEffect } from "react";
import siteConfig from "@/siteConfig";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import { usePathname } from "next/navigation";

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

  return (
    <>
      {/* Emacs Mode Line */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-between px-4 py-1 text-xs font-mono">
          {/* Left: Buffer info */}
          <div className="flex items-center space-x-4">
            <span className="text-foreground">{bufferName}</span>
            <span className="text-muted-foreground hidden sm:inline">---</span>
            <span className="text-accent hidden sm:inline">{modeName}</span>
            <span className="text-muted-foreground hidden md:inline">---</span>
            <span className="text-muted-foreground hidden md:inline">{lineCol}</span>
          </div>
          
          {/* Center: Social links as mini-icons */}
          <div className="hidden md:flex items-center space-x-3">
            <a 
              href="https://github.com/chess10kp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="GitHub"
            >
              <Github size={12} />
            </a>
            <a 
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="LinkedIn"
            >
              <Linkedin size={12} />
            </a>
            <a 
              href={siteConfig.links.email}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Email"
            >
              <Mail size={12} />
            </a>
            <a 
              href={siteConfig.links.chess}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Chess"
            >
              <ChessSvg />
            </a>
          </div>
          
          {/* Right: Time and position */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-muted-foreground hidden sm:inline">(U)</span>
            <span className="text-muted-foreground hidden sm:inline">UTF-8</span>
            <span className="text-foreground">{timeString}</span>
          </div>
        </div>
      </div>

      {/* Add padding to main content to account for fixed mode line */}
      <div className="h-6"></div>
    </>
  );
};

export default Footer;
