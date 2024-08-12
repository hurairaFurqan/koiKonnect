import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connect();


export async function POST(req: NextRequest) {
    const { userId } = await req.json();
    try {
        const user = await User.findById(userId)
        user.localProfileImageUrl = undefined;
        await user.save();

        return NextResponse.json({ success: true, message: "User Profile Image path removed from DB successfully" }, { status: 200 })


    } catch (error: any) {
        return NextResponse.json(error);
    }
}