import React from "react";
import info from "@/siteConfig";

const Hero = () => {
  return (
    <section className="flex m-16 lg:mx-32 flex-col">
      <div className="font-light text-4xl mono">Nitin Madhu</div>
      <div className="font-light text-muted-foreground mono">
        Software Developer
      </div>
      <div>
        <h2 className="mono text-2xl my-4 mt-16">About</h2>
        <div className="roboto leading-2 text-xl spacing text-muted-foreground">
          I'm a fourth year student (expected graduation April 2026) at
          UofM-Dearborn studying Computer science and Machine Learning. I build
          modern applications and websites powered by large language models,
          with an emphasis on applying Machine Learning to real problems with
          while retaining a extensible interface.
          <br />
          <br />
          When I'm not designing software, I enjoy reading about type theory and
          lambda calculus.
          <br />
          <br />
          Get in touch{" "}
          <a className="underline" href={info.links.email}>
            here
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
