import { connect } from "@/src/dbConfig/dbConfig"
import Post from "@/src/models/posts.model";
import { NextRequest, NextResponse } from "next/server"


connect();
export async function POST(req: NextRequest) {
    try {
        const  {postId, userId} = await req.json();

        console.log(userId, postId, "in like post route");
        
        const post  = await Post.findOneAndUpdate({_id: postId}, {
            $inc:{
                "likesCount": 1,
            },
            $push:{
                "likes": userId,
            }
        });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}