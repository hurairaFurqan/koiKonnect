import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import Followers from "@/src/models/follower.model";
import Following from "@/src/models/following.model";


connect();

export async function POST(request: NextRequest) {
    try {
        const { targetUserId, userId, action } = await request.json();
        if (!targetUserId || !userId) {
            return NextResponse.json({ success: false, message: "User ID(s) missing" }, { status: 400 });
        }


        const currentUser = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return NextResponse.json({ success: false, message: "User(s) not found" }, { status: 404 });
        }

        if (action === "follow") {
            
            await Followers.findOneAndUpdate(
              { userId: targetUserId },
              { $addToSet: { followers: userId } }, 
              { upsert: true } 
            );
            
            
            await Following.findOneAndUpdate(
              { userId },
              { $addToSet: { following: targetUserId } }, 
              { upsert: true }
            );
            
            return NextResponse.json({ success: true, message: "Followed successfully" }, {status: 200});
            
          } else if (action === "unfollow") {
            
            await Followers.findOneAndUpdate(
              { userId: targetUserId },
              { $pull: { followers: userId } } 
            );
      
            
            await Following.findOneAndUpdate(
              { userId },
              { $pull: { following: targetUserId } } 
            );
      
            return NextResponse.json({ success: true, message: "Unfollowed successfully" }, {status: 200});
          }

    } catch (error: any) {
        return NextResponse.json(error);

    }
}
