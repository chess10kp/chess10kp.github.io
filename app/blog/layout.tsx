import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import "../globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SmoothScrollProvider>
        <Header />
        {children}
        <Footer />
      </SmoothScrollProvider>
    </ThemeProvider>
  );
};

export default Layout;
