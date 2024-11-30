"use client"
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
  const [isOpen, setisOpen] = useState(false);
  return (
    <Menubar className="m-2 bg-background rounded-xl flex flex-row justify-between text-foreground">
      <div>
        <li className="dark:text-foreground font-bold">NM</li>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavLink href="/blog">Blog</NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="md:hidden px-0">
            <NavLink href="/" className="px-0">
              <Button
                className="m-0 p-0 dark:bg-background dark:text-foreground"
                onClick={() => setisOpen(!isOpen)}
              >
                <Menu className="px-0" />
              </Button>
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="">
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Menubar>
  );
};

export default Header;
