"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react"
import verifyEmail from "@/public/verifyEmail.svg";
import verifyEmailSuccess from "@/public/verifyEmailSuccess.svg"
import styles from "./styles.module.css"
import axios from "axios";
import { BASIC_AUTH_URL } from "@/src/app/constants/constants";

import { useRouter } from "next/navigation";
import Link from "next/link";

const VerifyEmail = () => {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    const [emailType, setEmailType] = useState("");
    const [pass, setPasswords] = useState({
        password: "",
        confirmPassword: ""
    })
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        // regular way of fetching token from URL

        const queryString = window.location.search;
        console.log(queryString);

        const urlParams = new URLSearchParams(queryString);
        const urlToken = urlParams.get(decodeURIComponent("token"));
        const urlEmailType = urlParams.get("emailType");


        // const urlToken = decodeURIComponent(window.location.search.split("=")[1]);
        // const urlEmailType = decodeURIComponent(window.location.search.split("=")[2]);
        console.log("url token", urlToken);
        console.log("url email Typee", urlEmailType);

        setToken(urlToken || "")
        setEmailType(urlEmailType || "")

        // next js way of fetching token
        // const {query} : any = router;
        // const urlToken = query.token;

        // const urlEmailType = query.emailType;
        // setToken(decodeURIComponent(urlToken));
        // setEmailType(decodeURIComponent(urlEmailType) || "")

    }, [router])

    const verifyUserEmail = async () => {


        try {
            // {token} vs token
            // check difference in both 
            const res = await axios.post(`${BASIC_AUTH_URL}/verifyemail`, { token, emailType });
            const data = res.data;
            console.log(token);

            if (data.success === true) {
                setVerified(true);
                // just for the sake for implementation
            }
        } catch (error: any) {
            console.log(error.response.data);

            setError(error.response.data.error);

        }
    }


    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setPasswords((values) => ({ ...values, [name]: value }))

    }

    const handleSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();

        console.log(pass);
        if (pass.password === pass.confirmPassword) {


            try {
                const res = await axios.post(`${BASIC_AUTH_URL}/verifyemail`, { token, emailType, password: pass.password });
                console.log(res.data);
                setSuccessMessage(res.data.message)
                setError("")


            } catch (error: any) {
                console.log(error.response.data);
                setError(error.response.data.error);
                setSuccessMessage("");
            }



        } else {
            setError("Password don't match")
            setSuccessMessage("");
        }
    }


    return <>
        <div className="flex flex-col items-center h-screen">

            {
                emailType === "VERIFY" ? <>
                    <div className=" mt-10 flex flex-col items-center">
                        <p className=" w-fit text-5xl font-semibold">Verify your email</p>
                        <p className=" mt-2 text-zinc-600 text-base">You will need to verify your email to complete registration</p>
                    </div>
                    <div className="mt-7">

                        {

                            verified ? (<Image className="" src={verifyEmailSuccess} alt="verify email svg" width={450} />)
                                :
                                (<Image className="" src={verifyEmail} alt="verify email svg" width={450} />)


                        }

                    </div>
                    <div >

                        {
                            error ? (
                                <div className="mt-5">
                                    <pre>Please create your account again {error}</pre>
                                </div>
                            )
                                :
                                verified ? (
                                    <div className="flex flex-col items-center space-y-4">
                                        <p className="text-2xl font-semibold">You are verified successfully</p>
                                        <Link className="orangeColor font-semibold" href={"/login"}>Click here to login</Link>
                                    </div>
                                )
                                    :
                                    <section className={`mt-4 space-y-3 flex flex-col items-center ${styles.emailButton}`}>
                                        <p className="text-zinc-600 text-base">In order to verify your email click on the button “verify email” </p>
                                        <button onClick={verifyUserEmail} className={`bgOrangeColor p-3 rounded-full text-white w-52`}>Verify Email</button>
                                    </section>
                        }

                    </div>
                </> : <>
                    <div className=" mt-10 flex flex-col items-center">
                        <p className=" w-fit text-5xl font-semibold">Reset your Password</p>
                        <p className=" mt-2 text-zinc-600 text-base">Time for a fresh start! Go ahead and set a new Password</p>
                        <div className="mt-2">
                            {error && <div className="text-red-700">!{error}</div>}
                            {successMessage && <div className="text-green-700">{successMessage}</div>}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-16 space-y-12">

                        <div className={styles.inputGroupRow}>
                            <input name="password" type="password" required value={pass.password || ""} onChange={(e) => onChangeHandler(e)}></input>
                            <label htmlFor="">*Password</label>
                        </div>
                        <div className={styles.inputGroupRow}>
                            <input name="confirmPassword" type="password" required value={pass.confirmPassword || ""} onChange={(e) => onChangeHandler(e)}></input>
                            <label htmlFor="">*Confirm Password</label>
                        </div>


                        <button type="submit" className={`${styles.JoinUsButton} font-semibold`} >Save Changes</button>
                    </form>

                    <Link href={"/login"} className={` w-1/2 mt-10 flex justify-center`}>Already part of family?<span className={`orangeColor hover:text-slate-500`}> Log In!</span></Link>
                </>
            }

        </div>
    </>
}

export default VerifyEmail;