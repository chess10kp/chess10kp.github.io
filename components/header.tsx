"use client";
import React from "react";
import Link from "next/link";
import { Menubar } from "@/components/ui/menubar";
import { motion } from "framer-motion";

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
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
    <Menubar className="backdrop-blur-screen sticky m-2 flex flex-row justify-between text-foreground bg-transparent">
      <div>
        <Link href="/" className="dark:text-foreground list-none md:text-xl font-bold geist">
          NM
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item, idx) => (
            <NavigationMenuItem key={idx}>
              <NavLink href={`${item.link}`} className="md:text-lg geist">
                {item.name}
              </NavLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem className=""></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Menubar>
  );
};

export default Header;