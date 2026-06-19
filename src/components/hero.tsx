"use client";
import React, { useState, useRef, useEffect } from "react";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Check, ExternalLink, ArrowRight } from "lucide-react";
import siteConfig from "@/siteConfig";

const ChessSvg = (props: any) => (
  <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" {...props}>
    <path fill="currentColor" d="M232 152A72 72 0 1 0 88 152a72 72 0 1 0 144 0zm24 120l-12.6 0 10.7 80-48.4 0L195 272l-35 0-35 0-10.7 80-48.4 0 10.7-80L64 272c-13.3 0-24-10.7-24-24s10.7-24 24-24c-15.1-20.1-24-45-24-72C40 85.7 93.7 32 160 32s120 53.7 120 120c0 27-8.9 51.9-24 72c13.3 0 24 10.7 24 24s-10.7 24-24 24zM52.7 464l214.7 0-16.6-32L69.2 432 52.7 464zm207.9-80c12 0 22.9 6.7 28.4 17.3l26.5 51.2c3 5.8 4.6 12.2 4.6 18.7c0 22.5-18.2 40.8-40.8 40.8L40.8 512C18.2 512 0 493.8 0 471.2c0-6.5 1.6-12.9 4.6-18.7l26.5-51.2C36.5 390.7 47.5 384 59.5 384l201 0z" />
  </svg>
);

interface MagneticButtonProps {
  index: number;
  link: any;
  activeTooltip: number | null;
  setActiveTooltip: (val: number | null) => void;
  copiedEmail: boolean;
  handleCopyEmail: (email: string) => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  index, link, activeTooltip, setActiveTooltip, copiedEmail, handleCopyEmail,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const moveX = useTransform(x, [-100, 100], [-8, 8]);
  const moveY = useTransform(y, [-100, 100], [-8, 8]);

  return (
    <motion.div
      ref={ref}
      className="relative group"
      onMouseEnter={() => setActiveTooltip(index)}
      onMouseLeave={() => { setActiveTooltip(null); handleMouseLeave(); }}
      onMouseMove={handleMouse}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
    >
      <motion.button
        onClick={link.copyable ? () => handleCopyEmail(link.username) : undefined}
        style={{ x: moveX, y: moveY }}
        className={`relative p-3 text-muted-foreground transition-all duration-200 bg-card/30 border border-border/30 backdrop-blur-sm font-mono text-sm ${link.color}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={link.label}
      >
        {link.icon === ChessSvg && (
          <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChessSvg />
          </motion.div>
        )}
        {link.copyable && copiedEmail && link.username.includes("@") ? (
          <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
            <Check size={20} className="text-green-500" />
          </motion.div>
        ) : link.icon !== ChessSvg ? (
          <motion.div initial={false} whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 0.4 }}>
            <link.icon size={20} />
          </motion.div>
        ) : null}
      </motion.button>

      <AnimatePresence>
        {activeTooltip === index && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 px-3 py-2 bg-popover text-popover-foreground shadow-xl border border-border whitespace-nowrap z-50 font-mono text-xs"
          >
            <div className="text-xs font-semibold mb-1">{link.label}</div>
            <div className="text-[11px] text-muted-foreground">{link.username}</div>
            {link.copyable && <div className="text-[11px] text-accent mt-1 flex items-center gap-1">Click to copy</div>}
            {!link.copyable && <ExternalLink size={10} className="inline ml-1 text-muted-foreground" />}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-r border-b border-border rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {!link.copyable && (
        <a href={link.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0" aria-label={`Visit ${link.label}`} />
      )}
    </motion.div>
  );
};

interface HeroProps {
  introText: string;
}

const Hero = ({ introText }: HeroProps) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const firstName = siteConfig.personal.firstName.split("");
  const lastName = siteConfig.personal.lastName.split("");

  const socialLinks = [
    { icon: Github, href: siteConfig.links.github, label: "GitHub", color: "hover:text-gray-400", username: "@chess10kp" },
    { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn", color: "hover:text-blue-500", username: "Nitin Shankar Madhu" },
    { icon: Mail, href: siteConfig.links.email, label: "Email", color: "hover:text-green-500", username: siteConfig.links.email, copyable: true },
    { icon: ChessSvg, href: siteConfig.links.chess, label: "Chess", color: "hover:text-yellow-500", username: "chess10kp" },
  ];

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section className="min-h-[40vh] flex flex-col justify-center space-y-5 py-4 relative text-left">
      <div className="space-y-5 relative z-10 text-left">
        <div>
          <h1 className="text-2xl flex flex-wrap gap-4 md:gap-8 lg:gap-12 md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight font-mono tracking-tight text-left">
            I'm
            <div className="flex flex-wrap gap-1">
              {firstName.map((letter, index) => (
                <span
                  key={index}
                  className="inline-block hover:text-accent transition-colors duration-150 cursor-default"
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {lastName.map((letter, index) => (
                <span
                  key={index}
                  className="inline-block text-secondary/80 hover:text-accent transition-colors duration-150 cursor-default"
                >
                  {letter}
                </span>
              ))}
            </div>
          </h1>
        </div>

        <div threshold={0.1}>
          <div className="py-2 flex-col flex gap-4 text-left">
            <p className="font-mono text-sm md:text-base text-foreground leading-relaxed text-left">
              {introText}
            </p>
          </div>
        </div>

        <div threshold={0.1}>
          <div className="inline-flex items-center gap-2 group cursor-pointer text-left">
            <a href="/about" className="text-accent hover:text-accent transition-colors duration-200 flex items-center gap-2 font-mono text-sm">
              <span>[Who am I?]</span>
              <span className="relative">
                <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </div>

      <div threshold={0.1}>
        <div className="pt-3 relative text-left">
          <div className="flex items-center gap-1.5">
            {socialLinks.map((link, idx) => (
              <MagneticButton key={idx} index={idx} link={link} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} copiedEmail={copiedEmail} handleCopyEmail={handleCopyEmail} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {copiedEmail && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 left-6 z-[80] bg-green-500/10 border border-green-500/30 text-green-500 px-3 py-1.5 backdrop-blur-xl flex items-center gap-2 shadow-2xl font-mono text-xs"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }}>
              <Check size={14} />
            </motion.div>
            <span>Email copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
