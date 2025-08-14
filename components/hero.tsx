import React from "react";
import info from "@/siteConfig";
import siteConfig from "@/siteConfig";
import AnimatedText from "./animated-text";

const Hero = () => {
  return (
    <section className="flex flex-col space-y-4">
      <AnimatedText
        text={siteConfig.personal.name}
        className="text-5xl md:text-7xl font-bold geist"
      />
      <p className="text-xl md:text-2xl text-muted-foreground mono">
        Software Developer
      </p>
      <div className="pt-8">
        <h2 className="geist text-3xl font-bold my-4">About</h2>
        <div className="geist text-lg md:text-xl text-muted-foreground space-y-6">
          <p>
            I'm a senior (graduating Apr 2026) at UofM-Dearborn studying
            Computer science and Machine Learning. I build modern applications
            and websites powered by large language models, with an emphasis on
            applying Machine Learning to real problems with a focus on user
            extensibility.
          </p>
          <p>
            When I'm not designing software, I enjoy reading about type theory
            and lambda calculus. I also love playing chess{" "}
            <a
              className="underline hover:text-foreground transition-colors"
              href="https://lichess.org/chess10kp"
            >
              online
            </a>
            .
          </p>
          <p>
            Get in touch through my{" "}
            <a
              className="underline hover:text-foreground transition-colors"
              href={info.links.email}
            >
              email
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
