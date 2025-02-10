import info from "@/siteConfig";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Github, Linkedin, Mail,  } from "@geist-ui/icons";
import leetCodeSvg from "@/assets/images/leetcode-svgrepo-com.svg";
import Image from "next/image";

const Leetcode = () => {
  return (
    <div>
      <Image
        src={leetCodeSvg}
        width={20}
        height={20}
        layout="fixed"
        alt="Exercism"
      />
    </div>
  );
};

const About = () => {
  return (
    <div className="flex flex-col items-center min-h-[80vh]">
      <h2 className="font-light text-center text-5xl m-10 ">About</h2>
      <div className="flex flex-col items-center gap-4">
        <SelfInfo />
        <ContactInfo />
        <Intro />
      </div>
    </div>
  );
};

const Intro = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-4  mx-10">
        <p className="text-md text-center">
          When I'm not using the{" "}
          <a
            href="https://gnu.org/software/emacs"
            className="underline underline-offset-2"
          >
            one true editor
          </a>
          , I'm probably writing Java, or training ML models in Jupyter.
          <br />
        </p>
      </div>
      <div className="flex flex-col items-center gap-4"></div>
    </>
  );
};

const SelfInfo = () => {
  return (
    <>
      <Avatar className="w-20 h-20">
        <AvatarImage
          src="/1674422223964.jpg"
          alt="@nitinmadhu"
        />
        <AvatarFallback>NM</AvatarFallback>
      </Avatar>
      <div className="flex items-center flex-col">
        <h3 className="text-xl text-bold">Nitin Shankar Madhu</h3>
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
    </>
  );
};

const ContactInfo = () => {
  const personal_links = [
    { name: <Github />, link: info.links.github },
    { name: <Linkedin />, link: info.links.linkedin },
    { name: <Mail />, link: info.links.email },
    { name: <Leetcode />, link: info.links.leetcode },
  ];
  return (
    <div className="flex justify-center gap-4 items-evenly">
      {personal_links.map((link, idx) => (
        <a href={link.link} key={idx}>{link.name}</a>
      ))}
      <a href={info.links.chess}>
        <svg
          width={20}
          height={20}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="#fff"
            d="M232 152A72 72 0 1 0 88 152a72 72 0 1 0 144 0zm24 120l-12.6 0 10.7 80-48.4 0L195 272l-35 0-35 0-10.7 80-48.4 0 10.7-80L64 272c-13.3 0-24-10.7-24-24s10.7-24 24-24c-15.1-20.1-24-45-24-72C40 85.7 93.7 32 160 32s120 53.7 120 120c0 27-8.9 51.9-24 72c13.3 0 24 10.7 24 24s-10.7 24-24 24zM52.7 464l214.7 0-16.6-32L69.2 432 52.7 464zm207.9-80c12 0 22.9 6.7 28.4 17.3l26.5 51.2c3 5.8 4.6 12.2 4.6 18.7c0 22.5-18.2 40.8-40.8 40.8L40.8 512C18.2 512 0 493.8 0 471.2c0-6.5 1.6-12.9 4.6-18.7l26.5-51.2C36.5 390.7 47.5 384 59.5 384l201 0z"
          />
        </svg>
      </a>
    </div>
  );
};

export default About;
