"use client"
import Image from "next/image"
import profileIcon from "@/public/profileIcon.svg"
import styles from "./styles.module.css"
import { useState } from "react"
import axios from "axios"
import { authUrlSlug, BASIC_AUTH_URL } from "@/src/app/constants/constants"
export default function UserImageUpdate() {

    const [file, setFile] = useState<File>();
    const [profileUrl, setProfileUrl] = useState("");

    console.log(profileUrl);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        try {
            const data = new FormData();
            data.set("file", file);
            const res = await axios.post(`${BASIC_AUTH_URL}/${authUrlSlug.uploadProfileImage}`, data);

            console.log(res.data);


            setProfileUrl(res.data.profileUrl)



        } catch (error: any) {
            console.log(error.response.message);

        }
    }

    return (
        <>
            <div className="flex">
                <div className="ml-4 space-y-2 flex flex-col items-center w-fit">
                    <p className="text-xs text-gray-500">Profile Picture</p>
                    <Image className="rounded-full w-24 h-24  border border-orange-500 object-cover" src={profileUrl || profileIcon} alt="user profile avatar" width={22} height={24}></Image>
                </div>

                <form onSubmit={handleSubmit} className="flex items-center place-content-around  mt-2 w-1/2 ml-12">

                    <label htmlFor="file-upload" className={styles.imageButton}>Change Picture</label>
                    <input className={styles.fileUpload} id="file-upload" accept=".png, .jpg, .jpeg" type="file" onChange={(e) => setFile(e.target.files?.[0])}></input>
                    <button className={`${styles.imageButton}`} type="submit"> Delete Picture</button>

                </form>
            </div>
        </>)
}