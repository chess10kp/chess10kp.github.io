import React from "react";
import siteConfig from "@/siteConfig";
import { Github, Linkedin, Mail } from "@geist-ui/icons";

const ChessSvg = (props: any) => (
  <svg
    width={20}
    height={20}
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
      username: "nmadhu@umich.edu",
    },
    {
      icon: ChessSvg,
      href: siteConfig.links.chess,
      label: "Chess",
      username: "chess10kp",
    },
  ];

  return (
    <footer className="py-8 border-t max-w-full mx-auto container dark:border-border bg-transparent backdrop-blur-xl">
      <div className="flex flex-col gap-8 items-center">
        <div className="space-y-4">
          <p className="text-balance geist text-sm leading-loose text-muted-foreground">
            &copy; {new Date().getFullYear()}. Built by{" "}
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent hover:text-accent/80 transition-colors"
            >
              {siteConfig.personal.name}
            </a>
            . The source is on{" "}
            <a
              className="text-accent hover:text-accent/80 transition-colors"
              href="https://github.com/chess10kp/chess10kp.github.io"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-card/50 hover:border-accent/40 border border-transparent transition-all duration-200 group"
              >
                <div                 className="flex-shrink-0 text-muted-foreground group-hover:text-accent transition-colors">
                  {link.icon === ChessSvg ? (
                    <ChessSvg />
                  ) : (
                    <link.icon size={18} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">
                    {link.label}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {link.username}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
