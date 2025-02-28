"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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

import { create } from "zustand";

export const useStore = create<{ value: number; increment: () => void }>((set) => ({
    value: 0,
    increment: () => set((state) => ({ ...state, value: state.value + 1 })),
}));

export function IncrementButton() {
    const { value, increment } = useStore();
    const t = useTranslations("HomePage");

    return (
        <Button variant="secondary" onClick={increment}>
            {t("global-state")}: {value}
        </Button>
    );
}
import { api } from "@/lib/react-trpc";

export function ServerIncrementButton() {
    const t = useTranslations("HomePage");
    const { data } = api.counter.state.useQuery();

    const utils = api.useUtils();
    const increment = api.counter.increment.useMutation({
        onMutate: async () => {
            data.count++;
        },
        onError: async () => {
            toast.error("Error Incrementing");
            await utils.counter.invalidate();
        },
        onSuccess: (newCount) => {
            if (data) data.count = newCount;
        },
    });

    return (
        <Button onClick={() => increment.mutate()}>
            {t("server-state")}: {data?.count ?? "loading..."}
        </Button>
    );
}
export function ProtectedData() {
    const { data, refetch } = api.example.secret.useQuery(undefined, { enabled: false });
    const t = useTranslations("HomePage");

    const getSecret = () => {
        refetch();
        if (data) toast(data);
        else toast.error("couldnt get secret");
    };

    return (
        <Button onClick={getSecret} variant="secondary">
            {t("get-secret")}
        </Button>
    );
}
