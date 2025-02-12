import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LanguagePopup, ThemeToggle, DraggableButton, ToastButton } from "./components/ClientSideComponents";

export default async function Home() {
    const t = await getTranslations("HomePage");

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={180}
                    height={38}
                    priority
                />

                <section aria-labelledby="main-heading">
                    <h1 id="main-heading" className="text-3xl">
                        {t("title")}
                    </h1>
                    <h2 className="text-lg">{t("about")}</h2>
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
                    <LanguagePopup />
                </section>
            </main>
        </div>
    );
}
