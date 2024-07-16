import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, emailType } = reqBody;
        console.log("in verify email route", reqBody);

        if (!token) {
            return NextResponse.json({ error: "Token not received from client" }, { status: 404 });
        }
        if (emailType === "VERIFY") {


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

        } else {
            console.log("i am in reset password user condition", reqBody.password);
            const { password } = reqBody;
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });
            if (!user) {
                return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
            }

            console.log("user found in DB against given token", user);
            user.forgotPasswordToken = undefined;
            user.forgotPasswordTokenExpiry = undefined;
            user.password = hashPassword;
            const updatedUser = await user.save();
            console.log(updatedUser);
            
            return NextResponse.json({ success: true, message: "user password changed successfully", updatedUser });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}