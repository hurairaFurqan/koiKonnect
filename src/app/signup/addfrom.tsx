"use client"
import React, { useState } from "react";
import Image from "next/image";
import KOILogo from '@/public/KOILogo.svg'
import googleButton from "@/public/googleButtonRegular.svg"
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { addEntry } from "../_actions";

// TODO : redirecting user to login

function SubmitButton() {
    const { pending } = useFormStatus();
    return (<>
        {pending ? <div className="flex items-center w-fit space-x-2 border-4 rounded-lg borderOrange p-1 bo">
            <div className={styles.loader}></div>
            <div className="font-semibold text-lg orangeColor">Processing</div>
        </div>
            :
            <button type="submit" className={`${styles.JoinUsButton} font-semibold`} >Join Us</button>}
    </>)
}


const initialState = {
    message: "",
    success: false,
}

const AddForm = () => {
    const [state, setState] = useFormState(addEntry, initialState);

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
    return (<>

        <section className=" mt-3 flex justify-center">
            <Image
                className=""
                priority
                src={KOILogo}
                alt="Sign Up Vector"
                height={72}
                width={120}
            />

        </section>


        <form className="p-10 space-y-6 " action={setState}>
            <div className="flex space-x-6  justify-between">

                <div className={styles.inputGroupRow}>
                    <input name="fName" type="text" required></input>
                    <label htmlFor="">*First Name</label>
                </div>
                <div className={styles.inputGroupRow}>
                    <input className="" name="lName" type="text" required></input>
                    <label htmlFor="">*Last Name</label>
                </div>

            </div>
            <div className="flex flex-col space-y-6 ">
                <div className={styles.inputGroup}>
                    <input name="email" type="email" required ></input>
                    <label htmlFor="">*Email</label>
                </div>
                <div className={styles.inputGroup}>
                    <input name="userName" type="text" required></input>
                    <label htmlFor="">*User Name</label>
                </div>

                <div className={styles.selectContainer}>
                    <select className={styles.selectBox} name="userType" >
                        <option value={""}>*Select User Type</option>
                        <option value={"student"}>Student</option>
                        <option value={"teacher"}>Teacher</option>
                        <option value={"graduate"}>Graduate</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <input name="password" type="password" required></input>
                    <label htmlFor="">*Password</label>
                </div>
                <div className={styles.inputGroup}>
                    <input name="confirmPassword" type="password" required></input>
                    <label htmlFor="">*Confirm Password</label>
                </div>
            </div>
            <div className="space-y-3">
                <SubmitButton />


                <p>{state?.message}</p>

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