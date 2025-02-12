import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
    DraggableButton,
    IncrementButton,
    ServerIncrementButton,
    ToastButton,
    useStore,
} from "./components/ClientSideComponents";
import { LanguageSwitch } from "@/components/language-switch";
import { ThemeToggle } from "@/components/theme-toggle";
import { api, HydrateClient } from "@/lib/server";

export default async function Home() {
    const t = await getTranslations("HomePage");

    const hello = await api.example.hello("from tRPC");
    const random = await api.example.random();

    return (
        <HydrateClient>
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <Image
                        className="dark:invert"
                        src="/next.svg"
                        alt="Next.js logo"
                        width={360}
                        height={80}
                        priority
                    />

                    <section aria-labelledby="main-heading">
                        <h1 id="main-heading" className="text-3xl">
                            {t("title")}
                        </h1>
                        <h2 className="text-lg">{t("about")}</h2>
                        <h3>
                            {hello.greeting} {random}
                        </h3>
                    </section>

                    <section aria-label="Getting Started Instructions">
                        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                            <li className="mb-2">
                                {t("instructions.editFile")}{" "}
                                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded-sm font-semibold">
                                    src/app/page.tsx
                                </code>
                            </li>
                            <li>{t("instructions.saveChanges")}</li>
                        </ol>
                    </section>

                    <section
                        className="flex gap-4 items-center flex-col sm:flex-row flex-wrap max-w-[400px]"
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
                    </section>
                </main>
            </div>
        </HydrateClient>
    );
}
