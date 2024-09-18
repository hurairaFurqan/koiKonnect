import Image from 'next/image';
import React from 'react';
import profileIcon from "@/public/icons/profileIcon.svg";
import menuIcon from "@/public/icons/menuIcon.svg";
import InteractiveButtons from './interactionButtons';


interface User {
    _id: string;
    fName: string;
    lName: string;
    userType: string;
    localProfileImageUrl: string;
    userName: string;
}

interface Post {
    _id: string;
    imageURL: string,
    postCaption: string,
    userId: User;
}

interface PostContentProps {
    post: Post;
}

const PostContent: React.FC<PostContentProps> = async ({ post }) => {
    const localProfileImageUrl = post?.userId?.localProfileImageUrl;
    const userName = post?.userId?.userName;
    const userType = post?.userId?.userType;
    const imageURL = post?.imageURL;
    const postCaption = post?.postCaption;

    return (
        <div className='rounded bg-white max-w-xs mx-auto'>
            <div className='flex justify-between items-center p-2'>
                <div className='flex items-center'>
                    <Image
                        className="rounded-full w-10 h-10 border border-orange-500 object-cover"
                        src={localProfileImageUrl || profileIcon}
                        alt="user profile avatar"
                        width={40}
                        height={40}
                        unoptimized
                    />
                    <div className='ml-2 flex flex-col'>
                        <div className="font-semibold text-sm">{userName || ""}</div>
                        <div className="font-semibold text-xs text-gray-500">{userType || ""}</div>
                    </div>
                </div>
                <div>
                    <Image
                        src={menuIcon}
                        alt="menu Icon"
                        width={24}
                        height={24}
                    />
                </div>
            </div>
            <div className='flex justify-center p-2'>
                <Image
                    src={imageURL || "no image found"}
                    alt='post Image'
                    width={300}
                    height={300}
                    style={{ objectFit: 'cover' }}
                    unoptimized
                />
            </div>

            <div>
                <InteractiveButtons></InteractiveButtons>
            </div>

            <div className='p-2'>
                {/* Likes */}
            </div>
            <div className='p-2 text-xs font-semiBold'>
                {postCaption || ""}

            </div>
        </div>
    );
}

export default PostContent;
