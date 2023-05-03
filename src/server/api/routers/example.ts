import { z } from "zod";
import axios from "axios";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.query(async () => {
    return "hmhm";
  }),

  getAll: publicProcedure.query(({ ctx }) => {}),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
