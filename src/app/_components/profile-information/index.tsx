"use server";
import { getServerAuthSession } from "@/server/auth";
export async function ProfileInformation() {
  const session = await getServerAuthSession();
  return (
    <div className="text-left">
      <div className="font-medium">{session?.user?.name}</div>
      <div className="text-sm text-muted-foreground">
        {session?.user?.email}
      </div>
    </div>
  );
}
