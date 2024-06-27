import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import ThemeToggle from "@/Theme/ThemeToggle";
import SocialList from "./SocialList";
import UserAvatar from "./UserAvatar";
import { Separator } from "./ui/separator";
import Search from "./Search";

const Navbar = ({ heading, url }: { heading: string; url?: string }) => {
  return (
    <header className="sticky top-0 z-50">
      <nav
        className={
          "container flex h-16 items-center justify-between gap-4 bg-background px-4 md:px-6"
        }
      >
        {url ? (
          <Link href={url} className="text-nowrap text-lg font-semibold font-fragment ">
            {heading}
          </Link>
        ) : (
          <h1 className="cursor-default text-nowrap text-lg font-semibold font-fragment">
            {heading}
          </h1>
        )}

        <div className="flex items-center gap-1">
          {heading !== "Dashboard" && <Search />}
          <Button size={"icon"} variant={"ghost"} asChild>
            <SocialList profile={["github"]} />
          </Button>
          <ThemeToggle />
          <UserAvatar />
        </div>
      </nav>
      <Separator />
    </header>
  );
};

export default Navbar;
