import { createTRPCRouter, publicProcedure } from "../trpc";

let count = 0;

const counterRouter = createTRPCRouter({
    state: publicProcedure.query(({ctx}) => {
        console.log(ctx)
        return { count };
    }),
    increment: publicProcedure.mutation(() => {
        if (Math.random() < 0.3) throw new Error('random error')
        return ++count;
    }),
});

export default counterRouter;
