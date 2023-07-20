"use client";
import { Avatar } from "@/components";
import { useAppSelector } from "@/state/store";
import React from "react";

function Post() {
    const userData = useAppSelector((state) => state.auth.userData);

    return (
        userData && (
            <div className="w-full max-w-md mx-auto flex">
                <div className="w-11 shrink-0">
                    <Avatar text={userData.name[0]} />
                </div>
                <div className="w-full px-2">
                    <h6 className="mt-1 mb-0.5">@{userData.$id}</h6>
                    <textarea
                        className="border border-primary/10 rounded-md p-2 outline-none bg-transparent w-full text-sm resize-none h-52"
                        placeholder="Start a thread..."
                        autoFocus
                    ></textarea>
                </div>
            </div>
        )
    );
}

export default Post;
