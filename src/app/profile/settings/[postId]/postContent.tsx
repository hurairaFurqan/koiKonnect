"use client"

import { userInfoRetrieval } from "@/src/app/actions/_actions";
import { postRetrieval } from "@/src/app/actions/retrievalActions";
import Image from "next/image";
import profileIcon from "@/public/icons/profileIcon.svg"
import menuIcon from "@/public/icons/menuIcon.svg"

import filledLikeIcon from "@/public/icons/filledLikeIcon.svg"
import filledSaveIcon from "@/public/icons/filledSaveIcon.svg"
import outlineLikeIcon from "@/public/icons/outlineLikeIcon.svg"
import outlineSaveIcon from "@/public/icons/outlineSaveIcon.svg"
import commentIcon from "@/public/icons/commentIcon.svg"
import shareIcon from "@/public/icons/shareIcon.svg"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CommentSection from "./commentSection";


const PostContent = () => {
    const params = useParams();
    const [postData, setPostData] = useState({
        imageURL: "",
        commentPermission: false
    });

    const [userData, setUserData] = useState({
        localProfileImageUrl: "",
        userName: "",
    });

    useEffect(() => {


        const fetchData = async () => {
            const postId: string = params.postId as string;
            if (postId) {
                const data = await postRetrieval(postId);
                const userInfo = await userInfoRetrieval();
                setPostData(data);
                setUserData(userInfo);

            }
        }

        fetchData().catch((error: any) => {
            console.log(error);

        });


    }, [])
    return <>
        <div className="h-full grid grid-cols-3">
            <div className="col-span-2 bg-green-500">
                <Image src={postData.imageURL} alt="Post Image" width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }}></Image>
            </div>
            <div className="col-span-1">
                <div className="flex items-center p-2">
                    <Image className="rounded-full w-10 h-10  border border-orange-500 object-cover"
                        src={userData.localProfileImageUrl || profileIcon} alt="user profile avatar"
                        width={10} height={12} unoptimized></Image>
                    <p className="text-sm ml-4">{userData.userName || ""}</p>
                    <div className="w-full flex justify-end">
                        <Image src={menuIcon} alt="menu icon"></Image>
                    </div>
                </div>

                <hr></hr>

                <div className=" h-3/4">
                    <CommentSection />
                </div>
                <hr></hr>
                <div className=" flex space-x-4">
                    <button className="ml-2" >
                        <Image className="w-8 h-8" src={outlineLikeIcon} alt="outlineLikeIcon"></Image>
                    </button>
                    <button>
                        <Image className="w-10 h-10" src={commentIcon} alt="commentIcon"></Image>

                    </button>
                    <button>
                        <Image className="w-8 h-8" src={shareIcon} alt="shareIcon"></Image>

                    </button>

                    <button className=" w-full flex  justify-end">
                        <Image className="w-6 h-6 mt-2 " style={{ marginRight: ".5rem" }} src={outlineSaveIcon} alt="outlineSaveIcon"></Image>
                    </button>


                </div>
                <div className="ml-2 text-sm">{ } Likes</div>
                <hr className="mt-2"></hr>
                {
                    postData.commentPermission &&

                    <form className="p-2 flex content-center grid grid-cols-5">
                        <input className="col-span-4 outline-none text-sm text-gray-500" placeholder="Add a comment..."></input>


                        <button type="submit" className="col-span-1 text-sm flex justify-end  hover:text-orange-500">Post</button>


                    </form>
                }
            </div>
        </div>
    </>
}

export default PostContent;