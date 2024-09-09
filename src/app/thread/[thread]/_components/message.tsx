import { type Message, $Enums } from "@prisma/client";
import { MarkdownRenderer } from "./markdown";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";

type MessageWithSource = {
  id: string;
  role: $Enums.MessageRole;
  content: string;
  Sources: {
    id: string;
    title: string | null;
    messageId: string;
    url: string;
    shortContent: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export function Message({ message }: { message: MessageWithSource }) {
  return (
    <div className="mt-8">
      {message.role === "USER" ? (
        <div>
          <h1 className="mb-4 text-3xl font-bold">{message.content}</h1>
          <div className="my-4 grid grid-cols-4 gap-4">
            {message.Sources.map((source) => (
              <div
                key={source.id}
                className="mb-4 flex h-28 flex-col justify-between rounded-xl border bg-gray-100 p-4 dark:bg-zinc-900"
              >
                <span className="line-clamp-2 text-sm">{source.title}</span>
                <Separator />
                <Link
                  className="text-sm text-gray-500"
                  href={source.url}
                  target="_blank"
                >
                  Read more
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="my-4 flex items-center">
            <Avatar className="h-8 w-8 rounded-sm bg-yellow-500">
              <AvatarFallback className="h-8 w-8 rounded-sm bg-yellow-500">
                <Sparkles className="h-4 w-4 text-white" />
              </AvatarFallback>
            </Avatar>
            <h1 className="ml-2 text-2xl font-bold">Answer</h1>
          </div>
          <MarkdownRenderer content={message.content} />
        </div>
      )}
    </div>
  );
}
