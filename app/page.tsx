"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/header";
import Hero from "@/components/hero";

const myAvatar = () => {
  return (
    <Avatar>
      <AvatarImage
        className="p-2"
        src="https://media.licdn.com/dms/image/v2/D5603AQGY44q-fvXzZg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1674422223964?e=1737590400&v=beta&t=50OGreyb7Hl0Kh5G6YasEoiWJCa204kgc5Uv_EH4DIg"
      />
      <AvatarFallback>NM</AvatarFallback>
    </Avatar>
  );
};

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <main className="bg-background pb-96">
        <Header /> 
        <Hero></Hero>
      </main>
    </ThemeProvider>
  );
}
