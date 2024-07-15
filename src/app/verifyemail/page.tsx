"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react"
import verifyEmail from "@/public/verifyEmail.svg";
import styles from "./styles.module.css"
import axios from "axios";
import { BASIC_AUTH_URL } from "../constants/constants";

import { useRouter } from "next/router";
import Link from "next/link";

const VerifyEmail = () => {
    const router = useRouter;
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // regular way of fetching token from URL

        const urlToken = decodeURIComponent(window.location.search.split("=")[1]);
        console.log("url token", urlToken);

        setToken(urlToken || "")

        // next js way of fetching token

        // const { query }: any = router;
        // const urlToken = query.token;
        // setToken(decodeURIComponent(urlToken));

    }, [router])

    const verifyUserEmail = async () => {

        console.log("in button");
        

        try {
            console.log("token from url", token);


            // {token} vs token
            // check difference in both 
            const res = await axios.post(`${BASIC_AUTH_URL}/verifyemail`, {token});
            const data = res.data;
            console.log(token);

            if (data.success === true) {
                setVerified(true);
                // just for the sake for implementation
            }
        } catch (error: any) {
            console.log(error.response.data);

        }
    }



    return <>
        <div className="flex flex-col items-center h-screen">
            <div className=" mt-24 flex flex-col items-center">
                <p className=" w-fit text-5xl font-semibold">Verify your email</p>
                <p className=" mt-2 text-zinc-600 text-base">You will need to verify your email to complete registration</p>
            </div>
            <div className="mt-10">
                <Image className="" src={verifyEmail} alt="verify email svg" width={450} />
            </div>
            <div className={`mt-4 space-y-3 flex flex-col items-center ${styles.emailButton}`}>
                <p className="text-zinc-600 text-base">In order to verify your email click on the button “verify email” </p>
                {
                    verified && (
                        <div>
                            <p>You are verified successfully</p>
                            <Link href={"/login"}>Click here to login</Link>
                        </div>
                    )
                }

                {
                    token ? <p>{token}</p> : <p>no token</p>
                }
                <button onClick={verifyUserEmail} className={`bgOrangeColor p-3 rounded-full text-white w-52`}>Verify Email</button>
            </div>
        </div>
    </>
}

export default VerifyEmail;