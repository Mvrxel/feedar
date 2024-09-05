"use server";

import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

type PublicRoute = string[];
const publicRoutes: PublicRoute = ["/auth/login"];

function isPublicRoute(path: string): boolean {
  return publicRoutes.some((route) => {
    if (route.endsWith("/*")) {
      return path.startsWith(route.slice(0, -2));
    }
    return route === path;
  });
}

export async function ProtectedProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const member = session?.user.memberships;
  console.log(member?.length);
  const header = headers().get("x-next-pathname");

  // Redirect to login page when session is not available
  if (!session && header && !isPublicRoute(header)) {
    redirect("/auth/login");
  }

  if (session && header && header !== "/onboard" && member?.length === 0) {
    redirect("/onboard");
  }

  if (session && header && header === "/onboard" && member?.length !== 0) {
    redirect("/feed");
  }
  if (session && header && header === "/" && member?.length !== 0) {
    redirect("/feed");
  }

  if (session && header && isPublicRoute(header)) {
    redirect("/feed");
  }

  return <div>{children}</div>;
}
