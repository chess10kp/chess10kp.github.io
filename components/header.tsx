"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
    { name: "About", link: "/about" },
    { name: "Projects", link: "/#projects" },
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isBlogPage
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center max-w-full justify-evenly px-4">
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} className="">
            <div className="text-2xl  mono font-bold bg-gradient-to-r bg-foreground bg-clip-text text-transparent cursor-pointer">
              {siteConfig.personal.name}
            </div>
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <motion.button
              key={idx}
              onClick={() => scrollToSection(item.link)}
              className={`relative text-sm font-medium transition-colors duration-200 mono ${
                isActiveLink(item.link)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              {item.name}
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-accent"
                initial={isActiveLink(item.link) ? { width: "100%" } : { width: "0%" }}
                animate={isActiveLink(item.link) ? { width: "100%" } : { width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.1 }}
              />
            </motion.button>
          ))}
          <motion.button
            onClick={() => router.push("/blog")}
            className={`relative text-sm font-medium transition-colors duration-200 mono ${
              isBlogPage
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            Blog
            <motion.div
              className="absolute -bottom-1 left-0 h-0.5 bg-accent"
              initial={isBlogPage ? { width: "100%" } : { width: "0%" }}
              animate={isBlogPage ? { width: "100%" } : { width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.1 }}
            />
          </motion.button>
        </nav>

        <div className="flex items-center gap-4 absolute right-4">
          <motion.button
            className="md:hidden p-2 rounded-lg bg-card/50 hover:bg-card/80 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/40"
          >
            <div className="container px-4 py-6">
              <nav className="flex flex-col gap-4">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      scrollToSection(item.link);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left text-lg font-medium transition-colors py-2 mono ${
                      isActiveLink(item.link)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => {
                    router.push("/blog");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-medium transition-colors py-2 mono ${
                    isBlogPage
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 * 0.1 }}
                  whileHover={{ x: 10 }}
                >
                  Blog
                </motion.button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
