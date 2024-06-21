import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import ThemeToggle from "@/Theme/ThemeToggle";
import Search from "./plugins/Search";
import SocialList from "./SocialList";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  return (
    <nav className={"container flex items-center justify-between py-4"}>
      <Link href={"/"} className="text-nowrap text-xl font-bold">
        Shiva&apos;s Blog
      </Link>
      <div className="flex items-center gap-1">
        <Search />
        <Button size={"icon"} variant={"ghost"} asChild>
          <SocialList profile={["github"]} />
        </Button>
        <ThemeToggle />
        <UserAvatar />
      </div>
    </nav>
  );
};

export default Navbar;
