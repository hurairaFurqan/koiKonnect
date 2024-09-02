"use server"

import axios from "axios"
import { getDataFromToken } from "./_actions"
import { postSlug, BASIC_AUTH_URL_POSTS, BASIC_AUTH_URL_USERS, currentUser } from "@/src/app/constants/constants"
import { revalidatePath } from "next/cache";


export async function userRetrieval() {

    try {
        const userId = await getDataFromToken()
        const res = await axios.post(`${BASIC_AUTH_URL_USERS}${currentUser.getCurrentUser}`, { userId });
        return res.data.user;
    } catch (error: any) {
        console.log(error.response);

    }

}


export async function postRetrieval(postId: string) {
    try {
        const res = await axios.post(`${BASIC_AUTH_URL_POSTS}${postSlug.getPost}`, { postId });
        // console.log(res.data.post);
        return res.data.post
    } catch (error: any) {
        console.log(error.response);

    }
}