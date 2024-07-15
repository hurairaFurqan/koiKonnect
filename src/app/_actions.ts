"use server"

import axios from "axios"
import { signupSchema } from "../helpers/zodSchema"
import { BASIC_AUTH_URL } from "./constants/constants"
import { revalidatePath } from "next/cache"


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
        
        console.log( result.error.issues[0].message);


        return { message : result.error.issues[0].message, success: false};
    }
    const data = result.data;


    try {
        const res = await axios.post(`${BASIC_AUTH_URL}/signup`, data)
        revalidatePath("/")

        const resData = {
            message: res.data.message,
            success: res.data.success
        }
        return resData;

    } catch (error: any) {
        console.log("in catch block in action.ts", error.response.data.error);
        return { message: error.response.data.error, success: false }

    }

    // if (result.error) {
    //     return { error: result.error.format() };
    // }
}