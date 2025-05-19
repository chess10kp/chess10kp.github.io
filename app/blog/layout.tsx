import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [{ name: "Blog", link: "/blog" }];
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Header navItems={navItems} />
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
