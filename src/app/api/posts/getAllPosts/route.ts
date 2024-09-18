import { connect } from "@/src/dbConfig/dbConfig";
import Post from "@/src/models/posts.model";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const posts = await Post.find()
            .populate({
                path: 'userId',
                select: 'userName lName fName localProfileImageUrl userType _id '
            })
            .select('imageURL _id postCaption');

        return NextResponse.json({ message: "Posts retrieved successfully", success: true, posts }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
