import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/trpc";

const exampleRouter = createTRPCRouter({
    hello: publicProcedure.input(z.string()).query(({ input }) => {
        return {
            greeting: `Hello ${input}`,
        };
    }),
    random: publicProcedure.query(() => {
        return Math.floor(Math.random() * 1e6);
    }),
    secret: privateProcedure.query(() => {
        return "this is a secret";
    }),
});

export default exampleRouter;
