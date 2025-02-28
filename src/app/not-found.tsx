import Link from "next/link";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function NotFound() {
    return (
        <html>
            <body className="bg-background">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
                            <h2 className="text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors duration-200"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
