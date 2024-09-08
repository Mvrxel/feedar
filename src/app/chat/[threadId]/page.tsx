"use client";
import { ChatInterface } from "@/components/v0-interface";
import { useParams } from "next/navigation";
export default function ChatThreadPage() {
  const { threadId } = useParams<{ threadId: string }>();
  return (
    <div>
      <ChatInterface threadId={threadId} />
    </div>
  );
}
