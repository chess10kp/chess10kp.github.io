"use client";
import { useState } from "react";
import { usePathname } from "./pathname-provider";

const buffers = [
  { name: "index.org", link: "/", mode: "Website" },
  { name: "about.org", link: "/about", mode: "About" },
  { name: "blog.org", link: "/blog", mode: "Blog" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentPathName = usePathname();

  const isActive = (link: string) =>
    link === "/"
      ? currentPathName === "/"
      : currentPathName === link || currentPathName.startsWith(`${link}/`);

  return (
    <header className="fixed top-0 z-[60] w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="flex h-[var(--header-h)] items-center px-2">
        <a
          href="/"
          className={`emacs-buffer inline-flex flex-shrink-0 items-center px-3 py-1 text-sm ${
            isActive("/") ? "active" : ""
          }`}
        >
          <span className="mr-1 opacity-60">1:</span>
          index.org
          {isActive("/") && <span className="ml-2 text-xs opacity-50">Website</span>}
        </a>

        <nav className="ml-1 hidden items-center gap-1 sm:flex" aria-label="Primary navigation">
          {buffers.slice(1).map((buffer, index) => (
            <a
              key={buffer.name}
              href={buffer.link}
              className={`emacs-buffer inline-flex flex-shrink-0 items-center px-3 py-1 text-sm ${
                isActive(buffer.link) ? "active" : ""
              }`}
            >
              <span className="mr-1 opacity-60">{index + 2}:</span>
              {buffer.name}
              {isActive(buffer.link) && (
                <span className="ml-2 text-xs opacity-50">{buffer.mode}</span>
              )}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="emacs-button ml-auto px-3 py-1 text-sm text-muted-foreground sm:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? "[×]" : "[≡]"}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-border bg-background px-2 py-2 sm:hidden"
          aria-label="Mobile navigation"
        >
          {buffers.slice(1).map((buffer) => (
            <a
              key={buffer.name}
              href={buffer.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2 text-sm ${
                isActive(buffer.link)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {buffer.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
