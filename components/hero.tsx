import React from "react";
import info from "@/siteConfig";
import siteConfig from "@/siteConfig";

const Hero = () => {
  return (
    <section className="flex flex-col ">
      <div className="font-light md:text-6xl text-4xl mono">{siteConfig.personal.name}</div>
      <div className="font-light text-xl text-muted-foreground mono">
        Software Developer
      </div>
      <div>
        <h2 className="mono text-2xl my-4  mt-16">About</h2>
        <div className="roboto leading-2 text-xl text-zinc-400 spacing text-muted-foreground">
          I'm a senior (graduation Apr 2026) at
          UofM-Dearborn studying Computer science and Machine Learning. I build
          modern applications and websites powered by large language models,
          with an emphasis on applying Machine Learning to real problems with a focus on user extensibility.
          <br />
          <br />
          When I'm not designing software, I enjoy reading about type theory and
          lambda calculus. I also love playing chess <a className="underline" href="https://lichess.org/chess10kp">online</a>. 
          <br />
          <br />
          Get in touch through my{" "}
          <a className="underline" href={info.links.email}>
            email
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
