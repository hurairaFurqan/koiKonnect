
"use client"

import Image from "next/image"
import React from "react"
import Link from "next/link";
import appearanceIcon from "@/public/icons/appearanceIcon.svg"
import commentIcon from "@/public/icons/commentIcon.svg"
import settingIcon from "@/public/icons/settingsIcon.svg"
import notificationIcon from "@/public/icons/notificationIcon.svg"
import profileIcon from "@/public/icons/profileIcon.svg"
import { settingsSideBaUrlSlug } from "../constants/constants";
import styles from "./styles.module.css"

const SettingsSideBar = () => {
    return <>
        <div className="flex flex-col">
            <div className="flex flex-col h-5/6 ">
                <div className="grow flex flex-col space-y-10 mx-1">
                    <Link href={settingsSideBaUrlSlug.userProfile} className="flex items-center">
                        <Image className="" src={profileIcon} alt="user profile icon" width={22} height={24}></Image>
                        <div className="ml-16">Profile</div>
                    </Link>
                    <Link href={settingsSideBaUrlSlug.accountSetting} className="flex items-center">
                        <Image src={settingIcon} alt="account setting icon" className={styles.svgColor} width={22} height={24}></Image>
                        <div className="ml-16">Account</div></Link>
                    <Link href={settingsSideBaUrlSlug.chatSettings} className="flex items-center">
                        <Image src={commentIcon} alt="Chat icon" width={22} height={24}></Image>
                        <div className="ml-16">Chat</div>
                    </Link>
                    <Link href={settingsSideBaUrlSlug.appearanceSettings} className="flex items-center">
                        <Image src={appearanceIcon} alt="appearance icon" width={22} height={24}></Image>
                        <div className="ml-16">Appearance</div>
                    </Link>
                    <Link href={settingsSideBaUrlSlug.notificationSettings} className="flex items-center">
                        <Image src={notificationIcon} alt="notification icon" className={styles.svgColor} width={22} height={24}></Image>
                        <div className="ml-16">Notification</div>
                    </Link>
                </div>
            </div>
        </div>
    </>
}

export default SettingsSideBar