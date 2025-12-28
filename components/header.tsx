"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
      className={`fixed top-0 z-[60] w-full transition-all duration-300 border-t border-border bg-card`}
    >
      {/* Emacs-style tabbar */}
      <div className="flex items-center px-2 py-1 bg-card overflow-x-auto">
        {/* Home tab */}
        <Link href="/" className="flex-shrink-0">
          <div
            className={`px-3 py-1 text-lg font-mono transition-colors cursor-pointer ${
              currentPathName === "/"
                ? "bg-background text-foreground border border-border"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            {siteConfig.personal.name}
          </div>
        </Link>

        {/* Projects tab */}
        <button
          onClick={() => scrollToSection("/#projects")}
          className={`px-3 py-1 text-lg hidden md:inline-flex  font-mono transition-colors flex-shrink-0 ${
            currentPathName === "/" || currentPathName === "/#projects"
              ? "bg-secondary text-background border border-border"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          Projects
        </button>

        {/* About tab */}
        <button
          onClick={() => router.push("/about")}
          className={`hidden md:inline-flex px-3 py-1 text-lg font-mono transition-colors flex-shrink-0 ${
            currentPathName === "/about"
              ? "bg-secondary text-background border border-border"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          About
        </button>

        {/* Blog tab */}
        <button
          onClick={() => router.push("/blog")}
          className={`hidden md:inline-flex px-3 py-1 text-lg font-mono transition-colors flex-shrink-0 ${
            isBlogPage
              ? "bg-secondary text-background border border-border"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          Blog
        </button>

        <button
          className="md:hidden ml-2 px-2 py-1 text-lg font-mono text-muted-foreground hover:text-foreground hover:bg-background/50 transition-colors flex-shrink-0"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-secon border-t border-border">
          <div className="container px-4 py-6">
            <nav className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    scrollToSection(item.link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left text-lg font-mono transition-colors py-2 border-b ${
                    isActiveLink(item.link)
                      ? "text-foreground border-foreground"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  router.push("/blog");
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left text-lg font-mono transition-colors py-2 border-b ${
                  isBlogPage
                    ? "text-foreground border-foreground"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                Blog
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
