"use server"

import axios from "axios"
import { loginSchema, signupSchema, userProfileDetailsSchema } from "../helpers/zodSchema"
import { authUrlSlug, BASIC_AUTH_URL } from "./constants/constants"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { writeFile } from "fs/promises"
import fs from 'fs'
import jwt from "jsonwebtoken"
import path from "path"

export const getDataFromToken = async () => {
    try {
        const token = cookies().get("token")?.value || "";

        console.log("token:", token);

        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.userId;

    } catch (error: any) {
        throw new Error(error.message);
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
        const res = await axios.post(`${BASIC_AUTH_URL}/login`, data);

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

export async function addEntry(prevState: any, formData: FormData) {
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
        const res = await axios.post(`${BASIC_AUTH_URL}/signup`, data)
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

export async function addUserUpdatedDetails(prevState: any, formData: FormData) {
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
    // TODO: Send backend a request to update user data
    try {

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
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const uploadDir = path.join(process.cwd(), 'public')
        const filePath = path.join(`public/uploads/`, file.name);

        await writeFile(filePath, buffer);
        // revalidatePath("/");
        const relativePath = path.relative(uploadDir, filePath);
        const newPath = path.join("/", relativePath);

        const token = cookies().get("token")?.value;
        console.log(filePath, "in server actions");

        const res = await axios.post(`${BASIC_AUTH_URL}/${authUrlSlug.uploadProfileImage}`, { filePath: newPath, token });

        console.log(res.data);



        return { successMessage: res.data.profileUrl, errorMessage: "" }
    } catch (error: any) {

        console.log("in actions catch block");

        return { successMessage: "", errorMessage: error.response }
    }
}


export async function userProfileImageRetrevial() {
    try {
        const token = cookies().get("token")?.value;
        const res = await axios.post(`${BASIC_AUTH_URL}/${authUrlSlug.getProfileImage}`, { token });
        // console.log(res.data.profileUrl, "in actions");

        return res.data.profileUrl;

    } catch (error: any) {

        console.log("in actions catch block");

        return { successMessage: "", errorMessage: error.response }
    }
}


export async function deleteProfileImage(profileUrl: string) {
    const filePath = path.join(process.cwd(), `/public${profileUrl}`);
    if (!filePath) {
        return "File not found"
    }
    try {

        // delete file from local folder
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("removed successfully from uploads");
        })
        // remove URL from DB
        const userId = await getDataFromToken();
        const res = await axios.post(`${BASIC_AUTH_URL}/${authUrlSlug.deleteProfileImage}`, { userId })
        console.log("response against API CALL", res.data);
    } catch (error: any) {
        console.log("in actions catch block");

        return error.response

    }


}