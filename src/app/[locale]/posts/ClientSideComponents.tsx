"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/react-trpc";
import { UserButton, useUser } from "@clerk/nextjs";
import { api as serverSideAPI } from "@/lib/server";

type Post = Awaited<ReturnType<typeof serverSideAPI.posts.getAll>>[number];

export interface PostsClientProps {
    initialPosts: Post[];
}

export default function PostsClient({ initialPosts }: PostsClientProps) {
    const { user } = useUser();
    const { data: posts = initialPosts, refetch } = api.posts.getAll.useQuery();
    const getPresignedUrlMutation = api.posts.getPresignedUrl.useMutation().mutateAsync;
    const createPostMutation = api.posts.post.useMutation({
        onSuccess: refetch,
    }).mutate;
    const deletePostMutation = api.posts.delete.useMutation({
        onSuccess: refetch,
    }).mutate;

    const deletePost = ({ postId }) => {
        deletePostMutation({ postId });
    };

    const sendPost = async (form: FormData) => {
        const file = form.get("file") as File;
        let image: string | undefined = undefined;
        if (file.name) {
            const { url, key } = await getPresignedUrlMutation({ filename: file.name });
            await fetch(url, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                    "Access-Control-Allow-Origin": "*",
                },
            });
            image = key;
        }
        const content = String(form.get("content") || "");
        if (content) createPostMutation({ content, image });
    };

    return (
        <div className="relative py-12 md:min-h-dvh center p-4">
            <div className="absolute top-0 end-0 m-2">
                <UserButton />
            </div>
            <div className="w-120 max-w-full flex flex-col gap-4">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target as HTMLFormElement);
                        sendPost(formData);
                    }}
                    className="rounded-lg border p-4 space-y-4 w-full"
                >
                    <label htmlFor="content" className="text-xl font-medium">
                        new post
                    </label>
                    <Input type="text" id="content" name="content" className="mt-2" />
                    <Input type="file" id="file" name="file" className="mt-2" />
                    <Button type="submit" className="float-end" size="sm">
                        Send
                    </Button>
                </form>
                {posts
                    ? (posts as Post[]).map((post: Post) => (
                          <div key={post.id} className="border rounded p-4 w-full space-y-4">
                              <h2 className="text-xl font-medium break-all">
                                  <img
                                      src={post.author.imageUrl}
                                      alt={post.author.fullName}
                                      className="inline size-7 rounded-full me-2"
                                  />
                                  {post.author.fullName}
                              </h2>
                              <p>{post.content}</p>
                              {post.image && (
                                  <img
                                      src={post.image}
                                      alt={post.content}
                                      className="w-full aspect-square object-fit rounded-sm"
                                  />
                              )}
                              {post.authorId === user?.id && (
                                  <Button
                                      variant="destructive"
                                      size="sm"
                                      className="float-end mb-0"
                                      onClick={() => deletePost({ postId: post.id })}
                                  >
                                      delete{" "}
                                  </Button>
                              )}
                              <p className="text-muted-foreground text-sm">
                                  {new Date(post.createdAt).toLocaleString("en-CA", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                  })}
                              </p>
                          </div>
                      ))
                    : "loading..."}
            </div>
        </div>
    );
}
