import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;


    const isPublicPath = path === '/login' || path === "/signup" || path === '/verifyemail'

    const token = req.cookies.get("token")?.value || ""; 
    
    if (isPublicPath && token) {
        console.log("you are hitting public route while having token in cookies");
        
        return NextResponse.redirect(new URL("/profile", req.nextUrl));
    }
    if (!isPublicPath && !token) {
        console.log("you are hitting private route while not having token in cookies");

        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
}


export const config = {
    matcher: ['/','/login','/signup', '/verifyemail', '/profile'],
}