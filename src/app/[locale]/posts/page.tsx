"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/react-trpc";
import { UserButton, useUser } from "@clerk/nextjs";

export default function PostsPage() {
    const { user } = useUser();
    const { data: posts, refetch } = api.posts.getAll.useQuery();

    const createPostMutation = api.posts.post.useMutation({
        onSuccess: refetch,
    }).mutate;

    const deletePostMutation = api.posts.delete.useMutation({
        onSuccess: refetch,
    }).mutate;

    const deletePost = ({ postId }) => {
        deletePostMutation({ postId });
    };

    const sendPost = (form: FormData) => {
        const content = String(form.get("content") || "");
        if (content) createPostMutation({ content });
    };

    return (
        <div className="relative min-h-dvh center p-4">
            <div className="absolute top-0 end-0 m-2">
                <UserButton />
            </div>
            <div className="w-82 max-w-full flex flex-col gap-4">
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
                    <Button type="submit" className="float-end" size="sm">
                        Send
                    </Button>
                </form>
                {posts
                    ? posts.map((post) => (
                          <div key={post.id} className="border rounded p-4 w-full space-y-4">
                              <h2 className="text-xl font-medium break-all">
                                  <img
                                      src={post.author.imageUrl}
                                      alt={post.author.firstName}
                                      className="inline size-7 rounded-full me-2"
                                  />
                                  {post.author.lastName} {post.author.firstName}{" "}
                              </h2>
                              <p>{post.content}</p>
                              {post.authorId === user?.id && (
                                  <Button
                                      variant="destructive"
                                      size="sm"
                                      className="float-end"
                                      onClick={() => deletePost({ postId: post.id })}
                                  >
                                      delete{" "}
                                  </Button>
                              )}
                          </div>
                      ))
                    : "loading..."}
            </div>
        </div>
    );
}
