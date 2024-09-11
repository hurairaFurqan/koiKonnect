import { connect } from "@/src/dbConfig/dbConfig";
import { getDataFromToken } from "@/src/helpers/dataFromToken";
import Post from "@/src/models/posts.model";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";



connect();
export async function POST(req: NextRequest) {
    try {
        const { postId, userId } = await req.json();

        const post = await Post.findById(postId).populate({
            path: "comments.user",
            select: "userName localProfileImageUrl"
        });

        const likes = post.likes;


        var liked = false;
        likes.map((like: string) => {
            if (like.toString() === userId) {
                liked = true;
            }
        })

        revalidatePath(`/profile/settings/${postId}`)

        
        return NextResponse.json({ message: "Post retrieved successfully", success: true, post, liked }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}