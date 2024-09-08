"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
export function ThreadList() {
  const router = useRouter();
  const threads = api.chat.getAllThreads.useQuery();
  const { data, isLoading } = threads;
  const handleClick = (threadId: string) => {
    router.push(`/thread/${threadId}`);
  };
  if (isLoading)
    return (
      <div className="flex flex-col gap-2 p-2">
        <Skeleton className="h-12 w-[150px]" />
        <div className="mt-8 flex flex-col gap-2">
          <Skeleton className="h-12 w-[180px]" />
          <Skeleton className="h-12 w-[180px]" />
          <Skeleton className="h-12 w-[180px]" />
        </div>
      </div>
    );
  return (
    <div className="flex flex-col p-2">
      <h1 className="mb-4 text-lg font-bold">Threads</h1>
      {data?.map((thread, idx) => (
        <div key={idx} className="w-46">
          {thread.title ? (
            <div
              className="mb-2 cursor-pointer truncate rounded-md border bg-white px-4 py-2 text-sm shadow hover:bg-gray-100 dark:bg-zinc-900 dark:hover:bg-zinc-700"
              onClick={() => handleClick(thread.id)}
            >
              {thread.title}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
