import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bycrptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
connect();


export async function POST(req: NextRequest) {
    try {

        const reqBody = await req.json();

        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "no user exist against this email" }, { status: 400 });
        }

        const validPassword = await bycrptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Wrong password" }, { status: 400 });
        }

        if (!user.isVerified) {
            return NextResponse.json({ error: "User has been not verified yet. Please check your email" }, { status: 400 });
        }
        const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET!, { expiresIn: '1h' })


        const nextResponse = NextResponse.json({ success: true, sessionToken: token, message: "User Credentials verified successfully" },
            { status: 200 });



        // nextResponse.cookies.set("token", token);
        return nextResponse;



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}