import exampleRouter from "@/server/routers/example";
import { createCallerFactory, createTRPCRouter } from "@/server/trpc";
import counterRouter from "./routers/counter";
import { postsRouter } from "./routers/posts";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    example: exampleRouter,
    counter: counterRouter,
    posts: postsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
