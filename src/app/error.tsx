"use client";

import Link from "next/link";
import "@/app/globals.css";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body className="bg-gray-50">
                <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">500</h1>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Server Error</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Oops! Something went wrong on our end. Please try again later.
                        </p>
                        <div className="space-x-4">
                            <button
                                onClick={reset}
                                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                Try Again
                            </button>
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                            >
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
