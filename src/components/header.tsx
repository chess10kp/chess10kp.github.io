"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "./pathname-provider";
import siteConfig from "@/siteConfig";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPathName = usePathname();

  const buffers = [
    { name: "index.org", link: "/", mode: "Website" },
    { name: "projects.org", link: "/projects", mode: "Projects" },
    { name: "about.org", link: "/about", mode: "About" },
    { name: "blog.org", link: "/blog", mode: "Blog" },
  ];

  const getCurrentBuffer = () => {
    if (currentPathName === "/") return buffers[0];
    if (currentPathName === "/projects") return buffers[1];
    if (currentPathName === "/about") return buffers[2];
    if (currentPathName.startsWith("/blog")) return buffers[3];
    return buffers[0];
  };

  const currentBuffer = getCurrentBuffer();

  return (
    <div className="fixed top-0 z-[60] w-full bg-background/95 backdrop-blur border-b border-border">
      <div className="flex items-center gap-1 px-2 py-1 overflow-x-auto">
        {buffers.map((buffer, idx) => {
          const isActive = currentBuffer.name === buffer.name;
          return (
            <motion.div key={buffer.name} whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
              <a
                href={buffer.link}
                className={`emacs-buffer font-mono text-sm px-3 py-1 flex-shrink-0 inline-block ${
                  isActive ? "active" : ""
                }`}
              >
                <span className="opacity-60 mr-1">{idx + 1}:</span>
                {buffer.name}
                <span className="opacity-50 ml-2 text-xs">
                  {isActive && buffer.mode}
                </span>
              </a>
            </motion.div>
          );
        })}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden ml-auto px-3 py-1 text-sm font-mono text-muted-foreground hover:text-foreground emacs-button flex-shrink-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "[×]" : "[≡]"}
        </motion.button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-2 py-2">
            {buffers.map((buffer, idx) => {
              const isActive = currentBuffer.name === buffer.name;
              return (
                <a
                  key={buffer.name}
                  href={buffer.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left font-mono text-sm px-3 py-2 flex items-center gap-2 ${
                    isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  }`}
                >
                  <span className="opacity-60">{idx + 1}:</span>
                  {buffer.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
