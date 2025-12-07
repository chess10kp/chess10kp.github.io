"use client";
import { useState } from "react";
import Image from "next/image";
import { Tool, Activity, Display} from "@geist-ui/icons"

const Bookmarks = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  const bookmarks = [
    {
      category: "Tools",
      icon: Tool,
      links: [
        { name: "Neovim", url: "https://neovim.io", icon: "/assets/images/neovim.svg" },
        { name: "Docker", url: "https://docker.com", icon: "/assets/images/Docker.svg" },
      ],
    },
    {
      category: "Software",
      icon: Display,
      links: [
        { name: "Next.js", url: "https://nextjs.org", icon: "/assets/images/nextjs.svg" },
        { name: "Vercel", url: "https://vercel.com", icon: "/vercel.svg" },
        { name: "React", url: "https://react.dev", icon: "/assets/images/React.svg" },
        { name: "TypeScript", url: "https://typescriptlang.org", icon: "/assets/images/Typescript.svg" },
      ],
    },
  ];

  return (
    <div className="flex flex-col lg:mx-96 md:mx-16 mx-10 gap-6">
      <div className="flex justify-center gap-2">
        {bookmarks.map((category, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(idx)}
            className={`px-4 py-2 gap-2 flex rounded-md transition-colors ${
              activeCategory === idx
                ? "text-primary-foreground"
                : "text-secondary"
            }`}
          >
            <category.icon />
            {category.category}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 justify-center">
          {bookmarks[activeCategory].links.map((link, linkIdx) => (
            <a
              key={linkIdx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-md text-sm transition-colors"
            >
              <Image 
                src={link.icon} 
                alt={link.name} 
                width={16} 
                height={16} 
                className="filter brightness-0 dark:brightness-100"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;

