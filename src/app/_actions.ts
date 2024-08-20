"use server"

import axios from "axios"
import { loginSchema, signupSchema, userProfileDetailsSchema } from "../helpers/zodSchema"
import { authUrlSlug, BASIC_AUTH_URL_USERS, BASIC_AUTH_URL_POSTS, addPostSlug } from "./constants/constants"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { writeFile } from "fs/promises"
import fs from 'fs'
import jwt from "jsonwebtoken"
import path from "path"

export const getDataFromToken = async () => {
    try {
        const token = cookies().get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.userId;

    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getCookiesSessionToken = async () => {
    try {
        const token = cookies().get("token")?.value || "";
        return token;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const createBuffer = async (file: File) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        return buffer;
    } catch (error: any) {
        throw new Error(error.message)
    }
}


export async function accessibilityControls(name: string, permission: Boolean) {
    console.log(name, permission);
    // return name;
    try {


    } catch (error: any) {
        return error.response;
    }


}

export async function loginEntry(prevState: any, formData: FormData) {
    const result = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password",)
    })
    // if (!result.success) {

    //     return { message: result.error.issues[0].message, success: false }
    // }
    const data = result.data;

    try {
        const res = await axios.post(`${BASIC_AUTH_URL_USERS}/login`, data);

        revalidatePath("/")
        cookies().set("token", res.data.sessionToken);

        const resData = {

            successMessage: res.data.message,
            errorMessage: ""
        }
        return resData

    } catch (error: any) {
        return { successMessage: "", errorMessage: error.response.data.error };
    }

}

export async function signUpEntry(prevState: any, formData: FormData) {
    const result = signupSchema.safeParse({
        fName: formData.get("fName"),
        lName: formData.get("lName"),
        email: formData.get("email"),
        userName: formData.get("userName"),
        userType: formData.get("userType"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),

    })

    if (!result.success) {

        console.log(result.error.issues[0].message);


        return { successMessage: "", errorMessage: result.error.issues[0].message };
    }
    const data = result.data;


    try {
        const res = await axios.post(`${BASIC_AUTH_URL_USERS}/signup`, data)
        revalidatePath("/")

        const resData = {
            successMessage: res.data.message,
            errorMessage: ""
        }
        return resData;

    } catch (error: any) {
        console.log("in catch block in action.ts", error.response.data.error);
        return { successMessage: "", errorMessage: error.response.data.error }

    }
}

export async function deleteToken() {
    cookies().delete("token");
}

export async function userInfoRetrieval() {

    try {
        const userId = await getDataFromToken();

        const res = await axios.post(`${BASIC_AUTH_URL_USERS}/${authUrlSlug.getMe}`, { userId });

        return res.data.userData
    } catch (error: any) {
        console.log("in actions catch block", error);
    }



}

export async function userUpdatedDetails(prevState: any, formData: FormData) {

    const userId = await getDataFromToken();
    const result = userProfileDetailsSchema.safeParse({
        fName: formData.get("firstName"),
        lName: formData.get("lastName"),
        userType: formData.get("userType"),
        userName: formData.get("userName"),
        userBio: formData.get("userBio"),
    })

    if (!result.success) {
        return { successMessage: "", errorMessage: result.error.issues[0].message };
    }

    const data = result.data;
    const newData = { ...data, userId };
    // TODO: Send backend a request to update user data
    try {

        const res = await axios.post(`${BASIC_AUTH_URL_USERS}/${authUrlSlug.updateUserDetails}`, newData);


        return { successMessage: res.data.message, errorMessage: "" }


    } catch (error: any) {
        return { successMessage: "", errorMessage: error.response.data.error }
    }

}

export async function userProfileImage(prevState: any, formData: FormData) {

    try {

        const file = formData.get("profileImage") as File;


        if (file.name === "undefined") {
            return { successMessage: "", errorMessage: "No File Selected." }
        }
        // const arrayBuffer = await file.arrayBuffer();
        // const buffer = new Uint8Array(arrayBuffer);
        const buffer: Uint8Array = await createBuffer(file);


        const uploadDir = path.join(process.cwd(), 'public')
        const filePath = path.join(`public/uploads/`, file.name);

        await writeFile(filePath, buffer);
        // revalidatePath("/");
        const relativePath = path.relative(uploadDir, filePath);
        const newPath = path.join("/", relativePath);

        const userId = await getDataFromToken();
        console.log(filePath, "in server actions");

        const res = await axios.post(`${BASIC_AUTH_URL_USERS}/${authUrlSlug.uploadProfileImage}`, { filePath: newPath, userId });
        const previousProfileImageUrl = res.data.profileImageUrls.previousProfileImageUrl;


        if (previousProfileImageUrl) {
            const response = deleteProfileImageFromLocalServer(previousProfileImageUrl)
            console.log(response);

        }

        return { successMessage: res.data.profileImageUrls.currentProfileImageUrl, errorMessage: "" }
    } catch (error: any) {

        console.log("in actions catch block");

        return { successMessage: "", errorMessage: error.response }
    }
}


// export async function userProfileImageRetrieval() {
//     try {
//         const token = cookies().get("token")?.value;
//         const res = await axios.post(`${BASIC_AUTH_URL}/${authUrlSlug.getProfileImage}`, { token });
//         // console.log(res.data.profileUrl, "in actions");

//         return res.data.profileUrl;

//     } catch (error: any) {

//         console.log("in actions catch block");

//         return { successMessage: "", errorMessage: error.response }
//     }
// }

function deleteProfileImageFromLocalServer(profileUrl: string) {
    const filePath = path.join(process.cwd(), `/public${profileUrl}`);
    if (!filePath) {
        return "File not found"
    }
    try {
        // delete file from local folder
        fs.unlink(filePath, (err) => {
            if (err) {
                return err;
            }
            return "removed successfully from uploads"
        })
    } catch (error: any) {
        return error.response;
    }
}

export async function deleteProfileImage(profileUrl: string) {
    try {

        const result = deleteProfileImageFromLocalServer(profileUrl);
        // remove URL from DB
        const userId = await getDataFromToken();
        const res = await axios.post(`${BASIC_AUTH_URL_USERS}/${authUrlSlug.deleteProfileImage}`, { userId })
        console.log("response against API CALL", res.data);
    } catch (error: any) {
        console.log("in actions catch block");

        return error.response

    }


}

export async function addPostImage(formData: FormData) {
    try {
        const file = formData.get("addPostImage") as File;



        const buffer: Uint8Array = await createBuffer(file);

        // const arrayBuffer = await file.arrayBuffer();
        // const buffer = new Uint8Array(arrayBuffer);
        const uploadDir = path.join(process.cwd(), "public");
        const filePath = path.join("public/posts/", file.name);

        await writeFile(filePath, buffer);

        const relativePath = path.relative(uploadDir, filePath);
        const newPath = path.join("/", relativePath);

        const userId = await getDataFromToken();
        const res = await axios.post(`${BASIC_AUTH_URL_POSTS}${addPostSlug.saveImage}`, { newPath, userId });



        console.log(res.data.savedPost._id, "in server actions");
        cookies().set("postId", res.data.savedPost._id);


        console.log(res.data.message);


        return res.data.message;

    } catch (error: any) {
        return error.response
    }
}



export async function addPostForm(formData: FormData) {

    try {

        const file = formData.get("file") as File
        return { successMessage: file.name, errorMessage: "" };

    } catch (error: any) {

        return { successMessage: "", errorMessage: "" };
    }
}

export async function addPost(state: object){
    console.log(state);

    
}