"use server";
import { getServerAuthSession } from "@/server/auth";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "../sign-out-button";

export async function UserInformation() {
  const session = await getServerAuthSession();
  return (
    <div>
      User Information {JSON.stringify(session)} <SignOutButton />
    </div>
  );
}
