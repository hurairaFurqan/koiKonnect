import User from "@/src/models/user.model";

import { connect } from "@/src/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import Post from "@/src/models/posts.model";
import { ObjectId } from "mongodb";

connect()

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();
        
        // const user = await User.findById(userId).select("-password").populate("posts");
        
        const posts = await User.aggregate([
            {
                $match: { "_id": ObjectId.createFromHexString(userId) }
            },

            {
                $lookup: { from: "posts", localField: "_id", foreignField: "userId", as: "userPosts" }
            }
        ]);

        return NextResponse.json({ success: true, message: "User retrieved successfully", user: posts[0] }, { status: 200 })
    } catch (error: any) {
        console.log(error.message);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}