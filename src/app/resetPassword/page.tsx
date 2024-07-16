"use client"
import Image from "next/image"
import React, { FormEvent, useState } from "react"
import keyIcon from "@/public/keyIcon.svg"
import styles from "./styles.module.css"
import axios from "axios"
import { BASIC_AUTH_URL } from "../constants/constants"

const ResetPassword = () => {

    const [email, setEmail] = useState("");


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //

        try {
            const res = await axios.post(`${BASIC_AUTH_URL}/resetPassword`, { email });
            console.log(res.data);
        } catch (error: any) {
            console.log(error.response.data);
        }

    }

    return <>
        <div className=" flex flex-col items-center h-screen">
            <div className=" mt-20 flex justify-center">

                <Image className="w-1/2" src={keyIcon} alt="key icon svg" />

            </div>
            <div className=" mt-5 flex flex-col items-center">
                <p className=" w-fit text-3xl font-semibold">Forgot Password?</p>
                <p className=" mt-2 text-zinc-600 text-base">No worries, we’ll send you reset instruction.</p>
            </div>

            <form className="mt-7" onSubmit={handleSubmit}>
                <div className={styles.inputGroupRow}>
                    <input name="email" type="text" required value={email || ""} onChange={(e) => setEmail(e.target.value)}></input>
                    <label htmlFor="">*Email</label>
                </div>


                <button type="submit" className={`${styles.JoinUsButton} font-semibold`} >Reset Password</button>

            </form>


        </div></>
}

export default ResetPassword