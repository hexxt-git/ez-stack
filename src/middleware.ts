import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher(["/(en|fr|ar)/posts(.*)"]);

export default clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) await auth.protect();

    if (!request.nextUrl.pathname.startsWith("/api")) {
        return intlMiddleware(request);
    }
});

export const config = {
    matcher: [
        "/(en|fr|ar)(.*)",
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
