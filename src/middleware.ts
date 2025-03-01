import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher(["/(en|fr|ar)/posts(.*)"]);

const localized = createRouteMatcher(["/(en|fr|ar)(.*)"]);

export default clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) await auth.protect();

    if (localized(request)) {
        return intlMiddleware(request);
    }
});

export const config = {
    matcher: ["/(.*)"],
};
