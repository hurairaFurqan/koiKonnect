"use client"

import Image from "next/image"
import React from "react"
import KOILogo from "@/public/KOILogo.svg"
import styles from './styles.module.css';
import Link from "next/link";
import homeIcon from "@/public/homeIcon.svg";
import addIcon from "@/public/addIcon.svg";
import resumeEnhancerIcon from "@/public/resumeEnhancerIcon.svg";
import jobsIcon from "@/public/jobsIcon.svg";
import profileIcon from "@/public/profileIcon.svg"
import logoutIcon from "@/public/logoutIcon.svg";
import { useRouter } from "next/navigation";
import { deleteToken } from "../_actions";


const SideBar = () => {
    const router = useRouter();
    const handleLogout = async () => {
        await deleteToken();
        router.push("/login"); 

    }
    return <>
        <div className="p-5">
            <div className="flex justify-center">
                <Image src={KOILogo} alt="KOI LOGO"></Image>
            </div>
            <div className="mt-4 space-y-2 flex flex-col items-center">
                <Image className="rounded-full w-24 h-24 border border-orange-500" src={profileIcon} alt="user profile avatar"></Image>
                <div className="font-semibold">User First and Last Name</div>
                <div className="orangeColor text-xs">@userName</div>
            </div>
            <div className="mt-3 flex place-content-around text-xs">
                <div className="flex flex-col items-center">
                    10
                    <div>
                        Posts
                    </div>
                </div>
                <div className={styles.vl}></div>
                <div className="flex flex-col items-center">
                    12
                    <div>
                        Followers
                    </div>
                </div>
                <div className={styles.vl}></div>
                <div className="flex flex-col items-center">
                    10
                    <div>
                        Following
                    </div>
                </div>
            </div>
            <div className="h-52 mt-12 flex flex-col place-content-between">
                <Link href={"/profile"} className="flex items-center">
                    <Image className=""  src={homeIcon} alt="home icon" width={22} height={24}></Image>
                    <div className="ml-16">Feed</div>
                </Link>
                <Link href={"/profile/addPost"} className="flex items-center">
                    <Image src={addIcon} alt="add post  icon" width={22} height={24}></Image>
                    <div className="ml-16">Add Post</div></Link>
                <Link href={"/profile/resumeEnhancer"} className="flex items-center">
                    <Image src={resumeEnhancerIcon} alt="resume enhancer icon" width={22} height={24}></Image>
                    <div className="ml-16">Resume Enhancer</div>
                </Link>
                <Link href={"/profile/jobs"} className="flex items-center">
                    <Image src={jobsIcon} alt="jobs icon" width={22} height={24}></Image>
                    <div className="ml-16">Jobs</div>
                </Link>
                <Link href={"/profile/settings"} className="flex items-center">
                    <Image src={profileIcon} alt="profile icon" width={22} height={24}></Image>
                    <div className="ml-16">Profile</div>
                </Link>

            </div>
            <div>
                <button className="mt-20 flex items-center" onClick={handleLogout}>
                    <Image src={logoutIcon} alt="logout icon" width={22} height={24}></Image>
                    <div className="ml-16">Logout</div>
                </button>
            </div>
        </div>
    </>
}

export default SideBar