import { connect } from "@/src/dbConfig/dbConfig";
import Post from "@/src/models/posts.model";
import { NextRequest, NextResponse } from "next/server";



connect();
export async function POST(req: NextRequest) {
    try {
        const { postId } = await req.json();

        const post = await Post.findById(postId);

        return NextResponse.json({ message: "Post retrieved successfully", success: true, post }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}