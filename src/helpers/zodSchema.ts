import { z } from "zod";

export const signupSchema = z.object({
    fName: z.string().min(1, { message: "First Name is required" }),
    lName: z.string().min(1, { message: "Last Name is required" }),
    email: z.string().email({ message: "Invalid Email Address" }),
    userName : z.string().min(1, {message: "User Name is required"}),
    userType: z.string(),
    password: z.string(),
    confirmPassword: z.string(),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirm"], // path of error
})


export const loginSchema = z.object({
    email : z.string().email({message: "Invalid Email Address"}),
    password: z.string()
})