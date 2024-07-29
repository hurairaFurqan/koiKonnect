"use server"

import axios from "axios"
import { loginSchema, signupSchema } from "../helpers/zodSchema"
import { BASIC_AUTH_URL } from "./constants/constants"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

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

