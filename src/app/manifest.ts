import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Next.js PWA",
        short_name: "NextPWA",
        description: "A Progressive Web App built with Next.js",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
            {
                src: "/icon.svg",
                sizes: "any",
                type: "image/svg+xml",
                purpose: "any",
            },
        ],
        screenshots: [
            {
                src: "/screenshot-wide.png",
                sizes: "1423x1006",
                type: "image/png",
                form_factor: "wide",
                label: "Wide screenshot of the app",
            },
            {
                src: "/screenshot-thin.png",
                sizes: "662x977",
                type: "image/png",
                form_factor: "narrow",
                label: "Narrow screenshot of the app",
            },
        ],
    };
}
