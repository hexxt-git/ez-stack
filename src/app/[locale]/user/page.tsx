"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { UserButton, useUser } from "@clerk/nextjs";

export default function UserPage() {
    const user = useUser();
    return (
        <div className="min-h-dvh center gap-4">
            <div className="flex gap-4">
                <p>hello {user.user?.fullName}</p>
                <UserButton />
            </div>

            <Link href="/">
                <Button>Home</Button>
            </Link>
        </div>
    );
}

