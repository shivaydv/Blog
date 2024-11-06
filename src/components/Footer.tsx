import React from "react";
import Link from "next/link";
import SocialList from "./SocialList";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <div className="container">
      <Separator />
      <footer
        className={
          "flex flex-row items-center justify-between gap-2 py-6 md:space-y-0"
        }
      >
        <span>
          {`© ${new Date().getFullYear()} `}-
          <span
            className={
              "pl-1 font-semibold hover:underline hover:underline-offset-4"
            }

          >
            R Anthony Raj
          </span>
        </span>

        <SocialList profile={["mail", "twitter", "github"]} />
      </footer>
    </div>
  );
};

export default Footer;
