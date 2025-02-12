"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const t = useTranslations("HomePage.buttons.theme");

    return (
        <Button
            suppressHydrationWarning
            variant="outline"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={t("ariaLabel", {
                theme: resolvedTheme === "dark" ? "light" : "dark",
            })}
        >
            {t("text")}
        </Button>
    );
}
