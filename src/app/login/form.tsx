"use client"
import React, { useState } from "react";
import styles from "./styles.module.css"
import axios from "axios";
import { BASIC_AUTH_URL } from "../constants/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginForm = () => {

    const router = useRouter();
    const [userCredentials, setuserCredentials] = useState({
        "email": "",
        "password": "",
    })

    const [loading, setLoading] = useState(false);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setuserCredentials((values) => ({ ...values, [name]: value }));
    }

    const handleSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        // send request to database

        try {
            const res = await axios.post(`${BASIC_AUTH_URL}/login`, userCredentials);

            console.log(res.data);
            router.push("/profile")


        } catch (error: any) {
            console.log(error.message);

        }

        setuserCredentials({
            "email": "",
            "password": "",
        })

        setLoading(false)
    }

    return (
        <div className="mt-48">
            <div className=" w-1/2 flex justify-center items-center flex-col">
                <p className=" max-w-fit font-semibold text-4xl">Login</p>
                <hr className={styles.divider}></hr>
            </div>
            <form onSubmit={handleSubmit} className="">

                <div className="flex flex-col space-y-6 mt-10">
                    <div className={`${styles.inputGroup}`}>
                        <input name="email" type="email" value={userCredentials.email || ""} onChange={(e) => onChangeHandler(e)} required ></input>
                        <label htmlFor="">*Email</label>
                    </div>
                    <div className={`${styles.inputGroup}`}>
                        <input name="password" type="password" value={userCredentials.password || ""} onChange={(e) => onChangeHandler(e)} required></input>
                        <label htmlFor="">*Password</label>
                    </div>
                </div>

                <p className="font-semibold orangeColor text-xs hover:text-slate-500">Forgot Password?</p>
                <button className={styles.loginButton}>Login</button>


                <Link href={"/signup"} className={` w-1/2 mt-20 font-semibold flex justify-center`}>No account yet? <span className={`orangeColor hover:text-slate-500`}> Register Now!</span></Link>
            </form>

        </div>)
}

export default LoginForm;