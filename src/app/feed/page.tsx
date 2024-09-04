"use client";
import { api } from "@/trpc/react";
import { NoTopics } from "./_components/no-topics";

export default function Feed() {
  const topics = api.topic.getAll.useQuery();
  const { data, isLoading } = topics;
  if (isLoading || !data) return <div>Loading...</div>;
  return <div>{data.length === 0 ? <NoTopics /> : null}</div>;
}
