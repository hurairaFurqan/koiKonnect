"use server"

import axios from "axios";
import { getDataFromToken } from "./_actions"
import { BASIC_AUTH_URL_POSTS, BASIC_AUTH_URL_USERS, currentUser, postSlug } from "../constants/constants";
import { commentSchema } from "@/src/helpers/zodSchema";
import { revalidatePath } from "next/cache";


export async function postLike(postId: string, likeStatus: Boolean) {
    try {
        const userId = await getDataFromToken();


        if (userId && postId) {
            const res = await axios.post(`${BASIC_AUTH_URL_POSTS}${postSlug.postLikeStatus}`, { userId, postId, likeStatus });
            console.log(res.data);

            return res.data.likeStatus;
        }


    } catch (error: any) {
        console.log("in actions catch block", error);
    }
}


export async function followUser(targetUserId: string, action: "follow" | "unfollow" | "removeFollower" | "removeFollowing") {
    const userId = await getDataFromToken();
    try {
        console.log(targetUserId, userId, action, "in follow user actions");
        
        const response = await axios.post(`${BASIC_AUTH_URL_USERS}${currentUser.followUser}`,
            { targetUserId, action, userId })
            
        return response.data;
    } catch (error: any) {
        console.error("Error in follow/unfollow action:", error);
    }
}


export async function commentUpload(commentContent: string, postId: string) {

    const userId = await getDataFromToken();
    try {
        // const res = await axios.post(`${BASIC_AUTH_URL_POSTS}${postSlug.postComment}`, { commentContent, userId, postId })

        const res = await fetch(`${BASIC_AUTH_URL_POSTS}${postSlug.postComment}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // If needed, add authorization headers or any other headers here
            },
            body: JSON.stringify({
                commentContent,
                userId,
                postId,
            }),
        });
        const data = await res.json();

        revalidatePath(`/profile/settings/${postId}`)
        console.log(data);

        return data
    } catch (error: any) {
        console.log(error);
        ;
    }



}

