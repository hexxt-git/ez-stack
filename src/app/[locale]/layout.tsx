import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/lib/react-trpc";
import { ClerkThemeProvider } from "@/components/clerk-theme-provider";
import { PostHogProvider } from "@/components/posthog-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "EZ Stack",
    description:
        "EZ Stack is a full-stack web application framework built with Next.js, tRPC, Prisma, and Clerk.",
};

export const viewport: Viewport = {
    maximumScale: 1,
    userScalable: false,
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        console.error(`unkown locale detected ${locale}`);
        notFound();
    }

    setRequestLocale(locale);

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <TRPCReactProvider>
            <html lang={locale} suppressHydrationWarning>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                    dir={locale === "ar" ? "rtl" : "ltr"}
                >
                    <NextIntlClientProvider messages={messages}>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <ClerkThemeProvider>
                                <PostHogProvider>
                                    <Toaster
                                        position={locale === "ar" ? "bottom-left" : "bottom-right"}
                                        richColors
                                    />
                                    {children}
                                </PostHogProvider>
                            </ClerkThemeProvider>
                        </ThemeProvider>
                    </NextIntlClientProvider>
                </body>
            </html>
        </TRPCReactProvider>
    );
}
