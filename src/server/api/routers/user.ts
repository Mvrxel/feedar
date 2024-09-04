import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });
  }),
  createMembership: protectedProcedure
    .input(z.object({ name: z.string(), workspace: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name, workspace } = input;
      const { user } = ctx.session;
      await ctx.db.user.update({
        where: { id: user.id },
        data: {
          name,
        },
      });
      return await ctx.db.membership.create({
        data: {
          user: { connect: { id: user.id } },
          workspace: { create: { name: workspace } },
          role: "OWNER",
        },
      });
    }),
});
