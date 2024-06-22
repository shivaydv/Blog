import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import ThemeToggle from "@/Theme/ThemeToggle";
import Search from "./plugins/Search";
import SocialList from "./SocialList";
import UserAvatar from "./UserAvatar";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";

const Navbar = ({heading, url,}:{heading:string,url?:string}) => {
  return (
    <header className="sticky top-0 z-50">

    <nav className={" flex h-16 items-center gap-4 justify-between  bg-background px-4 md:px-6 container"}>
      {
        url?
        <Link href={url} className="text-nowrap text-lg font-semibold">
          {heading}
        </Link>
        :
        <h1
        className="text-nowrap text-lg font-semibold cursor-default"
      >
        {heading}</h1>
      }
      
      <div className="flex items-center gap-1">
        <Search />
        <Button size={"icon"} variant={"ghost"} asChild>
          <SocialList profile={["github"]} />
        </Button>
        <ThemeToggle />
        <UserAvatar />
      </div>
    </nav>
    <Separator/>
    </header>
  );
};

export default Navbar;
