import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { openai } from "@ai-sdk/openai";
import {
  convertToCoreMessages,
  streamText,
  tool,
  generateText,
  generateObject,
} from "ai";
import Exa from "exa-js";
import { Search } from "lucide-react";

const exa = new Exa("f226e5f8-c9db-4679-a0e0-f420b64105ec");

const SearchObjectSchema = z.object({
  type: z
    .enum(["basic", "news", "research paper", "company"])
    .default("basic")
    .describe(
      'The type of search to perform. Predict based on the query, defaulting to "basic" if unclear.',
    ),
  query: z
    .string()
    .describe("The search query, converted to a search-friendly format."),
  numResults: z
    .number()
    .int()
    .min(4)
    .max(10)
    .describe("The number of results to return, between 4 and 10."),
  start_published_date: z
    .string()
    .datetime()
    .optional()
    .describe(
      "The start date for filtering results, in ISO format. Include only if the query implies a time range (Newest, last week etc).",
    ),
  end_published_date: z
    .string()
    .datetime()
    .optional()
    .describe(
      "The end date for filtering results, in ISO format. Include only if the query implies a time range. (Newest, last week etc).",
    ),
});

export const chatRouter = createTRPCRouter({
  createThread: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { memberships } = user;
      const workspace = memberships[0]?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      return await ctx.db.thread.create({
        data: {
          workspaceId: workspace.id,
          title: input.title,
        },
      });
    }),
  createQuery: protectedProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { memberships } = user;
      const workspace = memberships[0]?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      const result = await generateObject({
        model: openai("gpt-4o"),
        schema: SearchObjectSchema,
        prompt: `Convert the following query to a search object. Query: ${input.query}`,
      });
      return result;
    }),
  createSources: protectedProcedure
    .input(z.object({ query: z.string(), searchObject: SearchObjectSchema }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { memberships } = user;
      const workspace = memberships[0]?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      const searchObject = input.searchObject;
      let result;
      if (searchObject.type === "news") {
        result = await exa.searchAndContents(input.query, {
          type: "auto",
          category: "news",
          numResults: searchObject.numResults,
          text: true,
          summary: {
            query: `Summarry should answer the question: ${input.query}`,
          },
          start_published_date: searchObject.start_published_date
            ? searchObject.start_published_date
            : null,
          end_published_date: searchObject.end_published_date
            ? searchObject.end_published_date
            : null,
        });
      }
      if (searchObject.type === "research paper") {
        result = await exa.searchAndContents(input.query, {
          type: "auto",
          category: "research paper",
          numResults: searchObject.numResults,
          text: true,
          summary: {
            query: `Summarry should answer the question: ${input.query}`,
          },
          start_published_date: searchObject.start_published_date
            ? searchObject.start_published_date
            : null,
          end_published_date: searchObject.end_published_date
            ? searchObject.end_published_date
            : null,
        });
      }
      if (searchObject.type === "company") {
        result = await exa.searchAndContents(input.query, {
          type: "auto",
          category: "company",
          numResults: searchObject.numResults,
          text: true,
          summary: {
            query: `Summarry should answer the question: ${input.query}`,
          },
          start_published_date: searchObject.start_published_date
            ? searchObject.start_published_date
            : null,
          end_published_date: searchObject.end_published_date
            ? searchObject.end_published_date
            : null,
        });
      }
      if (searchObject.type === "basic") {
        result = await exa.searchAndContents(input.query, {
          type: "auto",
          numResults: searchObject.numResults,
          text: true,
          summary: {
            query: `Summarry should answer the question: ${input.query}`,
          },
          start_published_date: searchObject.start_published_date
            ? searchObject.start_published_date
            : null,
          end_published_date: searchObject.end_published_date
            ? searchObject.end_published_date
            : null,
        });
      }
      if (!result) {
        throw new Error("No result found");
      }
      const sources = [] as {
        title: string;
        url: string;
        summary: string;
      }[];
      for (const data of result.results) {
        if (data.title && data.url && data.summary) {
          sources.push({
            title: data.title,
            url: data.url,
            summary: data.summary,
          });
        }
      }
      return sources;
    }),
  getThreadMessages: protectedProcedure
    .input(z.object({ threadId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { memberships } = user;
      const workspace = memberships[0]?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      return await ctx.db.message.findMany({
        where: {
          threadId: input.threadId,
        },
        select: {
          id: true,
          content: true,
          role: true,
          Sources: true,
        },
      });
    }),
  createMessage: protectedProcedure
    .input(
      z.object({
        threadId: z.string(),
        content: z.string(),
        sources: z.array(
          z.object({
            title: z.string(),
            url: z.string(),
            summary: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { memberships } = user;
      const workspace = memberships[0]?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      const sources = input.sources;
      const message = await ctx.db.message.create({
        data: {
          threadId: input.threadId,
          content: input.content,
          role: "USER",
        },
      });
      for (const source of sources) {
        await ctx.db.source.create({
          data: {
            messageId: message.id,
            title: source.title,
            url: source.url,
            shortContent: source.summary,
          },
        });
      }
      const response = await ctx.db.message.findUnique({
        where: {
          id: message.id,
        },
        select: {
          id: true,
          content: true,
          role: true,
          Sources: true,
        },
      });
      return response;
    }),
  getAllThreads: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;
    const { memberships } = user;
    const workspace = memberships[0]?.workspace;
    if (!workspace) {
      throw new Error("No workspace found");
    }
    return await ctx.db.thread.findMany({
      where: { workspaceId: workspace.id },
    });
  }),
});
