"use client"
import axios from "axios";
import React, { useState } from "react";
import { BASIC_AUTH_URL } from "../constants/constants";
import Image from "next/image";
import KOILogo from '@/public/KOILogo.svg'
import googleButton from "@/public/googleButtonRegular.svg"
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AddForm = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        userName: "",
        fName: "",
        lName: "",
        email: "",
        userType: "",
        password: "",
        confirmPassword: "",
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> & React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { name, value } = event.target;
        setUser((values) => ({ ...user, [name]: value }))
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log(user);

        setLoading(true)
        // Send request to database
        if (user.password === user.confirmPassword) {
            try {
                const res = await axios.post(`${BASIC_AUTH_URL}/signup`, user);
                console.log(res.data);


            } catch (error: any) {
                console.log(error.message);
                setError(error.message);

            }

            setUser({
                userName: "",
                fName: "",
                lName: "",
                email: "",
                userType: "",
                password: "",
                confirmPassword: "",
            })
            setError("")
            router.push('/login');
        } else {
            setError("Password does not match!")
        }


        setLoading(false)

    }
    return (<>

        <div className=" mt-3 flex justify-center">
            <Image
                className=""
                priority
                src={KOILogo}
                alt="Sign Up Vector"
                height={72}
                width={120}
            />

        </div>


        <form className="p-10 space-y-6 " onSubmit={handleSubmit}>
            <div className="flex space-x-6  justify-between">

                <div className={styles.inputGroupRow}>
                    <input name="fName" type="text" value={user.fName || ""} onChange={(e) => onChangeHandler(e)} required></input>
                    <label htmlFor="">*First Name</label>
                </div>
                <div className={styles.inputGroupRow}>
                    <input className="" name="lName" type="text" value={user.lName || ""} onChange={(e) => onChangeHandler(e)} required></input>
                    <label htmlFor="">*Last Name</label>
                </div>

            </div>
            <div className="flex flex-col space-y-6 ">
                <div className={styles.inputGroup}>
                    <input name="email" type="email" value={user.email || ""} onChange={(e) => onChangeHandler(e)} required ></input>
                    <label htmlFor="">*Email</label>
                </div>
                <div className={styles.inputGroup}>
                    <input name="userName" type="text" value={user.userName || ""} onChange={(e) => onChangeHandler(e)} required></input>
                    <label htmlFor="">*User Name</label>
                </div>

                <div className={styles.selectContainer}>
                    <select className={styles.selectBox} name="userType" value={user.userType || ""} onChange={(e) => onChangeHandler(e)}>
                        <option value={""}>*Select User Type</option>
                        <option value={"student"}>Student</option>
                        <option value={"teacher"}>Teacher</option>
                        <option value={"graduate"}>Graduate</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <input name="password" type="password" value={user.password || ""} onChange={(e) => onChangeHandler(e)} required></input>
                    <label htmlFor="">*Password</label>
                </div>
                <div className={styles.inputGroup}>
                    <input name="confirmPassword" type="password" value={user.confirmPassword || ""} onChange={(e) => onChangeHandler(e)} required></input>
                    <label htmlFor="">*Confirm Password</label>
                </div>


            </div>
            <div className="space-y-3">

                {
                    loading ?
                        <div className="flex items-center w-fit space-x-2 border-4 rounded-lg borderOrange p-1 bo">
                            <div className={styles.loader}></div>
                            <div className="font-semibold text-lg orangeColor">Processing</div>
                        </div>
                        :
                        <button type="submit" className={`${styles.JoinUsButton} font-semibold`} >Join Us</button>
                }

                <p className={`${styles.termsNConditions} orangeColor`}>By signing up you accept the Terms<br />
                    of Service and Privacy Policy</p>
            </div>
            <div className={`${styles.or} grid place-content-center`}>OR</div>

            <div className="flex justify-center">
                <Image
                    className={styles.GoogleBtnReg}
                    priority
                    src={googleButton}
                    alt="Sign Up Vector"

                />

            </div>

            <Link href={"/login"} className={`flex  place-content-center font-semibold`}>Already a member of KOI KONNECT? <span className={`${styles.textColor}`}> Log In!</span></Link>

        </form>


    </>)
}

export default AddForm;