"use client";
import { api } from "@/trpc/react";
export function ProfileInformation() {
  const { data, isLoading } = api.user.getUser.useQuery();
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <div className="text-left">
      <div className="font-medium">{data.name}</div>
      <div className="text-sm text-muted-foreground">{data.email}</div>
    </div>
  );
}
