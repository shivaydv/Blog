import React from "react";
import { TabsList, TabsTrigger } from "./ui/tabs";
import { buttonVariants } from "./ui/button";

import { Separator } from "./ui/separator";

const DashboardTabs = ({
  menuitems,
  heading,
}: {
  menuitems: string[];
  heading: string;
}) => {
  return (
    <TabsList className="sticky top-[4.05rem] z-40 flex h-fit w-full flex-col items-start rounded-none bg-background px-0 py-0 md:gap-3">
      <h1 className="text-2xl font-semibold text-foreground md:text-2xl">
        {heading}
      </h1>
      <div className="flex gap-4">
        <Menu list={menuitems} />
      </div>
      <Separator className="md:-mt-3" />
    </TabsList>
  );
};

const Menu = ({ list }: { list: string[] }) => {
  return (
    <>
      {list.map((item) => (
        <TabsTrigger
          key={item}
          value={item}
          className={buttonVariants({
            variant: "link",
            className: "text-md p-0 text-muted-foreground md:text-lg",
          })}
        >
          {item}
        </TabsTrigger>
      ))}
    </>
  );
};

export default DashboardTabs;
