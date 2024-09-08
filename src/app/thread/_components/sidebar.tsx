"use client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MoonIcon, NewspaperIcon, PlusIcon, SunIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThreadList } from "./thread-list";
import { useRouter } from "next/navigation";

export function SidebarThred() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  function changeTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }
  return (
    <div className="flex h-full">
      <div className="flex h-full w-16 flex-col items-center justify-between space-y-4 border-r border-gray-200 py-4 dark:border-zinc-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-2xl font-bold">A</div>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    router.push("/thread");
                  }}
                  variant="ghost"
                  size="icon"
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Create a new thread</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setIsOpen(!isOpen)}
                  variant="ghost"
                  size="icon"
                >
                  <NewspaperIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Show threads</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-auto">
          <Button variant="ghost" size="icon" onClick={changeTheme}>
            {theme === "light" ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
      </div>
      {!isOpen ? (
        <div className="h-full w-52 rounded-r-lg border-r bg-gray-200 dark:bg-zinc-900">
          <ThreadList />
        </div>
      ) : null}
    </div>
  );
}
