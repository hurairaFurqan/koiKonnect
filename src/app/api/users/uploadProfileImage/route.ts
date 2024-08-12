import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/src/dbConfig/dbConfig";
import { join } from "path"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
import User from "@/src/models/user.model";

connect();
interface JwtPayLoad {
    userId: string
}

export async function POST(req: NextRequest) {
    const { filePath,token } = await req.json();

    console.log(filePath, "filePath in ");
    

    
    try {
      
        const data =  jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayLoad
        
        const dbUser = await User.findOneAndUpdate({ _id: data.userId },
            {
                localProfileImageUrl: filePath
            },
            { new: true }
        ).select("localProfileImageUrl")


        return NextResponse.json({ success: true, message: "image updated successfully", profileUrl: dbUser.localProfileImageUrl }, { status: 200 })


    } catch (error: any) {

        console.log(error);

        return NextResponse.json({ message: "error occurred in API route" })
    }

}