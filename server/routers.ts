import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { addEmailSignup, getEmailSignups, addContactSubmission, getContactSubmissions } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  landing: router({
    subscribeNewsletter: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        try {
          await addEmailSignup(input.email);
          return { success: true, message: "Successfully subscribed to newsletter" };
        } catch (error) {
          console.error("Newsletter subscription error:", error);
          return { success: false, message: "Failed to subscribe" };
        }
      }),

    submitContact: publicProcedure
      .input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        company: z.string().optional(),
        message: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        try {
          await addContactSubmission(input);
          return { success: true, message: "Contact submission received" };
        } catch (error) {
          console.error("Contact submission error:", error);
          return { success: false, message: "Failed to submit contact form" };
        }
      }),

    getEmailSignups: protectedProcedure
      .input(z.object({ status: z.string().optional() }).optional())
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        return await getEmailSignups(input?.status);
      }),

    getContactSubmissions: protectedProcedure
      .input(z.object({ status: z.string().optional() }).optional())
      .query(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized: Admin access required");
        }
        return await getContactSubmissions(input?.status);
      }),
  }),
});

export type AppRouter = typeof appRouter;
