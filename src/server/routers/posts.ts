import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { prisma } from "@/server/prisma";
import { clerkClient } from "@clerk/nextjs/server";

const clerk = clerkClient();

export const postsRouter = createTRPCRouter({
    post: privateProcedure.input(z.object({ content: z.string() })).mutation(async ({ ctx, input }) => {
        const post = await prisma.post.create({
            data: {
                content: input.content,
                authorId: ctx.user.userId,
            },
        });

        console.log(post);
    }),
    delete: privateProcedure.input(z.object({ postId: z.number() })).mutation(async ({ ctx, input }) => {
        await prisma.post.delete({
            where: {
                id: input.postId,
                authorId: ctx.user.id,
            },
        });
    }),
    getAll: privateProcedure.query(async () => {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return Promise.all(
            posts.map(async (post) => ({
                ...post,
                author: await (await clerk).users.getUser(post.authorId),
            }))
        );
    }),
});
