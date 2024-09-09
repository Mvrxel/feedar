"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function ChatPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const createThread = api.chat.createThread.useMutation();
  const { isPending } = createThread;
  async function handleCreateThread() {
    // const thread = await createThread.mutateAsync();
    // router.push(`/thred/${thread.id}`);
    console.log(query);
  }
  const exapleQuery = [
    "Hottes AI startups",
    "News about AI",
    "Research papers about climate change",
    "How to get visa to work in USA",
  ];
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-1/3">
        <h1 className="to-danger dark:from-primary-dark dark:to-danger-dark bg-gradient-to-r from-primary bg-clip-text text-4xl font-bold text-transparent">
          Hi there,
        </h1>
        <h1 className="to-danger bg-gradient-to-r from-primary bg-clip-text text-4xl font-bold text-zinc-800 dark:text-zinc-200">
          What would you like to know?
        </h1>
        <div className="relative mt-8">
          <Textarea
            placeholder="Ask anything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[120px] resize-none rounded-sm border bg-slate-100 py-4 pr-24 shadow dark:bg-zinc-900"
          />
          <Button
            size="sm"
            disabled={isPending}
            onClick={handleCreateThread}
            className="absolute bottom-2 right-2 mb-2 bg-white text-black hover:bg-gray-100 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-gray-300"
          >
            {isPending ? "Searching..." : "Search"}
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {exapleQuery.map((query, idx) => (
            <div
              key={idx}
              className="cursor-pointer rounded-md border bg-slate-100 p-4 shadow hover:bg-gray-200 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            >
              <h2 className="text-sm">{query}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
