import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

let count = 0;

type Post = {
    id: number;
    name: string;
};

const posts: Post[] = [];

const counterRouter = createTRPCRouter({
    state: publicProcedure.query(() => {
        return { count };
    }),
    increment: publicProcedure.mutation(async () => {
        count++;
    }),
    create: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ input }) => {
        const post: Post = {
            id: posts.length + 1,
            name: input.name,
        };
        posts.push(post);
        return post;
    }),
});

export default counterRouter;
