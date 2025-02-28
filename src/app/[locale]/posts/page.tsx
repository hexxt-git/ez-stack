import PostsClient from "./ClientSideComponents";
import { api } from "@/lib/server";

export default async function PostsPage() {
    // Server-side data fetching
    const initialPosts = await api.posts.getAll();

    // Pass the data to the client component
    return <PostsClient initialPosts={initialPosts} />;
}
