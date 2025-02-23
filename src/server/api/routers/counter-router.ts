import { createTRPCRouter, publicProcedure } from "../trpc";

let count = 0;

const counterRouter = createTRPCRouter({
    state: publicProcedure.query(async () => {
        return { count };
    }),
    increment: publicProcedure.mutation(async () => {
        await new Promise((res) => setTimeout(res, 1000))
        if (Math.random() < 0.4) throw new Error("random error");
        return ++count;
    }),
});

export default counterRouter;
