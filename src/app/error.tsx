"use client";

import Link from "next/link";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    console.error(error);

    return (
        <html>
            <body className="bg-background">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold text-primary mb-4">500</h1>
                            <h2 className="text-3xl font-semibold text-primary mb-4">Server Error</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Oops! Something went wrong on our end. Please try again later.
                            </p>
                            <div className="space-x-4">
                                <button
                                    onClick={reset}
                                    className="inline-flex items-center px-6 py-3 text-primary-foreground font-medium text-on-primary bg-primary rounded-md hover:bg-primary-dark transition-colors duration-200"
                                >
                                    Try Again
                                </button>
                                <Link
                                    href="/"
                                    className="inline-flex items-center px-6 py-3 text-foreground font-medium text-on-surface bg-surface rounded-md hover:bg-surface-dark transition-colors duration-200"
                                >
                                    ← Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
