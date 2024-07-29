import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/src/helpers/mailer";



connect();


export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { email } = reqBody;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "No user found against this email" }, { status: 400 })
        }

        await sendEmail({email, emailType: "ResetPassword", userId : user._id})

        

        return NextResponse.json({ success: true, message: "A link has been sent to given email for password update" }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }


}