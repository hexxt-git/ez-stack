import { Link } from "@/i18n/routing";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export default function Forbidden() {
    return (
        <html>
            <body className="bg-background">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold text-primary mb-4">403</h1>
                            <h2 className="text-3xl font-semibold text-primary mb-4">Access Forbidden</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Sorry, you don&#39;t have permission to access this page.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 text-foreground font-medium text-on-surface bg-surface rounded-md hover:bg-surface-dark transition-colors duration-200"
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
