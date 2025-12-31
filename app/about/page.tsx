"use client"

import info from "@/siteConfig";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import { AnimationProvider } from "@/contexts/animation-context";
import { AnimatedSection } from "@/components/animated-section";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const About = () => {
  return (
    <AnimationProvider>
      <div className="flex flex-col my-10 items-center min-h-[80vh] pb-24">
        <AnimatedSection
          animation="fade-up"
          className="text-center mb-12"
        >
          <p className="text-accent font-mono text-sm tracking-widest uppercase mb-2">
            Who I Am
          </p>
          <h2 className="text-5xl md:text-6xl font-bold mono text-foreground/90">
            About Nitin
          </h2>
        </AnimatedSection>
        <div className="flex flex-col items-center gap-6 max-w-4xl w-full px-4">
          <AnimatedSection threshold={0.2} animation="fade-up" delay={100}>
            <SelfInfo />
          </AnimatedSection>
          <AnimatedSection threshold={0.2} animation="fade-up" delay={200}>
            <ContactInfo />
          </AnimatedSection>
          <AnimatedSection threshold={0.2} animation="fade-up" delay={300}>
            <Intro />
          </AnimatedSection>
          {/* <AnimatedSection animation="fade-up" delay={400}> */}
          {/*   <Bookmarks /> */}
          {/* </AnimatedSection> */}
        </div>
      </div>
    </AnimationProvider>
  );
};

const Intro = () => {
  return (
    <>
      <AnimatedSection
        animation="fade-up"
        delay={300}
        className="flex flex-col lg:mx-0 md:mx-16 text-xl gap-6 mx-6 md:mx-12"
      >
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground geist">
          I'm a senior at UMich Dearborn. I enjoy programming and making
          software I find useful. I'm currently working on BabelFish, a chat
          summarization tool that ensures you never miss another important
          conversation.
        </p>
        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground geist">
          When I'm not glued to my editor, you probably will find me playing chess.
          Here's me hitting 2650 on{" "}
          <Link 
            href="https://www.chess.com/member/n_s_m/stats"
            className="text-accent hover:text-accent/80 transition-colors underline underline-offset-4 decoration-2 hover:decoration-accent"
            target="_blank"
            rel="noopener noreferrer"
          >
            chess.com
          </Link>
          .
        </p>

        <div className="relative w-full h-64 md:h-80 mt-4 overflow-hidden border border-border/30">
          <Image 
            src="/gain_rating.png" 
            alt="chess rating" 
            sizes="100vw"
            fill
            style={{ objectFit: 'contain'}}
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </AnimatedSection>
    </>
  );
};

const SelfInfo = () => {
  return (
    <div className="items-center flex flex-col gap-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary blur-lg opacity-30 animate-pulse" />
        <Avatar className="w-28 h-28 border-4 border-card relative">
          <AvatarImage src="/me.jpg" alt="@nitinmadhu" className="object-cover" />
          <AvatarFallback className="bg-accent text-accent-foreground text-3xl font-bold">NM</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center flex-col text-center">
        <h3 className="text-3xl font-bold text-foreground mb-1">Nitin Madhu</h3>
        <p className="text-base text-muted-foreground">
          <span className="font-mono text-accent">{info.currentStanding()}</span> at{" "}
          <a
            href={info.personal.university_link}
            className="text-muted-foreground hover:text-foreground transition-colors decoration-2 hover:decoration-accent"
          >
            {info.personal.university}
          </a>
        </p>
      </div>
    </div>
  );
};

const ContactInfo = () => {
  const personal_links = [
    { name: <Github size={24} />, link: info.links.github, label: "GitHub" },
    { name: <Linkedin size={24} />, link: info.links.linkedin, label: "LinkedIn" },
    { name: <Mail size={24} />, link: info.links.email, label: "Email" },
  ];
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {personal_links.map((link, idx) => (
        <motion.a
          key={idx}
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2 text-accent hover:text-foreground bg-card/50 hover:bg-card border border-border/30 transition-all duration-300 group"
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + idx * 0.05 }}
          title={link.label}
        >
          {link.name}
        </motion.a>
      ))}
    </div>
  );
};

export default About;
