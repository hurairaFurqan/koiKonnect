import { connect } from "@/src/dbConfig/dbConfig";
import Post from "@/src/models/posts.model";
import User from "@/src/models/user.model";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import { NextRequest, NextResponse } from "next/server";

connect()

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();

        const user = await User.findById(userId).select("-password");

        const posts = await User.aggregate([
            {
                $match: { "_id": ObjectId.createFromHexString(userId) }
            },

            {
                $lookup: { from: "posts", localField: "_id", foreignField: "userId", as: "userPosts" }
            }
        ]);



        // await User.find().populate("posts").then(p => console.log(p)).catch(error => console.log(error))

        return NextResponse.json({ success: true, message: "Cover photo retrieved successfully", user: posts[0] }, { status: 200 })
    } catch (error: any) {
        console.log(error.message);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}