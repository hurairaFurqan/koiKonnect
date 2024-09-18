import User from "@/src/models/user.model";

import { connect } from "@/src/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import Post from "@/src/models/posts.model";
import { ObjectId } from "mongodb";
import Followers from "@/src/models/follower.model";
import mongoose from "mongoose";

connect()

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        

        }
        const followerEntry = await Followers.findOne({ userId })
        .populate('followers');
        if (!followerEntry) {
            return NextResponse.json({ success: false, message: "No followers found" , followerCount: 0}, { status: 200 });
        }

        const followers = followerEntry.followers;
        const followerCount = followers.length;
        
        return NextResponse.json({ success: true, message: "User followers retrieved successfully", followers, followerCount }, { status: 200 })
    } catch (error: any) {
        console.log(error.message);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}