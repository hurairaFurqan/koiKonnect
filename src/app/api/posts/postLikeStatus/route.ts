import { connect } from "@/src/dbConfig/dbConfig"
import Post from "@/src/models/posts.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server"


connect();
export async function POST(req: NextRequest) {
    try {
        const { postId, userId, likeStatus } = await req.json();

        console.log(userId, postId, "in like post route");


        if (likeStatus) {
            const post = await Post.updateOne({ _id: postId, "likes": { $ne: userId } }, {
                $inc: {
                    "likesCount": 1,
                },
                $push: {
                    "likes": userId,
                }
            });
            return NextResponse.json({ success: true, message: "post like stored successfully", post, likeStatus }, { status: 200 })
        }


        const post = await Post.updateOne({ _id: postId, "likes": { $eq: userId } }, {
            $inc: {
                "likesCount": -1,
            },
            $pull: {
                "likes": userId,
            }
        });
        return NextResponse.json({ success: true, message: "post disliked stored successfully", post, likeStatus }, { status: 200 })

        // var likeStatus = "disliked";
        // if (post.modifiedCount === 1) {
        //     likeStatus = "liked"
        // }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }
}