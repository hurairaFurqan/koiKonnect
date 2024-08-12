import { getDataFromToken } from "@/src/helpers/dataFromToken";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"
import { connect } from "@/src/dbConfig/dbConfig";



connect();
export async function POST(req: NextRequest) {

    const { token } = await req.json()

    
    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        const userId = data.userId;
        const dbUser = await User.findById(userId).select("localProfileImageUrl");
        return NextResponse.json({ success: true, message: "user profile image found path successfully", profileUrl: dbUser.localProfileImageUrl }, { status: 200 })

    } catch (error: any) {
        console.log(error);

        return NextResponse.json({ message: "error occurred in API route" })

    }
}