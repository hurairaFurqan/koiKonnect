import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/src/dbConfig/dbConfig";
import { join } from "path"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import User from "@/src/models/user.model";

connect();

export async function POST(req: NextRequest) {
    const { filePath, userId } = await req.json();

    try {


        
        const dbUserTemp = await User.findById(userId).select("localProfileImageUrl")
        const dbUser = await User.findOneAndUpdate({ _id: userId },
            {
                localProfileImageUrl: filePath
            },
            { new: true }
        ).select("localProfileImageUrl")

        const profileImageUrls = {
            previousProfileImageUrl: dbUserTemp.localProfileImageUrl,
            currentProfileImageUrl: dbUser.localProfileImageUrl,
        }
        return NextResponse.json({ success: true, message: "image updated successfully", profileImageUrls }, { status: 200 })
    } catch (error: any) {

        console.log(error);

        return NextResponse.json({ message: "error occurred in API route" })
    }

}