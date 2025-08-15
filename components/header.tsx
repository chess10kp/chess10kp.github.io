"use client";
import React from "react";
import Link from "next/link";
import { Menubar } from "@/components/ui/menubar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NavLink = (props: any) => {
  return (
    <Link {...props} legacyBehavior passHref>
      <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "geist")}>
          {props.children}
        </NavigationMenuLink>
      </motion.div>
    </Link>
  );
};

const Header = (props: any) => {
  const navItems: { name: string; link: string }[] =
    props.navItems == null
      ? [
          { name: "Blog", link: "/blog" },
          { name: "Experience", link: "#experience" },
          { name: "Projects", link: "#projects" },
        ]
      : props.navItems;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="dark:text-foreground list-none md:text-xl font-bold geist">
          NM
        </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item, idx) => (
            <NavigationMenuItem key={idx}>
              <NavLink href={`${item.link}`} className="md:text-lg">
                {item.name}
              </NavLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem className=""></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;