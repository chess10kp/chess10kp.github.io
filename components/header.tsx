"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import siteConfig from "@/siteConfig";
import Link from "next/link";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const currentPathName = usePathname();

  const navItems = [
    { name: "Projects", link: "/#projects" },
    { name: "About", link: "/about" },
  ];

  const isBlogPage = currentPathName.startsWith("/blog");

  const isActiveLink = (link: string) => {
    if (link === "/about") {
      return currentPathName === "/about";
    }
    if (link === "/#projects") {
      return currentPathName === "/" || currentPathName === "/#projects";
    }
    return false;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (link: string) => {
    const [pathname, id] = link.split("#");
    const currentPath = currentPathName;
    const element = document.querySelector(id);

    console.log(pathname, currentPath);

    if (pathname === "/" && currentPath === "/" && id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(link);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getBufferName = () => {
    if (currentPathName === "/") return "index.org";
    if (currentPathName === "/about") return "about.org";
    if (currentPathName.startsWith("/blog")) return "blog.org";
    if (currentPathName.startsWith("/projects")) return "projects.org";
    return currentPathName.replace(/\//g, "") + ".org";
  };

  const getModeName = () => {
    if (currentPathName === "/") return "Website";
    if (currentPathName === "/about") return "About";
    if (currentPathName.startsWith("/blog")) return "Blog";
    if (currentPathName.startsWith("/projects")) return "Projects";
    return "Fundamental";
  };

  return (
    <div
      className={`fixed top-0 z-[60] w-full transition-all duration-500 border-b border-border/30 bg-background/80 backdrop-blur-xl`}
    >
      {/* Emacs-style tabbar */}
      <div className="flex items-center px-4 md:px-6 py-2 bg-background/30 overflow-x-auto">
        {/* Home tab */}
        <Link href="/" className="flex-shrink-0">
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ type: "inertia", stiffness: 400, damping: 17 }}
          >
            <div
              className={`px-4 py-2 text-base sm:text-lg transition-all duration-200 cursor-pointer border border-foreground ${
                currentPathName === "/"
                  ? "bg-background text-foreground border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
            >
              {siteConfig.personal.name}
            </div>
          </motion.div>
        </Link>

        <div className="w-px h-6 bg-border/30 mx-2" />

        {/* Projects tab */}
        <motion.button
          onClick={() => scrollToSection("/#projects")}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`px-4 py-2 text-base sm:text-lg hidden md:inline-flex transition-all duration-200 flex-shrink-0 ${
            currentPathName === "/" || currentPathName === "/#projects"
              ? "bg-secondary text-background border border-border"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          Projects
        </motion.button>

        {/* About tab */}
        <motion.button
          onClick={() => router.push("/about")}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`hidden md:inline-flex px-4 py-2 text-base sm:text-lg transition-all duration-200 flex-shrink-0 ${
            currentPathName === "/about"
              ? "bg-secondary text-background border border-border"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          About
        </motion.button>

        {/* Blog tab */}
        <motion.button
          onClick={() => router.push("/blog")}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`hidden md:inline-flex px-4 py-2 text-base sm:text-lg transition-all duration-200 flex-shrink-0 ${
            isBlogPage
              ? "bg-secondary text-background border border-border"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          Blog
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="md:hidden ml-auto px-3 py-2 text-lg text-muted-foreground hover:text-foreground hover:bg-background/50 transition-all duration-200 flex-shrink-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </motion.button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-card border-t border-border/30 overflow-hidden"
          >
            <div className="container px-4 py-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      scrollToSection(item.link);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-lg transition-all duration-200 py-3 px-4 border ${
                      isActiveLink(item.link)
                        ? "text-foreground border-border bg-background"
                        : "text-muted-foreground border-transparent hover:text-foreground hover:bg-background/50"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  onClick={() => {
                    router.push("/blog");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg  transition-all duration-200 py-3 px-4 border ${
                    isBlogPage
                      ? "text-foreground border-border bg-background"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  Blog
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
