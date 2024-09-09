"use client";
import { useRef, useEffect, MutableRefObject } from "react";
import { PlusIcon, ClockIcon, ArrowUpIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useChat } from "ai/react";
import { api } from "@/trpc/react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";
import { Icons } from "./ui/icons";
export function ChatInterface({ threadId }: { threadId: string }) {
  return (
    <div>
      <h1>Chat Interface</h1>
    </div>
  );
  // const {
  //   messages,
  //   input,
  //   handleInputChange,
  //   handleSubmit,
  //   isLoading: generating,
  // } = useChat({
  //   keepLastMessageOnError: true,
  //   onFinish: async (message) => {
  //     await utils.chat.getThreadMessages.invalidate({ threadId });
  //   },
  // });
  // const utils = api.useUtils();
  // const createSources = api.chat.createSources.useMutation({
  //   onSuccess: async () => {
  //     await utils.chat.getThreadMessages.invalidate({ threadId });
  //   },
  // });
  // const { isPending: isPendingSources } = createSources;
  // const createMessage = api.chat.createMessage.useMutation({
  //   onSuccess: async () => {
  //     await utils.chat.getThreadMessages.invalidate({ threadId });
  //   },
  // });
  // const { isPending: isPendingMessage } = createMessage;
  // const getThreadMessages = api.chat.getThreadMessages.useQuery({ threadId });
  // const { data: theedMessages, isLoading } = getThreadMessages;
  // async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault();
  //   const data = { query: input };
  //   const sources = await createSources.mutateAsync(data);
  //   await createMessage.mutateAsync({
  //     threadId: threadId,
  //     content: input,
  //     sources: sources,
  //   });
  //   // const sources = [
  //   //   {
  //   //     title: "Paradox: The AI assistant for recruiting, Olivia",
  //   //     url: "https://www.paradox.ai/",
  //   //     summary:
  //   //       "Paradox is a conversational recruiting software designed to automate administrative tasks, freeing up recruiters and hiring managers to focus on more strategic work. The platform includes a conversational ATS (Applicant Tracking System) that streamlines the hiring process for both candidates and employers.  Paradox also offers conversational career sites that provide realistic job previews, employer branding content, and job recommendations at the candidate's fingertips.  By automating tasks like scheduling interviews and sending out application updates, Paradox helps reduce time-to-hire and improve the candidate experience.  The company works with major HCM (Human Capital Management) systems, ensuring seamless integration with existing workflows. With a focus on efficiency and positive candidate interactions, Paradox aims to make the hiring process conversational and frictionless. \n",
  //   //   },
  //   //   {
  //   //     title: "Harvey | Generative AI for Elite Law Firms",
  //   //     url: "https://www.harvey.ai/",
  //   //     summary: `Harvey is a legal AI platform designed to enhance workflows for professional service providers. It offers a suite of products tailored to lawyers and law firms across all practice areas and workflows. Harvey leverages large language models trained on complex legal tasks and fine-tuned by domain experts. The platform provides unprecedented visibility into a firm's productivity, enabling tracking of work product
  //   // by attorney, client matter, and practice area. Harvey prioritizes security and is deployed on Microsoft Azure with comprehensive security accreditations and advice from top security experts. Join now and be among the leading firms using Harvey to optimize legal processes and enhance productivity. \n`,
  //   //   },
  //   // ];
  //   handleSubmit(event, {
  //     body: {
  //       threadId: threadId,
  //       sources: sources,
  //       message: input,
  //     },
  //   });
  // }
  // const scroll: MutableRefObject<HTMLDivElement | null> = useRef(null);

  // useEffect(() => {
  //   if (scroll.current) {
  //     scroll.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [theedMessages]);
  // useEffect(() => {
  //   if (scroll.current) {
  //     scroll.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [messages, generating]);
  // const renderers = {
  //   a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  //     <a className="mb-2 text-blue-500 hover:underline" {...props} />
  //   ),
  //   blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
  //     <blockquote
  //       className="mb-4 border-l-4 border-gray-300 pl-4 italic dark:border-zinc-800"
  //       {...props}
  //     />
  //   ),
  //   br: (props: React.HTMLAttributes<HTMLBRElement>) => (
  //     <br className="mb-2" {...props} />
  //   ),
  //   code: (props: React.HTMLAttributes<HTMLElement>) => (
  //     <code
  //       className="mb-2 rounded bg-gray-100 p-1 dark:bg-zinc-800"
  //       {...props}
  //     />
  //   ),
  //   em: (props: React.HTMLAttributes<HTMLElement>) => (
  //     <em className="mb-2 italic" {...props} />
  //   ),
  //   h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  //     <h1 className="mb-6 text-3xl font-bold" {...props} />
  //   ),
  //   h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  //     <h2 className="mb-5 text-2xl font-semibold" {...props} />
  //   ),
  //   h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  //     <h3 className="mb-4 text-xl font-semibold" {...props} />
  //   ),
  //   h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  //     <h4 className="mb-3 text-lg font-semibold" {...props} />
  //   ),
  //   h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  //     <h5 className="mb-3 text-base font-semibold" {...props} />
  //   ),
  //   h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  //     <h6 className="mb-2 text-sm font-semibold" {...props} />
  //   ),
  //   hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
  //     <hr className="mb-4 border-gray-300 dark:border-zinc-800" {...props} />
  //   ),
  //   img: (props: React.HTMLAttributes<HTMLImageElement>) => (
  //     <img className="mb-4 h-auto max-w-full" {...props} />
  //   ),
  //   li: (props: React.HTMLAttributes<HTMLLIElement>) => (
  //     <li className="mb-1 list-disc pl-5" {...props} />
  //   ),
  //   ol: (props: React.HTMLAttributes<HTMLUListElement>) => (
  //     <ol className="mb-4 list-decimal pl-5" {...props} />
  //   ),
  //   p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
  //     <p className="mb-4" {...props} />
  //   ),
  //   pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
  //     <pre
  //       className="mb-4 overflow-x-auto rounded bg-gray-100 dark:bg-zinc-800"
  //       {...props}
  //     />
  //   ),
  //   strong: (props: React.HTMLAttributes<HTMLElement>) => (
  //     <strong className="mb-2 font-bold" {...props} />
  //   ),
  //   ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
  //     <ul className="mb-4 list-disc pl-5" {...props} />
  //   ),
  // };
  // if (isLoading) return <div>Loading...</div>;
  // return (
  //   <div className="flex h-screen">
  //     {/* Sidebar */}
  //     <div className="flex w-16 flex-col items-center space-y-4 border-r border-gray-200 py-4 dark:border-zinc-800">
  //       <div className="text-2xl font-bold">A</div>
  //       <Button variant="ghost" size="icon">
  //         <PlusIcon className="h-6 w-6" />
  //       </Button>
  //       <Button variant="ghost" size="icon">
  //         <ClockIcon className="h-6 w-6" />
  //       </Button>
  //     </div>
  //     {theedMessages && theedMessages.length === 0 ? (
  //       <div className="flex flex-1 flex-col items-center justify-center">
  //         <main className="">
  //           <div className="mx-auto max-w-2xl space-y-8">
  //             <h1 className="text-center text-4xl font-bold">
  //               Place where your knowledge begins
  //             </h1>
  //             <div className="space-y-4">
  //               <form
  //                 onSubmit={sendMessage}
  //                 onKeyDown={(e) => {
  //                   if (e.key === "Enter") {
  //                     e.preventDefault();
  //                     sendMessage(e);
  //                   }
  //                 }}
  //               >
  //                 <div className="relative">
  //                   <Textarea
  //                     value={input}
  //                     onChange={handleInputChange}
  //                     placeholder="Ask anything..."
  //                     className="min-h-[100px] resize-none rounded-xl py-4 pr-24"
  //                     disabled={
  //                       generating || isPendingSources || isPendingMessage
  //                     }
  //                   />
  //                   <Button
  //                     type="submit"
  //                     size="sm"
  //                     className="absolute bottom-2 right-2 mb-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
  //                     disabled={
  //                       generating || isPendingSources || isPendingMessage
  //                     }
  //                   >
  //                     {generating || isPendingSources || isPendingMessage ? (
  //                       <div>
  //                         <Icons.spinner className="mr-1 h-4 w-4 animate-spin" />
  //                       </div>
  //                     ) : (
  //                       <ArrowUpIcon className="mr-1 h-4 w-4" />
  //                     )}

  //                     {generating || isPendingSources || isPendingMessage
  //                       ? "Generating..."
  //                       : "Send"}
  //                   </Button>
  //                 </div>
  //               </form>
  //             </div>
  //             <div className="flex space-x-4 text-sm">
  //               <Link
  //                 href="#"
  //                 className="rounded-xl border p-2 text-gray-500 hover:text-gray-700"
  //               >
  //                 Generate a multi-step onboarding flow
  //               </Link>
  //               <Link
  //                 href="#"
  //                 className="rounded-xl border p-2 text-gray-500 hover:text-gray-700"
  //               >
  //                 How can I structure LLM output?
  //               </Link>
  //               <Link
  //                 href="#"
  //                 className="rounded-xl border p-2 text-gray-500 hover:text-gray-700"
  //               >
  //                 Write code to implement a min heap
  //               </Link>
  //             </div>
  //           </div>
  //         </main>
  //       </div>
  //     ) : (
  //       <div className="mx-96 flex w-full flex-col justify-center">
  //         <ScrollArea className="my-4 h-[80vh] p-4">
  //           <div ref={scroll} className="p-4">
  //             {theedMessages &&
  //               theedMessages.map((message) => (
  //                 <div key={message.id} className="mb-8">
  //                   <div>
  //                     {message.role === "USER" ? null : (
  //                       <div className="my-4 flex items-center">
  //                         <Avatar className="h-8 w-8 rounded-sm bg-yellow-500">
  //                           <AvatarFallback className="h-8 w-8 rounded-sm bg-yellow-500">
  //                             <Sparkles className="h-6 w-6" />
  //                           </AvatarFallback>
  //                         </Avatar>
  //                         <h1 className="ml-2 text-2xl font-bold">Answer</h1>
  //                       </div>
  //                     )}
  //                     {message.role === "USER" ? (
  //                       <h1 className="mb-4 text-2xl font-bold">
  //                         {message.content}
  //                       </h1>
  //                     ) : (
  //                       <Markdown
  //                         components={renderers}
  //                         remarkPlugins={[remarkBreaks]}
  //                       >
  //                         {message.content}
  //                       </Markdown>
  //                     )}
  //                     {message.role === "USER" ? (
  //                       <div className="mt-4">
  //                         <h1 className="mb-4 text-xl text-foreground">
  //                           Sources:
  //                         </h1>
  //                         <div className="flex space-x-4">
  //                           {message.Sources.map((source) => (
  //                             <div
  //                               key={source.id}
  //                               className="mb-4 flex h-28 w-52 flex-col justify-between rounded-xl border p-4"
  //                             >
  //                               <span className="line-clamp-2 text-sm">
  //                                 {source.title}
  //                               </span>
  //                               <Separator />
  //                               <Link
  //                                 className="text-sm text-gray-500"
  //                                 href={source.url}
  //                               >
  //                                 Link
  //                               </Link>
  //                             </div>
  //                           ))}
  //                         </div>
  //                       </div>
  //                     ) : null}
  //                   </div>
  //                 </div>
  //               ))}
  //             {isPendingMessage || isPendingSources ? (
  //               <div>
  //                 <div className="my-4 flex items-center">
  //                   <Avatar className="h-8 w-8 rounded-sm bg-yellow-500">
  //                     <AvatarFallback className="h-8 w-8 rounded-sm bg-yellow-500">
  //                       <Sparkles className="h-6 w-6" />
  //                     </AvatarFallback>
  //                   </Avatar>
  //                   <h1 className="ml-2 text-2xl font-bold">I'm thinking...</h1>
  //                 </div>
  //               </div>
  //             ) : null}
  //             {generating && (
  //               <div>
  //                 {messages.map((message) => (
  //                   <div key={message.id}>
  //                     {messages[messages.length - 1] === message ? (
  //                       <div>
  //                         <Markdown
  //                           components={renderers}
  //                           remarkPlugins={[remarkBreaks]}
  //                         >
  //                           {message.content}
  //                         </Markdown>
  //                       </div>
  //                     ) : null}
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //           </div>
  //         </ScrollArea>
  //         <div>
  //           <form
  //             onSubmit={sendMessage}
  //             onKeyDown={(e) => {
  //               if (e.key === "Enter") {
  //                 e.preventDefault();
  //                 sendMessage(e);
  //               }
  //             }}
  //           >
  //             <div className="relative">
  //               <Textarea
  //                 value={input}
  //                 onChange={handleInputChange}
  //                 placeholder="Ask anything..."
  //                 className="min-h-[100px] resize-none rounded-xl py-4 pr-24"
  //                 disabled={generating || isPendingSources || isPendingMessage}
  //               />
  //               <Button
  //                 type="submit"
  //                 size="sm"
  //                 className="absolute bottom-2 right-2 mb-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
  //                 disabled={generating || isPendingSources || isPendingMessage}
  //               >
  //                 {generating || isPendingSources || isPendingMessage ? (
  //                   <div>
  //                     <Icons.spinner className="mr-1 h-4 w-4 animate-spin" />
  //                   </div>
  //                 ) : (
  //                   <ArrowUpIcon className="mr-1 h-4 w-4" />
  //                 )}

  //                 {generating || isPendingSources || isPendingMessage
  //                   ? "Generating..."
  //                   : "Send"}
  //               </Button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  //);
}
