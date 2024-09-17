import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import Followers from "@/src/models/follower.model";
import Following from "@/src/models/following.model";


connect();

export async function POST(request: NextRequest) {
    try {
        const { targetUserId, userId } = await request.json();


        if (!targetUserId || !userId) {
            return NextResponse.json({ success: false, message: "User ID(s) missing" }, { status: 400 });
        }


        const currentUser = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return NextResponse.json({ success: false, message: "User(s) not found" }, { status: 404 });
        }

        // const followingEntry = await Following.findOne({userId: userId});
        // if (!followingEntry) {
        //     return NextResponse.json({success: false, isFollowing: false}, {status: 200});
        // }

        const followingEntry = await Following.findOne({
            userId, 
            following: {$in : [targetUserId]}
        })


        const isFollowing = !!followingEntry;

        return NextResponse.json({success: true, isFollowing}, {status: 200})


    } catch (error: any) {
        return NextResponse.json(error);

    }
}
