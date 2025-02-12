import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const exampleRouter = createTRPCRouter({
    hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
        return {
            greeting: `Hello ${input.text}`,
        };
    }),
    random: publicProcedure.query(() => {
        return Math.floor(Math.random() * 1e6);
    }),
});

export default exampleRouter;
