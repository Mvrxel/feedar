"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreateTopic } from "@/components/create-topic";
import { Plus } from "lucide-react";

export function NoTopics() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="my-4 flex h-full w-full items-center justify-center rounded-md border bg-white py-10 shadow-sm dark:bg-zinc-900">
      {!isOpen ? (
        <div>
          <h1 className="mb-4 text-center text-2xl font-bold">No topics</h1>
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create first topic
          </Button>
        </div>
      ) : (
        <CreateTopic onSuccess={() => setIsOpen(false)} />
      )}
    </div>
  );
}
