import { connect } from "@/src/dbConfig/dbConfig";
import { getDataFromToken } from "@/src/helpers/dataFromToken";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";


connect();


export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const userData = await User.findOne({ _id: userId }).select("-password");
        if (!userData) {
            return NextResponse.json({ message: "no user found against this id" }, { status: 400 });
        }

        return NextResponse.json({ success: true, userData: userData, message: "user found", }, { status: 200 });



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}