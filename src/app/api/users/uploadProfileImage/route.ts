import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import uploadImageCloudinary from "@/src/helpers/cloudinaryImages";
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
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json({ message: "no file found" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const path = join(`/tmp/${file.name}`);

    await writeFile(path, buffer);



    // get user ID from cookies by decoding session Token and update user profile url

    try {
        const secure_url = await uploadImageCloudinary(path);


        if (!secure_url) {
            return NextResponse.json({ message: "problems in uploading image to cloudinary. Try Again" })
        }
        const token = cookies().get("token")?.value as string;
        const data = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayLoad




        const dbUser = await User.findOneAndUpdate({ _id: data.userId },
            {
                cloudinaryProfileImageUrl: secure_url
            },
            { new: true }
        ).select("cloudinaryProfileImageUrl")


        return NextResponse.json({ success: true, message: "image updated successfully", profileUrl: dbUser.cloudinaryProfileImageUrl }, { status: 200 })


    } catch (error: any) {

        console.log(error);

        return NextResponse.json({ message: "unable to verify session token" })
    }

}



