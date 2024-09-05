import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const basicTopicSchema = z.object({
  name: z.string(),
  context: z.string().optional(),
  type: z.enum(["BASIC", "COMPETITOR"]),
  includedDomains: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  excludedDomains: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

const competitorTopicSchema = z.object({
  name: z.string(),
  type: z.enum(["BASIC", "COMPETITOR"]),
  competitors: z.array(
    z.object({
      name: z.string(),
      url: z.string().optional(),
      description: z.string().optional(),
    }),
  ),
  includedDomains: z.array(
    z.object({
      name: z.string(),
    }),
  ),
  excludedDomains: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;
    const { memberships } = user;
    const workspace = memberships[0]?.workspace;
    if (!workspace) {
      throw new Error("No workspace found");
    }
    return ctx.db.topic.findMany({
      where: {
        workspace: { id: workspace.id },
      },
    });
  }),
  createBasicTopic: protectedProcedure
    .input(basicTopicSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { memberships } = user;
      const workspace = memberships[0]?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      if (!input.context) {
        throw new Error("Context is required");
      }
      const topic = await ctx.db.topic.create({
        data: {
          name: input.name,
          workspace: { connect: { id: workspace.id } },
          type: "BASIC",
        },
      });
      await ctx.db.topicBasic.create({
        data: {
          topic: { connect: { id: topic.id } },
          context: input.context,
        },
      });
      await ctx.db.includeDomain.createMany({
        data: input.includedDomains.map((domain) => ({
          topicId: topic.id,
          domain: domain.name,
        })),
      });
      await ctx.db.excludeDomain.createMany({
        data: input.excludedDomains.map((domain) => ({
          topicId: topic.id,
          domain: domain.name,
        })),
      });
      return topic;
    }),
  createCompetitorTopic: protectedProcedure
    .input(competitorTopicSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const { memberships } = user;
      const workspace = memberships[0]?.workspace;
      if (!workspace) {
        throw new Error("No workspace found");
      }
      const topic = await ctx.db.topic.create({
        data: {
          name: input.name,
          workspace: { connect: { id: workspace.id } },
          type: "COMPETITOR",
        },
      });
      const topicCompetitor = await ctx.db.topicCompetitor.create({
        data: {
          topic: { connect: { id: topic.id } },
        },
      });
      for (const competitor of input.competitors) {
        await ctx.db.company.create({
          data: {
            topicCompetitor: { connect: { id: topicCompetitor.id } },
            name: competitor.name,
            domain: competitor.url,
            description: competitor.description,
          },
        });
      }
      await ctx.db.includeDomain.createMany({
        data: input.includedDomains.map((domain) => ({
          topicId: topic.id,
          domain: domain.name,
        })),
      });
      await ctx.db.excludeDomain.createMany({
        data: input.excludedDomains.map((domain) => ({
          topicId: topic.id,
          domain: domain.name,
        })),
      });
      return topic;
    }),
});
