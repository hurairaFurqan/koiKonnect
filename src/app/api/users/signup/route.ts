import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from "bcryptjs"

import { sendEmail } from "@/src/helpers/mailer";

connect();


export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { userName, fName, lName, email, password } = reqBody;
        console.log("log generated for reqBody", reqBody);
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "user already exist" }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            fName,
            lName,
            email,
            password: hashPassword,
        })

        const savedUser = await newUser.save();
        console.log("log generated for saved user into DB", savedUser);
        // send Verification email

        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json({
            message: "User registered Successfully",
            success: true,
            savedUser
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}