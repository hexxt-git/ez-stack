import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "@/server/trpc";

const exampleRouter = createTRPCRouter({
    hello: publicProcedure.input(z.string()).query(({ input }) => {
        return {
            greeting: `Hello ${input}`,
        };
    }),
    secret: privateProcedure.query(() => {
        return "this is a secret";
    }),
});

export default exampleRouter;
