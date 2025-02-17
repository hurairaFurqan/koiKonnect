"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import KOILogo from "@/public/icons/KOILogo.svg"
import styles from './styles.module.css';
import Link from "next/link";
import homeIcon from "@/public/icons/homeIcon.svg";
import addIcon from "@/public/icons/addIcon.svg";
import resumeEnhancerIcon from "@/public/icons/resumeEnhancerIcon.svg";
import jobsIcon from "@/public/icons/jobsIcon.svg";
import profileIcon from "@/public/icons/profileIcon.svg"
import logoutIcon from "@/public/icons/logoutIcon.svg";
import { useRouter } from "next/navigation";
import { deleteToken } from "../actions/_actions";
import { sideNavUrlSlug } from "../constants/constants";


interface UserImageUpdateProps {
    profileUrl: string,
    userName: string,
    fName: string,
    lName: string,
    userPostsCount: number,
    followerCount: number,
    followingCount: number
}

const SideBar: React.FC<UserImageUpdateProps> = (props: UserImageUpdateProps) => {

    const { profileUrl, userName, fName, lName, userPostsCount, followerCount, followingCount } = props;
    const router = useRouter();
    const handleLogout = async () => {
        await deleteToken();
        router.push("/login");

    }

    useEffect(() => {
    }, [])
    return <>
        <div className="p-5 flex flex-col  h-full">
            <div className="flex justify-center">
                <Image src={KOILogo} alt="KOI LOGO"></Image>
            </div>
            <div className="mt-4 space-y-2 flex flex-col items-center">
                <Image className="rounded-full w-24 h-24 border border-orange-500" src={profileUrl || profileIcon} alt="user profile avatar" width={22} height={24} unoptimized></Image>
                <div className="font-semibold">{fName} {lName}</div>
                <div className="orangeColor text-xs">@{userName}</div>
            </div>
            <div className="mt-3 flex place-content-around text-xs">
                <div className="flex flex-col items-center">
                    {userPostsCount}
                    <div>
                        Posts
                    </div>
                </div>
                <div className={styles.vl}></div>
                <div className="flex flex-col items-center">
                    {followerCount}
                    <div>
                        Followers
                    </div>
                </div>
                <div className={styles.vl}></div>
                <div className="flex flex-col items-center">
                    {followingCount}
                    <div>
                        Following
                    </div>
                </div>
            </div>
            <div className="flex mt-4 flex-col h-5/6 ">
                <div className="grow flex flex-col space-y-10 mx-1">
                    <Link href={sideNavUrlSlug.feed} className="flex items-center">
                        <Image className="" src={homeIcon} alt="home icon" width={22} height={24}></Image>
                        <div className="ml-16">Feed</div>
                    </Link>
                    <Link href={sideNavUrlSlug.addPost} className="flex items-center">
                        <Image src={addIcon} alt="add post  icon" width={22} height={24}></Image>
                        <div className="ml-16">Add Post</div></Link>
                    <Link href={sideNavUrlSlug.resumeEnhancer} className="flex items-center">
                        <Image src={resumeEnhancerIcon} alt="resume enhancer icon" width={22} height={24}></Image>
                        <div className="ml-16">Resume Enhancer</div>
                    </Link>
                    <Link href={sideNavUrlSlug.jobs} className="flex items-center">
                        <Image src={jobsIcon} alt="jobs icon" width={22} height={24}></Image>
                        <div className="ml-16">Jobs</div>
                    </Link>
                    <Link href={sideNavUrlSlug.settings} className="flex items-center">
                        <Image src={profileIcon} alt="profile icon" width={22} height={24}></Image>
                        <div className="ml-16">Profile</div>
                    </Link>
                </div>
                <div className="">
                    <button className="flex items-center" onClick={handleLogout}>
                        <Image src={logoutIcon} alt="logout icon" width={22} height={24}></Image>
                        <div className="ml-16">Logout</div>
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default SideBar