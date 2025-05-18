import info from "@/siteConfig";
import { Github, Linkedin, Mail } from "@geist-ui/icons";
import leetCodeSvg from "@/assets/images/leetcode-svgrepo-com.svg";
import Image from "next/image";

const ChessSvg = (props: any) => {
  return (
    <div {...props}>
      <svg
        width={20}
        height={20}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          {...props}
          d="M232 152A72 72 0 1 0 88 152a72 72 0 1 0 144 0zm24 120l-12.6 0 10.7 80-48.4 0L195 272l-35 0-35 0-10.7 80-48.4 0 10.7-80L64 272c-13.3 0-24-10.7-24-24s10.7-24 24-24c-15.1-20.1-24-45-24-72C40 85.7 93.7 32 160 32s120 53.7 120 120c0 27-8.9 51.9-24 72c13.3 0 24 10.7 24 24s-10.7 24-24 24zM52.7 464l214.7 0-16.6-32L69.2 432 52.7 464zm207.9-80c12 0 22.9 6.7 28.4 17.3l26.5 51.2c3 5.8 4.6 12.2 4.6 18.7c0 22.5-18.2 40.8-40.8 40.8L40.8 512C18.2 512 0 493.8 0 471.2c0-6.5 1.6-12.9 4.6-18.7l26.5-51.2C36.5 390.7 47.5 384 59.5 384l201 0z"
        />
      </svg>
    </div>
  );
};

const Leetcode = (props: any) => {
  return (
    <div {...props}>
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>LeetCode icon</title>
        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
      </svg>
    </div>
  );
};

export const ContactSidebar = () => {
  const personal_links = [
    { name: <Github size={16} />, link: info.links.github },
    { name: <Linkedin size={16} />, link: info.links.linkedin },
    { name: <Mail size={16} />, link: info.links.email },
    { name: <Leetcode />, link: info.links.leetcode },
  ];

  return (
    <div className="flex line hidden md:block  bottom-2 fixed flex-col m-2 justify-center gap-4 items-evenly ">
      <div className=" flex-col items-evenly flex gap-4 relative after:content-[''] after:absolute after:left-1/2 after:top-full after:h-24 after:w-px after:bg-gray-300 after:translate-y-[-50%] after:text-muted-foreground">
        {personal_links.map((link, idx) => (
          <a className="text-muted-foreground hover:text-white transition-colors duration-200" href={link.link} key={idx}>
            {link.name}
          </a>
        ))}
        <a href={info.links.chess} className="mb-16 text-muted-foreground">
          <ChessSvg></ChessSvg>
        </a>
      </div>
    </div>
  );
};
