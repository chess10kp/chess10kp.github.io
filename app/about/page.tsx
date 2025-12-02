import info from "@/siteConfig";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import { AnimationProvider } from "@/contexts/animation-context";
import { AnimatedSection } from "@/components/animated-section";
import Bookmarks from "@/components/bookmarks";
import Image from "next/image";
import Link from "next/link"

const About = () => {
  return (
    <AnimationProvider>
      <div className="flex flex-col  my-10 items-center min-h-[80vh]">
        <AnimatedSection
          animation="fade-up"
          className="font-light text-center text-5xl m-10"
        >
          <h2>About</h2>
        </AnimatedSection>
        <div className="flex flex-col items-center gap-4">
          <AnimatedSection animation="fade-up" delay={100}>
            <SelfInfo />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={200}>
            <ContactInfo />
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={300}>
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
        className="flex flex-col lg:mx-96 md:mx-16 text-xl gap-4 mx-10"
      >
        <p>
          Hi! I'm Nitin - a student developer. I enjoy programming and making
          software I find useful. I'm currently working on BabelFish, a chat
          summarization tool that ensures you never miss another important
          conversation.
        </p>
        <p>
          When I'm not glued to my editor, you will find me playing chess.
          Here's me hitting 2650 on  {" "}
          <Link href="https://www.chess.com/member/n_s_m/stats">chess.com.</Link>
        </p>
      </AnimatedSection>
    </>
  );
};

const SelfInfo = () => {
  return (
    <div className="items-center flex flex-col">
      <Avatar className="w-20 h-20">
        <AvatarImage src="/me.jpg" alt="@nitinmadhu" />
        <AvatarFallback>NM</AvatarFallback>
      </Avatar>
      <div className="flex items-center flex-col">
        <h3 className="text-xl text-bold">Nitin Madhu</h3>
        <p className="text-sm text-muted-foreground">
          {info.currentStanding()} at{" "}
          <a
            href={info.personal.university_link}
            className="text-muted-foreground text-md"
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
    { name: <Github />, link: info.links.github },
    { name: <Linkedin />, link: info.links.linkedin },
    { name: <Mail />, link: info.links.email },
    { 
      name: <Image src="/vercel.svg" alt="Vercel" width={20} height={20} />, 
      link: "https://vercel.com" 
    },
    { 
      name: <Image src="/next.svg" alt="Next.js" width={20} height={20} />, 
      link: "https://nextjs.org" 
    },
  ];
  return (
    <div className="flex justify-center gap-4 items-evenly">
      {personal_links.map((link, idx) => (
        <a
          href={link.link}
          key={idx}
          className="text-accent hover:text-accent/80 transition-colors"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
};

export default About;
