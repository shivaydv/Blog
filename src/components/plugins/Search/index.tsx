"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Cmdk from "./Cmdk";
import { Command, Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open: boolean) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className={"hidden md:block"}>
        <Button
          className={"mr-2 w-48 justify-between"}
          size={"sm"}
          variant={"outline"}
          onClick={() => {
            setOpen(true);
          }}
        >
          Search Blog...
          <div className={"flex items-center justify-center p-1"}>
            <Command size={16} />
            <span className={"text-base"}>K</span>
          </div>
        </Button>
      </div>
      <div className={"block md:hidden"}>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => {
            setOpen(true);
          }}
        >
          <SearchIcon size={20} />
        </Button>
      </div>
      {open && <Cmdk open={open} setOpen={setOpen} />}
    </>
  );
};

export default Search;
