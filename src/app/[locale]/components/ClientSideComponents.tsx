"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, ChevronUp } from "lucide-react";

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

export function DraggableButton() {
    const t = useTranslations("HomePage.buttons");

    return (
        <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.3}
            dragMomentum={false}
        >
            <Button variant="secondary">{t("drag")}</Button>
        </motion.div>
    );
}

export function ToastButton() {
    const t = useTranslations("HomePage");

    const showRandomToast = () => {
        const messages = [
            () => toast.info(t("toasts.info")),
            () => toast.error(t("toasts.error")),
            () => toast.success(t("toasts.success")),
            () => toast.warning(t("toasts.warning")),
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        randomMessage();
    };

    return <Button onClick={showRandomToast}>{t("buttons.toast")}</Button>;
}

export function LanguagePopup({ type = "normal" }: { type?: "tiny" | "normal" | "long" }) {
    const t = useTranslations("HomePage.languages");
    const [isOpen, setIsOpen] = useState(false);
    const currentLocale = useLocale();

    const languages = [
        { code: "en", name: t("en"), flag: "🇺🇸" },
        { code: "fr", name: t("fr"), flag: "🇫🇷" },
        { code: "ar", name: t("ar"), flag: "🇸🇦" },
    ];

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild className="gap-4">
                <Button variant="outline">
                    {type === "tiny" && currentLocale}
                    {type === "normal" && languages.find((l) => l.code === currentLocale)?.name}
                    {type === "long" &&
                        t("popup.current", {
                            language: languages.find((l) => l.code === currentLocale)?.name,
                        })}

                    {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {languages.map((language) => (
                    <Link key={language.code} href="." locale={language.code} className="w-full">
                        <Button variant="ghost" className="w-full justify-start">
                            {language.flag} {language.name}
                        </Button>
                    </Link>
                ))}
            </PopoverContent>
        </Popover>
    );
}
