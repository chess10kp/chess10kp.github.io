"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const EmacsMenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const menus = [
    {
      name: "File",
      items: [
        { label: "Visit New File", shortcut: "C-x C-f", action: () => router.push("/") },
        { label: "Save Buffer", shortcut: "C-x C-s", action: () => {} },
        { label: "Close", shortcut: "C-x k", action: () => router.push("/") },
        { divider: true },
        { label: "Quit", shortcut: "C-x C-c", action: () => {} },
      ],
    },
    {
      name: "Edit",
      items: [
        { label: "Copy", shortcut: "M-w", action: () => {} },
        { label: "Cut", shortcut: "C-w", action: () => {} },
        { label: "Paste", shortcut: "C-y", action: () => {} },
        { divider: true },
        { label: "Undo", shortcut: "C-_", action: () => {} },
        { label: "Redo", shortcut: "C-/", action: () => {} },
      ],
    },
    {
      name: "Options",
      items: [
        { label: "Toggle Dark Mode", shortcut: "", action: () => {} },
        { label: "Highlight Current Line", shortcut: "", action: () => {} },
        { divider: true },
        { label: "Customize Emacs", shortcut: "", action: () => {} },
      ],
    },
    {
      name: "Buffers",
      items: [
        { label: "Index", shortcut: "index.org", action: () => router.push("/") },
        { label: "About", shortcut: "about.org", action: () => router.push("/about") },
        { label: "Projects", shortcut: "projects.org", action: () => router.push("/projects") },
        { label: "Blog", shortcut: "blog.org", action: () => router.push("/blog") },
      ],
    },
    {
      name: "Help",
      items: [
        { label: "Describe Mode", shortcut: "C-h m", action: () => {} },
        { label: "About Emacs", shortcut: "C-h C-a", action: () => {} },
        { divider: true },
        { label: "Manual", shortcut: "C-h r", action: () => {} },
      ],
    },
  ];

  return (
    <div className="emacs-menu-bar fixed top-0 left-0 right-0 z-[65] border-b border-border bg-background">
      <div className="flex items-center">
        {menus.map((menu, menuIdx) => (
          <div
            key={menu.name}
            className="relative"
            onMouseEnter={() => setActiveMenu(menu.name)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <button
              className="emacs-menu-item text-sm font-mono py-1"
              onClick={() => setActiveMenu(activeMenu === menu.name ? null : menu.name)}
            >
              {menu.name}
            </button>

            <AnimatePresence>
              {activeMenu === menu.name && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="absolute left-0 top-full mt-1 z-50 min-w-48 bg-popover border border-border shadow-xl"
                >
                  {menu.items.map((item, idx) => {
                    if ("divider" in item) {
                      return (
                        <div
                          key={idx}
                          className="border-t border-border my-1"
                        />
                      );
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          item.action();
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 text-sm font-mono hover:bg-accent hover:text-accent-foreground flex items-center justify-between group"
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span className="text-xs text-muted-foreground group-hover:text-accent-foreground/70">
                            {item.shortcut}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmacsMenuBar;
