import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { fName, lName, userType, userName, userBio, userId } = await req.json();

    try {

        const updatedUser = await User.findByIdAndUpdate(userId, {
            fName, lName, userType, userName, userBio,
        }, { new: true })
        return NextResponse.json({ success: true, message: "User details updated successfully", updatedUser })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}