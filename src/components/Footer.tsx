import React from "react";
import Link from "next/link";
import SocialList from "./SocialList";

const Footer = () => {
  return (
    <footer
      className={
        "container flex flex-row items-center justify-between gap-2 py-4 md:space-y-0"
      }
    >
      <span>
        {`© ${new Date().getFullYear()} `}
        <Link
          className={
            "pl-1 font-semibold hover:underline hover:underline-offset-4"
          }
          href={"https://x.com/shivay1256"}
        >
          {" "}
          Shiva Yadav
        </Link>
      </span>

      <SocialList profile={["mail", "twitter", "github"]} />
    </footer>
  );
};

export default Footer;
