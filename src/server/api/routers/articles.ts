import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import Exa from "exa-js";
import { env } from "@/env";

const exa = new Exa(env.EXA_AI_API_KEY);

export const articlesRouter = createTRPCRouter({
  testArtileBasic: protectedProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx.session;
    const { memberships } = user;
    const workspace = memberships[0]?.workspace;
    if (!workspace) {
      throw new Error("No workspace found");
    }
    const topis = await ctx.db.topic.findFirst({
      where: {
        workspaceId: workspace.id,
        type: "BASIC",
      },
      select: {
        id: true,
        topicBasic: true,
      },
    });
    console.log(topis);
    if (!topis) {
      throw new Error("No topics found");
    }
    const context = topis.topicBasic?.context;
    if (!context) {
      throw new Error("No context found");
    }
    const result = await exa.searchAndContents(context, {
      type: "neural",
      useAutoprompt: true,
      numResults: 5,
      text: true,
      category: "news",
      startPublishedDate: "2024-09-04T22:00:01.000Z",
      startCrawlDate: "2024-09-03T22:00:01.000Z",
      summary: true,
    });
    if (!result) {
      throw new Error("No result found");
    }
    for (const article of result.results) {
      await ctx.db.article.create({
        data: {
          title: article.title ?? "test",
          url: article.url ?? "test",
          summary: article.summary ?? "test",
          workspaceId: workspace.id,
          topicId: topis.id,
        },
      });
    }
    return result;
  }),

  testArticleCompetitor: protectedProcedure.mutation(async ({ ctx }) => {
    const { user } = ctx.session;
    const { memberships } = user;
    const workspace = memberships[0]?.workspace;
    if (!workspace) {
      throw new Error("No workspace found");
    }
    const topic = await ctx.db.topic.findFirst({
      where: {
        workspaceId: workspace.id,
        type: "COMPETITOR",
      },
      select: {
        id: true,
      },
    });
    if (!topic) {
      throw new Error("No topic found");
    }
    const competitors = await ctx.db.topicCompetitor.findMany({
      where: {
        topicId: topic.id,
      },
      select: {
        companies: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });
    if (!competitors) {
      throw new Error("No competitors found");
    }
    for (const competitor of competitors) {
      if (!competitor.companies) {
        throw new Error("No companies found");
      }
      const companies = competitor.companies;
      for (const company of companies) {
        const query = `${company.name}(${company.description})`;
        const result = await exa.searchAndContents(query, {
          type: "keyword",
          numResults: 5,
          text: true,
          summary: true,
          startPublishedDate: "2024-09-04T22:00:01.000Z",
          startCrawlDate: "2024-08-31T22:00:01.000Z",
          endCrawlDate: "2024-09-03T22:00:02.000Z",
        });
        if (!result) {
          throw new Error("No result found");
        }
        for (const article of result.results) {
          await ctx.db.article.create({
            data: {
              title: article.title ?? "test",
              url: article.url ?? "test",
              summary: article.summary ?? "test",
              workspaceId: workspace.id,
              topicId: topic.id,
            },
          });
        }
      }
    }
    return competitors;
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;
    const { memberships } = user;
    const workspace = memberships[0]?.workspace;
    if (!workspace) {
      throw new Error("No workspace found");
    }

    return ctx.db.article.findMany({
      where: {
        workspaceId: workspace.id,
      },
      select: {
        id: true,
        title: true,
        url: true,
        summary: true,
        topic: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
});
