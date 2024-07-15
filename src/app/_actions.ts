"use server"

import { signupSchema } from "../helpers/zodSchema"

export async function addEntry(state: any, formData: FormData) {
    const result = signupSchema.safeParse({
        fName: formData.get("fName"),
        lName: formData.get("lName"),
        email: formData.get("email"),
        userType: formData.get("userType"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),

    })
    if (result.success) {
        return { data: result.data }
    }

    if (result.error) {
        return { error: result.error.format() };
    }
}