import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "@/server/root";
import { createTRPCContext } from "@/server/trpc";
import { createQueryClient } from "./query-client";
import { auth } from "@clerk/nextjs/server";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
    const heads = new Headers(await headers());
    heads.set("x-trpc-source", "rsc");

    const authObject = await auth();

    return createTRPCContext({ auth: authObject });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(caller, getQueryClient);
