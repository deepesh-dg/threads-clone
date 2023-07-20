"use client";
import service from "@/appwrite/config";
import React, { useEffect, useState } from "react";

type Props = {
    post: ThreadPost.ThreadDocument;
};

function ThreadPostCard({ post }: Props) {
    const [author, setAuthor] = useState<Account.User | null>(null);

    useEffect(() => {
        service.getUserInfo(post.authorId).then(setAuthor);
    }, [post.authorId]);

    return <div>ThreadPostCard</div>;
}

export default ThreadPostCard;
