"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";
import { BiMoon } from "react-icons/bi";

import { IoIosSunny } from "react-icons/io";
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={() => {
        setTheme(theme == "light" ? "dark" : "light");
      }}
    >
      {theme == "dark" ? <IoIosSunny size={20} /> : <BiMoon size={20} />}
    </Button>
  );
};

export default ThemeToggle;
