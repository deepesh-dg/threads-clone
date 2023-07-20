import { ThreadPostCard } from "@/components";

export default function Home() {
    return (
        <ThreadPostCard
            post={{
                $id: "id",
                message: "message",
                comments: [],
                authorId: "string",
                likes: [],
                views: [],
                $collectionId: "collectionId",
                $databaseId: "DatabaseId",
                $createdAt: "createdAt",
                $updatedAt: "updatedAt",
                $permissions: [],
            }}
        />
    );
}
