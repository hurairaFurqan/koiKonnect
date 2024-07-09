import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();

        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({ error: "Token not received from client" }, { status: 404 });
        }

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        console.log("user found in DB against given token", user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;


        const updatedUser = await user.save();
        return NextResponse.json({ success: true, message: "user verified successfully", updatedUser });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}