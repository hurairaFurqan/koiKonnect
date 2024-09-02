import { connect } from "@/src/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/src/models/posts.model";
// var Post = mongoose.model("Posts") ;
import User from "@/src/models/user.model";
// var User = mongoose.model("Users");


connect();

export async function POST(req: NextRequest) {

    try {
        const { newPath, userId, commentPermission, privacyPermission, caption, location } = await req.json();


        const post = new Post({
            postCaption: caption,
            location: location,
            imageURL: newPath,
            commentPermission: commentPermission,
            privacyPermission: privacyPermission,
            userId: userId, 
        })


        const savedPost = await post.save();
        const user = await User.findById(userId);

        user.posts.push(post);

        await user.save();

        return NextResponse.json({ message: "Post uploaded successfully", success: true, savedPost }, { status: 200 });



    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });

    }


} 