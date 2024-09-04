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
      return ctx.db.topic.create({
        data: {
          ...input,
          workspace: { connect: { id: workspace.id } },
          type: "BASIC",
        },
      });
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
      return ctx.db.topic.create({
        data: {
          ...input,
          workspace: { connect: { id: workspace.id } },
          type: "COMPETITOR",
        },
      });
    }),
});
