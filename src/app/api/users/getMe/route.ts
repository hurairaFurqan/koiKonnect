import { connect } from "@/src/dbConfig/dbConfig";
import { getDataFromToken } from "@/src/helpers/dataFromToken";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connect();


export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();
        const userData = await User.findOne({ _id: userId }).select("_id");
        if (!userData) {
            return NextResponse.json({ message: "no user found against this id" }, { status: 400 });
        }
        const filteredData = await User.findById(userId, {
            "isVerified": 0,
            "__v": 0,
            "password": 0,
            "email": 0,

        });

        return NextResponse.json({ success: true, userData: filteredData, message: "user found", }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}