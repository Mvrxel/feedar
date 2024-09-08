"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";
import { Textarea } from "@/components/ui/textarea";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/ui/icons";
import { Check } from "lucide-react";
import { SearchStep } from "./_components/search-step";
import { useParams } from "next/navigation";
import { useChat } from "ai/react";
import { Message } from "./_components/message";
import { Separator } from "@/components/ui/separator";
import { MarkdownRenderer } from "./_components/markdown";
import { ThreadLoading } from "./_components/thread-loading";
export default function ThredChatPage() {
  const { thread } = useParams<{ thread: string }>();
  const searchParams = useSearchParams();
  const [isQueryFirstRun, setIsQueryFirstRun] = useState<boolean>(false);
  const scroll: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isAsking, setIsAsking] = useState<boolean>(false);
  const theadChat = api.chat.getThreadMessages.useQuery({
    threadId: thread,
  });
  const { isLoading: isMessagesLoading, data: threadMessages } = theadChat;
  const utils = api.useUtils();
  const createSources = api.chat.createSources.useMutation({
    onSuccess: async () => {
      await utils.chat.getThreadMessages.invalidate({ threadId: thread });
    },
  });
  const createMessage = api.chat.createMessage.useMutation({
    onSuccess: async () => {
      await utils.chat.getThreadMessages.invalidate({ threadId: thread });
    },
  });
  const { isPending: isPendingSources } = createSources;
  const { isPending: isPendingMessage } = createMessage;
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading: generating,
  } = useChat({
    keepLastMessageOnError: true,
    onFinish: async (message) => {
      setIsAsking(false);
      await utils.chat.getThreadMessages.invalidate({ threadId: thread });
    },
  });
  useEffect(() => {
    if (scroll.current) {
      const lastElement = scroll.current.lastElementChild;
      lastElement?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAsking, generating]);
  useEffect(() => {
    if (scroll.current) {
      const lastElement = scroll.current.lastElementChild;
      lastElement?.scrollIntoView({ behavior: "smooth" });
    }
  }, [threadMessages]);
  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsAsking(true);
    const data = { query: input };
    const sources = await createSources.mutateAsync(data);
    await createMessage.mutateAsync({
      threadId: thread,
      content: input,
      sources: sources,
    });
    handleSubmit(event, {
      body: {
        threadId: thread,
        sources: sources,
        message: input,
      },
    });
  }
  useEffect(() => {
    const query = searchParams.get("query");
    if (query !== null) {
      setInput(query);
    }
  }, [searchParams]);
  useEffect(() => {
    if (input !== "" && !isQueryFirstRun) {
      setIsQueryFirstRun(true);
      const form = formRef.current;
      if (form) {
        form.dispatchEvent(new Event("submit", { bubbles: true }));
        setInput("");
      }
    }
  }, [isMessagesLoading]);
  if (isMessagesLoading)
    return (
      <div className="flex h-screen w-full justify-center">
        <ThreadLoading />
      </div>
    );

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="relative w-3/5">
        <div className="h-full w-full">
          <ScrollArea className="h-[80%] w-full">
            <div
              ref={scroll}
              className="shadown shadown my-2 h-full w-full rounded-sm border bg-white px-4 dark:bg-zinc-900"
            >
              {!isAsking
                ? threadMessages?.map((message) => (
                    <div key={message.id} className="mt-4">
                      <div>
                        <Message message={message} />
                        <Separator />
                      </div>
                    </div>
                  ))
                : null}
              {isAsking ? (
                <div>
                  <SearchStep
                    isLoading={isPendingSources}
                    stepName="Genereting query"
                  />
                  <SearchStep
                    isLoading={isPendingSources}
                    stepName="Searching and reading sources"
                  />
                  {generating ? (
                    <SearchStep isLoading={generating} stepName="Answering" />
                  ) : null}
                </div>
              ) : null}
            </div>
            <div>
              {isAsking && generating ? (
                <div>
                  {threadMessages?.map((message) => (
                    <div key={message.id}>
                      {threadMessages[threadMessages.length - 1] === message ? (
                        <Message message={message} />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {isAsking && generating
                ? messages.map((message) => (
                    <div key={message.id}>
                      {messages[messages.length - 1] === message ? (
                        <MarkdownRenderer content={message.content} />
                      ) : null}
                    </div>
                  ))
                : null}
            </div>
          </ScrollArea>
        </div>
        <div className="absolute bottom-12 flex w-full justify-center">
          <div className="relative w-full">
            <form
              ref={formRef}
              onSubmit={sendMessage}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage(e);
                }
              }}
            >
              <Textarea
                placeholder="Ask anything..."
                className="min-h-[120px] resize-none rounded-sm border bg-white py-4 pr-24 shadow dark:bg-zinc-900"
                value={input}
                disabled={
                  generating || isPendingSources || isPendingMessage || isAsking
                }
                onChange={handleInputChange}
              />
              <Button
                size="sm"
                type="submit"
                disabled={
                  generating || isPendingSources || isPendingMessage || isAsking
                }
                className="absolute bottom-2 right-2 mb-2 bg-blue-200 text-black hover:bg-gray-100 dark:bg-gray-200 dark:text-gray-700 dark:hover:bg-gray-300"
              >
                {generating || isPendingSources || isPendingMessage || isAsking
                  ? "Searching..."
                  : "Search"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
