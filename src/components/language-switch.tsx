"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSwitch({ type = "normal" }: { type?: "tiny" | "normal" | "long" }) {
    const t = useTranslations("Languages");
    const pathname = usePathname();
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
                    <Link key={language.code} href={pathname} locale={language.code} className="w-full">
                        <Button variant="ghost" className="w-full justify-start">
                            {language.flag} {language.name}
                        </Button>
                    </Link>
                ))}
            </PopoverContent>
        </Popover>
    );
}
