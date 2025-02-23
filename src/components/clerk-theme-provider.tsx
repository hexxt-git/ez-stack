"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export function ClerkThemeProvider({ children }) {
    const { resolvedTheme } = useTheme();

    return (
        <ClerkProvider
            appearance={{
                baseTheme: resolvedTheme == "dark" && dark,
            }}
        >
            {children}
        </ClerkProvider>
    );
}
