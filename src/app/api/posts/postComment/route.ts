import { connect } from "@/src/dbConfig/dbConfig";
import Post from "@/src/models/posts.model";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


connect();
export async function POST(req: NextRequest) {
    try {
        const { commentContent, postId, userId } = await req.json();



        if (commentContent && postId && userId) {
            const post = await Post.updateOne({ _id: postId }, {
                $push: {
                    comments: {
                        user: userId,
                        commentContent: commentContent
                    }
                },
            })

            revalidatePath(`/profile/settings/${postId}`)
            return NextResponse.json({ success: true, message: "Comment Uploaded Successfully", post }, { status: 200 })
        }
        return NextResponse.json({ success: false, message: "Unable to upload comment" }, { status: 404 })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }
}