"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, PlusIcon, SunIcon } from "lucide-react";

export function Sidebar() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex h-full w-16 flex-col items-center space-y-4 border-r border-gray-200 py-4 dark:border-zinc-800">
      <div className="text-2xl font-bold">A</div>
      <Button variant="ghost" size="icon">
        <PlusIcon className="h-6 w-6" />
      </Button>
      <div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </div>
    </div>
  );
}
