
import profileIcon from "@/public/icons/profileIcon.svg"
import { userRetrieval } from "@/src/app/actions/retrievalActions";
import CoverPhoto from "./coverPhoto";
import Image from "next/image";
import genderIcon from "@/public/icons/genderIcon.svg";
import birthdayIcon from "@/public/icons/birthdayIcon.svg"
import userType from "@/public/icons/studentStatus.svg"
import atTheRateIcon from "@/public/icons/@.svg";
import styles from "./styles.module.css"
import PostSection from "./postSection";

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

export default async function Settings() {

    const data = await userRetrieval();
    const userPosts = await data?.userPosts || [];

    // console.log(userPosts);



    const profileUrl = data?.localProfileImageUrl || ""

    const coverPhoto = data?.coverPhoto || "";
    return <>
        <div className="h-full relative">
            <div className={`${styles.profileImageDiv} `}>
                <Image className="rounded-full w-24 h-24 border border-orange-500" src={profileUrl || profileIcon} alt="user profile avatar" width={22} height={24} unoptimized></Image>
            </div>
            <div className={`${styles.coverDiv}`}>
                <CoverPhoto coverPhoto={coverPhoto} />
            </div>

            <div className="mt-12 flex  justify-center">
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
                    <div className="flex  flex-col items-center">
                        12
                        <div>
                            Followers
                        </div>
                    </div>
                    <div className="flex   flex-col items-center">
                        10
                        <div>
                            Following
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Information & Posts Section */}

            <div className="grid grid-cols-4 mt-2 " style={{ height: "16rem" }}>
                <div className="col-span-1 p-2 text-xs h-3/5 rounded-lg" style={{ backgroundColor: "#F4F4F4", width:"95%" }}>
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
                <div className="col-span-3 rounded-lg p-2 bg-slate-100 flex flex-wrap gap-1 overflow-y-auto h-50" style={{ backgroundColor: "#F4F4F4"}}>
                    {
                        userPosts && userPosts.map((post: post) => {

                            return (<div key={post._id} >
                                <PostSection {...post} />
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    </>
}