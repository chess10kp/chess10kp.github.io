"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import siteConfig from "@/siteConfig";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
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

  const scrollToSection = (link: string) => {
    if (link.includes("#")) {
      const [pathname, id] = link.split("#");
      if (pathname === "/" && currentPathName === "/") {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(link);
      }
    } else {
      router.push(link);
    }
  };

  const currentBuffer = getCurrentBuffer();

  return (
    <div className="fixed top-[28px] z-[60] w-full bg-background/95 backdrop-blur border-b border-border">
      {/* Emacs Tabbar */}
      <div className="flex items-center gap-1 px-2 py-1 overflow-x-auto">
        {/* Buffer tabs */}
        {buffers.map((buffer, idx) => {
          const isActive = currentBuffer.name === buffer.name;
          return (
            <motion.div
              key={buffer.name}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
            >
              {buffer.link === "/index" || buffer.link === "/" ? (
                <Link href={buffer.link}>
                  <div
                    className={`emacs-buffer font-mono text-sm px-3 py-1 flex-shrink-0 ${
                      isActive ? "active" : ""
                    }`}
                  >
                    <span className="opacity-60 mr-1">{idx + 1}:</span>
                    {buffer.name}
                    <span className="opacity-50 ml-2 text-xs">
                      {isActive && buffer.mode}
                    </span>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => scrollToSection(buffer.link)}
                  className={`emacs-buffer font-mono text-sm px-3 py-1 flex-shrink-0 ${
                    isActive ? "active" : ""
                  }`}
                >
                  <span className="opacity-60 mr-1">{idx + 1}:</span>
                  {buffer.name}
                  <span className="opacity-50 ml-2 text-xs">
                    {isActive && buffer.mode}
                  </span>
                </button>
              )}
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-2 py-2">
            {buffers.map((buffer, idx) => {
              const isActive = currentBuffer.name === buffer.name;
              return (
                <button
                  key={buffer.name}
                  onClick={() => {
                    scrollToSection(buffer.link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left font-mono text-sm px-3 py-2 flex items-center gap-2 ${
                    isActive ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                  }`}
                >
                  <span className="opacity-60">{idx + 1}:</span>
                  {buffer.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
