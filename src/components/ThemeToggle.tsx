"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Determine next theme
  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Sun
        className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden"
        aria-hidden="true"
      />
      <Moon
        className="hidden h-[1.2rem] w-[1.2rem] transition-all dark:block"
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
