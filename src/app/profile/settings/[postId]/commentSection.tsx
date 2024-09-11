import Image from "next/image";
import React from "react";
import profileIcon from "@/public/icons/profileIcon.svg"


interface User {
    _id: string,
    userName: string,
    localProfileImageUrl: string
}


interface Comment {
    user: User,
    commentContent: string,
    _id: string,
}

interface CommentListProps {
    comments: Comment[]
}
const CommentSection: React.FC<CommentListProps> = ({ comments }) => {

    return (<>
        <div className="">
            {
                comments.map((comment) => {
                    return (<div key={comment._id} className="flex items-center	space-x-2 p-2">
                        <Image className="rounded-full w-10 h-10  border border-orange-500 object-cover"
                            src={comment?.user?.localProfileImageUrl || profileIcon} alt="user profile avatar"
                            width={10} height={12} unoptimized></Image>

                            <p className="font-semibold	text-sm">{comment?.user?.userName}</p>
                            <p className="text-xs" style={{color:""}}>{comment?.commentContent}</p>
                    </div>)
                })
            }
        </div>
    </>)
}

export default CommentSection;