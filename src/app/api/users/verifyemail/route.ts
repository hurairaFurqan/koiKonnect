import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, emailType } = reqBody;

        if (!token) {
            return NextResponse.json({ error: "Token not received from client" }, { status: 404 });
        }
        if (emailType === "VERIFY") {


            const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
            if (!user) {
                return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
            }


            user.isVerified = true;
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;
            const updatedUser = await user.save();
            return NextResponse.json({ success: true, message: "User verified successfully", updatedUser });


        } else {

            const { password } = reqBody;
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } });
            if (!user) {
                return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
            }


            user.forgotPasswordToken = undefined;
            user.forgotPasswordTokenExpiry = undefined;
            user.password = hashPassword;
            const updatedUser = await user.save();


            return NextResponse.json({ success: true, message: "User password updated Successfully", updatedUser });

        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}