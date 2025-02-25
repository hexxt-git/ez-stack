import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
    DraggableButton,
    IncrementButton,
    ProtectedData,
    ServerIncrementButton,
    ToastButton,
} from "./components/ClientSideComponents";
import { LanguageSwitch } from "@/components/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { api } from "@/lib/server";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default async function Home() {
    const t = await getTranslations("HomePage");

    const hello = await api.example.hello("from tRPC");
    const random = await api.example.random();

    return (
        <div className="flex items-center justify-center min-h-screen p-4 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8  items-center sm:items-start">
                <section aria-labelledby="main-heading">
                    <h1 id="main-heading" className="text-7xl tracking-tighter font-semibold">
                        {t("title")}
                    </h1>
                    <h2 className="text-xl">{t("about")}</h2>
                    <h3 className="text-lg">
                        {hello.greeting} {random}
                    </h3>
                </section>

                <section aria-label="Getting Started Instructions">
                    <ol className="list-inside list-decimal text-center sm:text-start font-[family-name:var(--font-geist-mono)] space-y-2">
                        <li>
                            <strong>Next.js</strong>: {t("tech.nextJs")}
                        </li>
                        <li>
                            <strong>Next-Intl</strong>: {t("tech.nextIntl")}
                        </li>
                        <li>
                            <strong>Next-Themes</strong>: {t("tech.nextThemes")}
                        </li>
                        <li>
                            <strong>Tailwind CSS</strong>: {t("tech.tailwindCss")}
                        </li>
                        <li>
                            <strong>Shadcn-UI</strong>: {t("tech.shadcnUi")}
                        </li>
                        <li>
                            <strong>Zustand</strong>: {t("tech.zustand")}
                        </li>
                        <li>
                            <strong>tRPC</strong>: {t("tech.trpc")}
                        </li>
                        <li>
                            <strong>Mongoose</strong>: {t("tech.mongoose")}
                        </li>
                        <li>
                            <strong>Clerk</strong>: {t("tech.clerk")}
                        </li>
                    </ol>
                </section>

                <section
                    className="flex gap-4 items-center flex-wrap max-w-[400px]"
                    aria-label="Interactive Elements"
                >
                    <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                        <Button>{t("buttons.deploy")}</Button>
                    </Link>
                    <ThemeToggle />
                    <DraggableButton />
                    <ToastButton />
                    <LanguageSwitch />
                    <IncrementButton />
                    <ServerIncrementButton />
                    <SignInButton>
                        <Button variant="outline">Sign In</Button>
                    </SignInButton>
                    <UserButton />
                    <ProtectedData />
                </section>
            </main>
        </div>
    );
}
