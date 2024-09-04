"use client";
import { CreateTopic } from "@/components/create-topic";
import { Navigation } from "./_components/navigation";
import { api } from "@/trpc/react";

export default function Home() {
  const topics = api.topic.getAll.useQuery();
  return (
    <div>
      <CreateTopic />
    </div>
  );
}
