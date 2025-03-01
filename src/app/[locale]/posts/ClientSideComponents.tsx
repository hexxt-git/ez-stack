"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/react-trpc";
import { UserButton, useUser } from "@clerk/nextjs";
import { api as serverSideAPI } from "@/lib/server";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Type definitions
type Post = Awaited<ReturnType<typeof serverSideAPI.posts.getAll>>[number];

export interface PostsClientProps {
    initialPosts: Post[];
}

// User Header Component
function UserHeader() {
    return (
        <motion.div
            className="absolute top-0 end-0 m-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <UserButton />
        </motion.div>
    );
}

// Post Form Component
function PostForm({
    onSubmit,
    isSubmitting,
}: {
    onSubmit: (content: string, file: File | null) => Promise<void>;
    isSubmitting: boolean;
}) {
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onSubmit(content, file);
        setContent("");
        setFile(null);
        // Reset the file input
        const fileInput = document.getElementById("file") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            className="rounded-lg border p-4 space-y-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <label htmlFor="content" className="text-xl font-medium">
                new post
            </label>

            <Input
                type="text"
                id="content"
                name="content"
                className="mt-2"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSubmitting}
            />

            <Input
                type="file"
                id="file"
                name="file"
                className="mt-2"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={isSubmitting}
            />

            <Button
                type="submit"
                className="float-end"
                size="sm"
                disabled={isSubmitting || (!content && !file)}
            >
                {isSubmitting ? "Sending..." : "Send"}
            </Button>
        </motion.form>
    );
}

// Post Card Component
function PostCard({ post, canDelete, onDelete }: { post: Post; canDelete: boolean; onDelete: () => void }) {
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="border rounded p-4 w-full space-y-4"
            variants={item}
            layout
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
        >
            <motion.h2
                className="text-xl font-medium break-all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <motion.img
                    src={post.author.imageUrl}
                    alt={post.author.fullName}
                    className="inline size-7 rounded-full me-2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
                {post.author.fullName}
            </motion.h2>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                {post.content}
            </motion.p>

            {post.media && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                >
                    {post.media.match(/\.(mp4|webm|ogg|avi|mov|mkv)$/) ? (
                        <video
                            src={process.env.NEXT_PUBLIC_S3_PUBLIC_URL + "/" + post.media}
                            className="w-full rounded-sm"
                            controls
                        />
                    ) : (
                        <img
                            src={process.env.NEXT_PUBLIC_S3_PUBLIC_URL + "/" + post.media}
                            className="w-full rounded-sm"
                        />
                    )}
                </motion.div>
            )}

            <div className="flex justify-between items-center">
                <motion.p
                    className="text-muted-foreground text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {new Date(post.createdAt).toLocaleString("en-CA", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    })}
                </motion.p>

                {canDelete && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button variant="destructive" size="sm" onClick={onDelete}>
                            delete
                        </Button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}

// Post List Component
function PostList({
    posts,
    currentUserId,
    onDeletePost,
}: {
    posts: Post[];
    currentUserId?: string;
    onDeletePost: (postId: number) => void;
}) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <motion.div className="w-full space-y-4" variants={container} initial="hidden" animate="show">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        canDelete={post.authorId === currentUserId}
                        onDelete={() => onDeletePost(post.id)}
                    />
                ))
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground"
                >
                    No posts yet. Be the first to post!
                </motion.p>
            )}
        </motion.div>
    );
}

// Main Component
export default function PostsClient({ initialPosts }: PostsClientProps) {
    const { user } = useUser();
    const { data: posts = initialPosts, refetch } = api.posts.getAll.useQuery();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getPresignedUrlMutation = api.posts.getPresignedUrl.useMutation().mutateAsync;

    const createPostMutation = api.posts.post.useMutation({
        onSuccess: () => {
            setIsSubmitting(false);
            refetch();
        },
    }).mutate;

    const deletePostMutation = api.posts.delete.useMutation({
        onSuccess: refetch,
    }).mutate;

    const handleDeletePost = (postId: number) => {
        deletePostMutation({ postId });
    };

    const handleCreatePost = async (content: string, file: File | null) => {
        setIsSubmitting(true);

        let image: string | undefined = undefined;

        if (file && file.name) {
            try {
                const { url, key } = await getPresignedUrlMutation({ filename: file.name });

                await fetch(url, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type,
                        // Removed Access-Control-Allow-Origin header since it needs to be set on the server
                    },
                });

                image = key;
            } catch (error) {
                console.error("Error uploading file:", error);
                setIsSubmitting(false);
                return;
            }
        }

        if (content) {
            createPostMutation({ content, image });
        } else {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative py-12 md:min-h-dvh p-4 flex justify-center">
            <UserHeader />

            <div className="w-120 max-w-full flex flex-col gap-4">
                <PostForm onSubmit={handleCreatePost} isSubmitting={isSubmitting} />

                <AnimatePresence>
                    <PostList
                        posts={posts as Post[]}
                        currentUserId={user?.id}
                        onDeletePost={handleDeletePost}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
}
