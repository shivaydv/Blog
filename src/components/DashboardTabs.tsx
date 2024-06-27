import React from "react";
import { TabsList, TabsTrigger } from "./ui/tabs";
import { buttonVariants } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";

const DashboardTabs = ({
  menuitems,
  heading,
}: {
  menuitems: string[];
  heading: string;
}) => {
  return (
    <TabsList className="sticky top-[4.05rem] z-40 col-span-8 flex h-fit w-full flex-col items-start rounded-none bg-background py-0 md:col-span-2 md:gap-3">
      {/* Desktop menu  */}
      <div className="flex flex-col items-start max-md:hidden">
        <Menu list={menuitems} heading={heading} />
        
      </div>

      {/* Mobile menu  */}
      <Accordion type="single" collapsible className="w-full p-0 md:hidden">
        <AccordionItem value="menu">
          <AccordionTrigger>Menu</AccordionTrigger>
          <AccordionContent className="flex flex-col items-start">
            <Menu list={menuitems} heading={heading} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TabsList>
  );
};

const Menu = ({ list, heading }: { list: string[]; heading: string }) => {
  return (
    <>
      <h1 className="py-2 text-xl font-semibold text-foreground md:pt-0 md:text-2xl">
        {heading}
      </h1>
      {list.map((item) => (
        <TabsTrigger
          key={item}
          value={item}
          className={buttonVariants({
            variant: "link",
            className: "p-0 text-base text-muted-foreground",
          })}
        >
          {item}
        </TabsTrigger>
      ))}
    </>
  );
};

export default DashboardTabs;
