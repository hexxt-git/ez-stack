import { redirect } from "@/i18n/routing";
import { useLocale } from "next-intl";

export default function Page() {
    const locale = useLocale();
    return redirect({ href: "/", locale });
}
