
import profileIcon from "@/public/icons/profileIcon.svg"
import { userRetrievalBasedOnId } from "@/src/app/actions/retrievalActions";

import Image from "next/image";
import genderIcon from "@/public/icons/genderIcon.svg";
import birthdayIcon from "@/public/icons/birthdayIcon.svg"
import userType from "@/public/icons/studentStatus.svg"
import atTheRateIcon from "@/public/icons/@.svg";
import styles from "./styles.module.css"
import PostSection from "./postSection";
import Link from "next/link";
import { linkHrefSlugs } from "../../constants/constants";
import FollowButton from "./followButton";
import MessageButton from "./messageButton";

interface post {
    _id: string,
    postCaption: string,
    location: string,
    imageURL: string,
    commentPermission: boolean,
    privacyPermission: boolean,
    userId: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
}

export default async function UserId({ params }: { params: { userId: string } }) {

    const userId = params.userId;
    const data = await userRetrievalBasedOnId(userId);
    
    const userPosts = await data?.userPosts || [];


    const profileUrl = data?.localProfileImageUrl || ""

    const coverPhoto = data?.coverPhoto || "";
    return <>
        <div className="h-full mt-4 p-4 relative">
            <div className={`${styles.profileImageDiv} `}>
                <Image className="rounded-full w-32 h-32 border border-orange-500" src={profileUrl || profileIcon} alt="user profile avatar" width={22} height={24} unoptimized></Image>
            </div>
            <div className={`${styles.coverDiv}`}>
                <div className="rounded-xl relative" style={{ backgroundColor: "#D9D9D9", height: "14rem" }}>

                    {coverPhoto ?
                        <Image className={`${styles.Image} bg-red-500 object-cover rounded-xl`} src={coverPhoto} alt="preview Image" width={0} height={0} style={{ width: "100%", height: "100%" }} unoptimized></Image>
                        : <p className="flex justify-center h-full items-center" style={{ color: "#F36E39" }}>No Cover Photo</p>
                    }
                </div>
            </div>
            <div className=" mt-4 grid grid-cols-2">
                <div className=" pr-16 flex justify-center">
                    <FollowButton />
                </div>
                <div className=" pl-16 flex justify-center">
                    <MessageButton />
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <div className="space-x-3">
                    <span className="font-semibold text-xl">{data?.fName || ""} {data?.lName || ""}</span>
                    <span>&#x2022;</span>
                    <span style={{ color: "#F36E39" }}>{data?.userType || ""} </span>
                </div>
            </div>
            <div className="flex justify-center text-sm">{data?.userBio || ""}</div>

            <div className="flex  justify-center">
                <div className="mt-3 flex  place-content-between text-xs w-1/4 ">
                    <div className="flex flex-col items-center">
                        10
                        <div>
                            Posts
                        </div>
                    </div>
                    <Link href={`${linkHrefSlugs.followers}`} className="flex  flex-col items-center">
                        12
                        <div>
                            Followers
                        </div>
                    </Link>
                    <Link href={`${linkHrefSlugs.following}`} className="flex flex-col items-center">
                        10
                        <div>
                            Following
                        </div>
                    </Link>
                </div>
            </div>

            {/* Side Information & Posts Section */}

            <div className="grid grid-cols-4 mt-2" style={{ height: "17rem" }}>
                <div className="col-span-1 p-2 text-xs h-3/5 rounded-lg bg-white" style={{ width: "80%" }}>
                    <div className="h-full flex flex-col place-content-between	">
                        <div style={{ color: "#5E5E5E" }}>Personal Information</div>
                        <div className="flex space-x-4">
                            <Image src={genderIcon} alt="gender Icon"></Image>
                            <span>Gender</span>
                        </div>
                        <div className="flex space-x-4">
                            <Image src={birthdayIcon} alt="birthday Icon"></Image>
                            <span>Birthday Date</span>
                        </div>
                        <div className="flex space-x-4 ">
                            <Image src={userType} alt="user Type Icon"></Image>
                            <span>{data?.userType || ""}</span>
                        </div>
                        <div className="flex space-x-4 ">
                            <Image src={atTheRateIcon} alt="@ Icon"></Image>
                            <span>{data?.userName || ""}</span>
                        </div>
                    </div>

                </div>
                <div className="col-span-3 rounded-lg p-2 flex flex-wrap gap-1 overflow-y-auto h-72 bg-white">
                    {
                        userPosts && userPosts.map((post: post) => {

                            return (<div key={post._id} >
                                <PostSection {...post} userId={userId} />
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    </>
}