
import { connect } from "@/src/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";

import Following from "@/src/models/following.model";

connect()

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();
        if (!userId) {
            return NextResponse.json({ success: false, message: "User ID is required" }, { status: 400 });
        

        }
        const followingEntry = await Following.findOne({ userId })
        .populate('following');
        if (!followingEntry) {
            return NextResponse.json({ success: false, message: "No following found" , followingCount: 0}, { status: 200 });
        }

        const following = followingEntry.following;
        const followingCount = following.length;
        return NextResponse.json({ success: true, message: "User following retrieved successfully", following, followingCount }, { status: 200 })
    } catch (error: any) {
        console.log(error.message);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}