import { Link } from "@/i18n/routing";
import "@/app/globals.css";

export default function Forbidden() {
    return (
        <html>
            <body className="bg-gray-50">
                <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">403</h1>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Access Forbidden</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Sorry, you don&#39;t have permission to access this page.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    );
}
