"use client";
import { ArrowRight } from "lucide-react";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import siteConfig from "@/siteConfig";

const ChessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 320 512"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="currentColor"
      d="M232 152A72 72 0 1 0 88 152a72 72 0 1 0 144 0zm24 120h-12.6l10.7 80h-48.4L195 272h-70l-10.7 80H65.9l10.7-80H64c-13.3 0-24-10.7-24-24s10.7-24 24-24c-15.1-20.1-24-45-24-72C40 85.7 93.7 32 160 32s120 53.7 120 120c0 27-8.9 51.9-24 72 13.3 0 24 10.7 24 24s-10.7 24-24 24zM52.7 464h214.7l-16.6-32H69.2l-16.5 32zm207.9-80c12 0 22.9 6.7 28.4 17.3l26.5 51.2c3 5.8 4.6 12.2 4.6 18.7 0 22.5-18.2 40.8-40.8 40.8H40.8C18.2 512 0 493.8 0 471.2c0-6.5 1.6-12.9 4.6-18.7l26.5-51.2C36.5 390.7 47.5 384 59.5 384h201.1z"
    />
  </svg>
);

interface HeroProps {
  introText: string;
}

const Hero = ({ introText }: HeroProps) => {
  const socialLinks = [
    { icon: Github, href: siteConfig.links.github, label: "GitHub" },
    { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
    { icon: Mail, href: siteConfig.links.email, label: "Email" },
    { icon: ChessIcon, href: siteConfig.links.chess, label: "Chess.com" },
  ];

  return (
    <section className="flex min-h-full flex-col justify-center py-6 text-left">
      <h1 className="mb-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
        Nitin <span className="text-accent">Madhu</span>
      </h1>

      <div className="mt-2">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
          Links
        </p>
        <ul className="flex flex-col gap-1 font-mono text-sm">
          <li>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground transition-colors hover:text-accent"
            >
              @{siteConfig.links.twitter.split("/").pop()}
            </a>
          </li>
          <li>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground transition-colors hover:text-accent"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>

      <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
        {introText}
      </p>

      <nav className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3" aria-label="Homepage sections">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80"
        >
          View projects
          <ArrowRight size={14} aria-hidden="true" />
        </a>
        <a
          href="/about"
          className="text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          About me
        </a>
      </nav>

      <div className="mt-10 flex items-center gap-2" aria-label="Social links">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={label}
            title={label}
            className="inline-flex h-10 w-10 items-center justify-center border border-border bg-card/30 text-muted-foreground transition-colors hover:border-accent/60 hover:bg-muted hover:text-accent"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>
    </section>
  );
};

export default Hero;
