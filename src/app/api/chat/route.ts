/* eslint-disable */
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, tool, generateText } from "ai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { env } from "@/env";
import Exa from "exa-js";
import { db } from "@/server/db";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const exa = new Exa(env.EXA_AI_API_KEY);

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({
      error: "Unauthorized",
    });
  }

  const { user } = session;
  const { memberships, id: userId } = user;
  const { messages, threadId, sources, message } = await req.json();
  console.log(sources);
  if (!memberships) {
    throw new Error("You are not a member");
  }
  const workspace = memberships[0]?.workspace;
  if (!workspace) {
    throw new Error("You are not a member of any workspace");
  }
  const prompt = `
    You are a helpful assistant that can answer questions and help with tasks.
    You answer the questions based on the sources user provides.
    Response should be in markdown format.
    Repsonse with language that user asks.
  `;
  const lastMessage = messages[messages.length - 1];
  messages[messages.length - 1] = {
    role: "user",
    content: `
    Question: ${lastMessage.content} 
    Sources: ${sources
      .map(
        (source: { title: string; url: string; summary: string }) =>
          `${source.title} - ${source.url} - ${source.summary}`,
      )
      .join("\n")}
    `,
  };

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: prompt,
    messages: convertToCoreMessages(messages),
    async onFinish({ text }) {
      await db.message.create({
        data: {
          threadId: threadId,
          content: text,
          role: "ASSISTANT",
        },
      });
    },
  });

  return result.toDataStreamResponse();
}
/* eslint-enable */
