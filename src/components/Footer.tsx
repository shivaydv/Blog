import React from "react";
import Link from "next/link";

import { Separator } from "./ui/separator";
import { Social } from "@/constants/Social";
import SocialList from "./SocialList";

const Footer = () => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <Separator />
      <footer
        className={
          "flex flex-row items-center justify-between gap-2 px-4 py-6 md:space-y-0"
        }
      >
        <span>
          {`© ${new Date().getFullYear()} `}-
          <span
            className={
              "pl-1 font-semibold hover:underline hover:underline-offset-4"
            }
          >
            <Link href={"https://shivayadav.tech"}>Shiva Yadav</Link>
          </span>
        </span>

        <SocialList profile={["mail", "twitter", "github"]} />
      </footer>
    </div>
  );
};

export default Footer;
