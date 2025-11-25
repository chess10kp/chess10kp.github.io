import React from "react";
import info from "@/siteConfig";
import siteConfig from "@/siteConfig";
import AnimatedText from "./animated-text";

const Hero = () => {
  return (
    <section className="flex flex-col space-y-4">
      <p className="text-xl md:text-2xl text-muted-foreground mono">
        Developing for fun. Thoroughly curious.
      </p>
      <div className="pt-8">
        <div className="geist text-lg md:text-xl text-muted-foreground space-y-6">
          <p>
            I'm a full stack developer and recent graduate focused on constant improvement in all aspects of my life. I've spent the last few summers teaching and building software, and the last few winters growing the next generation of engineers. Want to know even more about me?
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
