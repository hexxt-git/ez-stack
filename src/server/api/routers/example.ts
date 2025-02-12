import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const exampleRouter = createTRPCRouter({
    hello: publicProcedure.input(z.string()).query(({ input }) => {
        return {
            greeting: `Hello ${input}`,
        };
    }),
    random: publicProcedure.query(() => {
        return Math.floor(Math.random() * 1e6);
    }),
});

export default exampleRouter;
