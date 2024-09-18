import React from "react";
import SideBar from "../components/sidebar";
import Header from "../components/header";
import styles from "./styles.module.css"
import { userInfoRetrieval } from "@/src/app/actions/_actions";
import { getFollowers, getFollowing, userRetrieval } from "../actions/retrievalActions";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {

    const data = await userRetrieval();
    const followers = await getFollowers();

    const following = await getFollowing();

    const userPosts = await data?.userPosts || [];

    const userPostsCount = userPosts.length || 0;

    const profileUrl = data?.localProfileImageUrl || ""

    const followerCount = followers?.followerCount || 0;
    const followingCount = following?.followingCount || 0;

    return (
        <>
            <div className="grid grid-cols-8 h-screen">
                <div className="col-span-2">
                    <SideBar profileUrl={profileUrl} userPostsCount={userPostsCount}
                        followerCount={followerCount} followingCount={followingCount}
                        fName={data?.fName} lName={data?.lName} userName={data?.userName}></SideBar>
                </div>
                <div className="col-span-6 p-6">
                    <div className={`${styles.rightBase} p-6`} >
                        <Header></Header>
                        <main className={styles.main}>{children}</main>
                    </div>
                </div>
            </div>
        </>
    )
}