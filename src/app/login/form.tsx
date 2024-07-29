"use client"
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { loginEntry } from "../_actions";


function SubmitButton() {
    const { pending } = useFormStatus();
    return (<>
        {pending ? <div className="flex items-center w-1/2 place-content-around space-x-2 border-4 rounded-lg borderOrange p-1">
            <div className={styles.loader}></div>
            <div className="font-semibold text-lg orangeColor">Verifying User Credentials</div>
        </div> : <button className={styles.loginButton}>Login</button>}
    </>)
}

const initialState = {
    successMessage: "",
    errorMessage: ""
}

const LoginForm = () => {

    const router = useRouter();

    const [userCredentials, setUserCredentials] = useFormState(loginEntry, initialState)

    useEffect(() => {

        if (userCredentials.successMessage) {
            router.push("/profile")
        }

    }, [userCredentials.successMessage])
    return (
        <div className="mt-48">
            <div className=" w-1/2 flex justify-center items-center flex-col">
                <p className=" max-w-fit font-semibold text-4xl">Login</p>
                <hr className={styles.divider}></hr>
                {userCredentials.errorMessage && <div className="text-red-700 mt-5">!{userCredentials.errorMessage}</div>}
                {userCredentials.successMessage && <div className="text-green-700 mt-5">{userCredentials.successMessage}</div>}
            </div>
            <div className="mt-4">


            </div>
            <form action={setUserCredentials} className="">

                <div className="flex flex-col space-y-6 mt-10">
                    <div className={`${styles.inputGroup}`}>
                        <input name="email" type="email" required ></input>
                        <label htmlFor="">*Email</label>
                    </div>
                    <div className={`${styles.inputGroup}`}>
                        <input name="password" type="password" required></input>
                        <label htmlFor="">*Password</label>
                    </div>
                </div>
                <div>
                    <Link href={"/resetPassword"} className="w-1/2 font-semibold orangeColor text-xs hover:text-slate-500">Forgot Password?</Link>
                </div>
                <div className="mt-3">
                    <SubmitButton></SubmitButton>
                </div>

                <Link href={"/signup"} className={` w-1/2 mt-20 font-semibold flex justify-center`}>No account yet? <span className={`orangeColor hover:text-slate-500`}> Register Now!</span></Link>
            </form>

        </div>)
}

export default LoginForm;