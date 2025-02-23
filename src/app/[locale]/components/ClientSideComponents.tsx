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

const useToastIndexState = create<{ index: number; increment: () => void }>((set) => ({
    index: 0,
    increment: () => set(({ index: i }) => ({ index: i + 1 })),
}));

export function ToastButton() {
    const t = useTranslations("HomePage");
    const { index, increment } = useToastIndexState();

    const showRandomToast = () => {
        const messages = [
            () => toast.info(t("toasts.info")),
            () => toast.error(t("toasts.error")),
            () => toast.success(t("toasts.success")),
            () => toast.warning(t("toasts.warning")),
        ];
        const randomMessage = messages[index % messages.length];
        increment();
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

import { useMutation, useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/components/client-query-client";

export function ServerIncrementButton() {
    const t = useTranslations();
    const trpc = useTRPC();

    const query = useQuery(trpc.counter.state.queryOptions());
    const mutation = useMutation(trpc.counter.increment.mutationOptions());

    const increment = () => {
        mutation.mutate();
        query.data.count++;
        query.refetch();
    };

    return (
        <Button onClick={increment}>
            {t("server-state")}: {!query.isLoading ? query.data.count : "loading..."}
        </Button>
    );
}
