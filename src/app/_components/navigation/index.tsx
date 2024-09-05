"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Moon, Sun, ChevronDown } from "lucide-react";
import { ProfileInformation } from "../profile-information";
import { signOut } from "next-auth/react";
import Image from "next/image";

export function Navigation() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  function onSignOut() {
    try {
      signOut()
        .then(() => {
          console.log("Signed out");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="pt-4">
        {theme === "light" ? (
          <Image src="/logo-light.png" alt="logo" width={120} height={200} />
        ) : (
          <Image src="/logo-dark.png" alt="logo" width={120} height={200} />
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <ProfileInformation />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="flex items-center space-x-2"
              >
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="mt-2 w-52">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
