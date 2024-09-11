import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/src/dbConfig/dbConfig";
import mongoose from "mongoose";
import User from "@/src/models/user.model";


connect();


export async function POST(req: NextRequest) {
    const { newPath, userId } = await req.json();

    try {



        const dbUserTemp = await User.findById(userId).select("coverPhoto")

        const dbUser = await User.findOneAndUpdate({ _id: userId },
            {
                coverPhoto: newPath
            },
            { new: true }
        )

        console.log(dbUser.coverPhoto, "in route");

        const coverPhotoUrls = {
            previousCoverPhotoUrl: dbUserTemp.coverPhoto,
            currentCoverPhotoUrl: dbUser.coverPhoto,
        }

        return NextResponse.json({ success: true, message: "Cover Photo updated successfully", coverPhotoUrls }, { status: 200 })
    } catch (error: any) {

        console.log(error);

        return NextResponse.json({ message: "error occurred in API route" })
    }

}