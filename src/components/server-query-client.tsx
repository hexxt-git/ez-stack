import "server-only"; // <-- ensure this file cannot be imported from the client

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { createTRPCContext } from "@/server/api/trpc";
import { makeQueryClient } from "@/lib/query-client";
import { appRouter } from "@/server/api/routers/root";
// import { createTRPCClient } from "@trpc/client";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
    ctx: createTRPCContext,
    router: appRouter,
    queryClient: getQueryClient,
});

// // If your router is on a separate server, pass a client:
// createTRPCOptionsProxy({
//     client: createTRPCClient(),
//     // {
//     // links: [httpLink({ url: '...' })],
//     // }
//     queryClient: getQueryClient,
// });
