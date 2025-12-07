import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "../globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
