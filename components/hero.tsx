import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col space-y-4">
      <div className="pt-8">
        <div className="geist text-lg md:text-xl text-muted-foreground space-y-6">
          <p>
            I'm Nitin, a student at UMich. I love making things Currently at Ancor.
          </p>
          <p className="">
            Wanna know more about  {" "}
            <a
              href="/about"
              className="text-accent hover:underline ml-1 transition-colors"
            >
              me? 
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
