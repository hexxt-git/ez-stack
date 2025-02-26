import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

// todo find the type
export const createTRPCContext = async (opts: { user: any }) => {
    return {
        ...opts,
    };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

export const createCallerFactory = t.createCallerFactory;
export const createTRPCRouter = t.router;

const timingMiddleware = t.middleware(async ({ next, path }) => {
    const start = Date.now();

    const result = await next();

    const end = Date.now();
    console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

    return result;
});

const authMiddleware = t.middleware(async ({ next, ctx }) => {
    if (!ctx.user.userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    return await next();
});

export const publicProcedure = t.procedure.use(timingMiddleware);
export const privateProcedure = publicProcedure.use(authMiddleware);
