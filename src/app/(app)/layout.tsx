"use client";
import { Navigation } from "../_components/navigation";
import { api } from "@/trpc/react";
import { Links } from "./feed/_components/links";
import { Icons } from "@/components/ui/icons";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const topics = api.topic.getAll.useQuery();
  const { data, isLoading } = topics;
  if (isLoading || !data)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Icons.spinner className="h-4 w-4 animate-spin" />
      </div>
    );
  return (
    <div className="container">
      <Navigation />
      {data.length === 0 ? null : <Links />}
      <div className="p-4">{children}</div>
    </div>
  );
}
