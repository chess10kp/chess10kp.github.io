import React from "react";
import Link from "next/link";
import ModeToggle from "@/components/custom/modeToggle";
import { Menubar } from "@/components/ui/menubar";

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
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {props.children}
      </NavigationMenuLink>
    </Link>
  );
};

const Header = () => {
  return (
    <Menubar className="sm:px-12 bg-background flex flex-row justify-between text-foreground">
      <h1 className="dark:text-foreground p-2 font-bold">Nitin Madhu</h1>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavLink href="/docs">Docs</NavLink>
            <NavLink href="/docs">Documetation</NavLink>
            <NavLink href="/docs">Blog</NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Menubar>
  );
};

export default Header;
