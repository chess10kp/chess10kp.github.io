"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import ModeToggle from "@/components/custom/modeToggle";
import { Menubar } from "@/components/ui/menubar";
import { Menu } from "@geist-ui/icons";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

const NavLink = (props: any) => {
  return (
    <Link {...props} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {props.children}
      </NavigationMenuLink>
    </Link>
  );
};

const Header = () => {
  const navItems = [
    { name: "Blog", link: "/blog" },
  ];
  return (
    <Menubar className="backdrop-blur-screen m-2 rounded-xl flex flex-row justify-between text-foreground">
      <div>
          <Link href="/" className="dark:text-foreground list-none font-bold">NM</Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item, idx) => (
            <NavigationMenuItem key={idx}>
              <NavLink href={`${item.link}`} className="">
                {item.name}
              </NavLink>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem className="">
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Menubar>
  );
};

export default Header;
