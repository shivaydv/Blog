import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

import { Social } from "@/constants/Social";

type SocialListProps = {
  profile: string[];
  className?: string;
  iconClass?: string;
};

const SocialList = ({ profile, className, iconClass }: SocialListProps) => {
  const filteredSocials = profile
    ? Social.filter((social) => profile.includes(social.name))
    : Social;

  return (
    <div className={cn("flex gap-4", className)}>
      {filteredSocials.map((social) => (
        <Link href={social.url} key={social.name}>
          {React.cloneElement(social.icon, {
            className: cn("w-5 h-5", iconClass && iconClass),
          })}
        </Link>
      ))}
    </div>
  );
};

export default SocialList;
