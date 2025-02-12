"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Home() {
    const theme = useTheme();

    const toggleTheme = () => {
        theme.setTheme(theme.resolvedTheme === "dark" ? "light" : "dark");
    };

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
                <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                    <li className="mb-2">
                        Get started by editing{" "}
                        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded-sm font-semibold">
                            src/app/page.tsx
                        </code>
                        .
                    </li>
                    <li>Save and see your changes instantly.</li>
                </ol>
                <div className="flex flex-col gap-4 w-full max-w-[320px]">
                    <Label htmlFor="input">Example input</Label>
                    <Input id="inputs" />
                </div>

                <div className="flex gap-4 items-center flex-col sm:flex-row flex-wrap">
                    <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                        <Button>Deploy on vercel</Button>
                    </Link>
                    <Button variant="outline" onClick={toggleTheme}>
                        toggle theme
                    </Button>
                </div>
            </main>
        </div>
    );
}
