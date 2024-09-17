import { connect } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";



connect();
export async function POST(req: NextRequest) {
    try {
        const { query, userId } = await req.json();

        if (!query) {
            return NextResponse.json({ success: false, message: "Inpput not detected" }, { status: 400 })
        }

        const users = await User.find({
            $and: [
                {
                    $or: [
                        { userName: { $regex: query, $options: "i" } },
                        { fName: { $regex: query, $options: "i" } },
                        { lName: { $regex: query, $options: "i" } }
                    ]
                },
                {
                    _id: { $ne: userId }
                }
            ]
        }, {
            password: 0,
            __v: 0,
            createdAt: 0,
            updatedAt: 0,
            posts: 0,
        })



        if (users.length > 0) {
            return NextResponse.json({ success: true, message: "data fetched successfully", users }, { status: 200 });

        }
        return NextResponse.json({ success: false, message: "No user found" }, { status: 200 });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}