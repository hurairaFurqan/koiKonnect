"use server"

import axios from "axios"
import { getDataFromToken } from "./_actions"
import { postSlug, BASIC_AUTH_URL_POSTS, BASIC_AUTH_URL_USERS, currentUser, searchSlugs } from "@/src/app/constants/constants"
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

// user retrieval based on user id from frontend route

export async function userRetrievalBasedOnId(userId: string) {
    try {
        const res = await axios.post(`${BASIC_AUTH_URL_USERS}${currentUser.getCurrentUser}`, { userId });
        return res.data.user;
    } catch (error: any) {
        console.log(error.response);

    }
}
export async function postRetrieval(postId: string) {
    try {

        const userId = await getDataFromToken();
        const res = await axios.post(`${BASIC_AUTH_URL_POSTS}${postSlug.getPost}`, { postId, userId });

        return res.data;
    } catch (error: any) {
        console.log(error.response);

    }
}



export async function searchUsers(query: string) {
    try {

        const userId = await getDataFromToken();
        const res = await axios.post(`${BASIC_AUTH_URL_USERS}${searchSlugs.searchUser}`, { query, userId });
        
        return res?.data?.users;

    } catch (error: any) {
        console.error("Error fetching results", error);


    }
}