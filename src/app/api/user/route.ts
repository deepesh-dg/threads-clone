import Service from "@/appwrite/config.server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("username");
    if (!id) return NextResponse.json(null);
    const service = new Service();
    const user = await service.getUser(id);
    const res: Account.User | null = user
        ? {
              name: user.name,
              username: user.$id,
              email: user.email,
          }
        : null;
    return NextResponse.json(res);
}
