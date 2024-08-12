import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';


export const getDataFromToken = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";

        console.log(token , "token");
        
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.userId;

    } catch (error: any) {
        throw new Error(error.message);
    }
}