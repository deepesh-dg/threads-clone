import Service from "@/appwrite/config.server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json(null);

    const service = new Service();
    const threadPost = await service.getThreadPost(id);

    return NextResponse.json(threadPost);
}
