import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "../trpc";
import { prisma } from "@/server/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { minioClient } from "../minio";

const clerk = clerkClient();

export const postsRouter = createTRPCRouter({
    getPresignedUrl: privateProcedure
        .input(z.object({ filename: z.string() }))
        .mutation(async ({ input }) => {
            const uniqueFileName = `${crypto.randomUUID()}-${input.filename}`;

            // Generate a pre-signed URL (valid for 1 hour)
            const url = await minioClient.presignedPutObject(
                process.env.S3_BUCKET_NAME,
                uniqueFileName,
                60 * 60
            );

            return { url, key: uniqueFileName };
        }),
    post: privateProcedure
        .input(z.object({ content: z.string(), media: z.string().optional() }))
        .mutation(async ({ ctx, input }) => {
            await prisma.post.create({
                data: {
                    content: input.content,
                    media: input.media,
                    authorId: ctx.user?.userId || ctx.auth?.userId,
                },
            });
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
            posts.map(async (post) => {
                const author = await (await clerk).users.getUser(post.authorId);
                return {
                    ...post,
                    author: {
                        imageUrl: author.imageUrl,
                        fullName: `${author.firstName} ${author.lastName}`,
                    },
                };
            })
        );
    }),
});
