import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import Exa from "exa-js";

const exa = new Exa("f226e5f8-c9db-4679-a0e0-f420b64105ec");

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
  createSources: protectedProcedure
    .input(z.object({ query: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { memberships } = user;
      const workspace = memberships[0]?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      const result = await exa.searchAndContents(input.query, {
        type: "auto",
        numResults: 4,
        text: true,
        summary: {
          query: "Summary max 6 senteces.",
        },
      });
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
