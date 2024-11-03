"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import React from "react";
import {MoonIcon ,SunIcon} from "lucide-react"
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={() => {
        setTheme(theme == "light" ? "dark" : "light");
      }}
    >
      {theme == "dark" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </Button>
  );
};

export default ThemeToggle;
