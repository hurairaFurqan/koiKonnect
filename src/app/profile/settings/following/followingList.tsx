import Image from "next/image";
import React from "react";
import profileIcon from "@/public/icons/profileIcon.svg";
import RemoveFollowerButton from "./removeFollowingButton";


interface FollowingProps {
    _id: string;
    userName: string;
    fName: string;
    lName: string;
    localProfileImageUrl: string;
}

const FollowingList: React.FC<FollowingProps> = ({ _id, userName, fName, lName, localProfileImageUrl }) => {
    return (
        <>
            <div className="flex items-center justify-between p-4">
        
                <div className="flex items-center">
                    <Image
                        className="rounded-full w-16 h-16 border border-orange-500"
                        src={localProfileImageUrl || profileIcon}
                        alt="user profile avatar"
                        width={64}
                        height={64}
                        unoptimized
                    />
                    <div className="flex flex-col ml-4">
                        <div>{userName}</div>
                        <div style={{ color: "#5E5E5E" }}>{fName} {lName}</div>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <RemoveFollowerButton followingId={_id} />
                </div>
            </div>
        </>
    );
};

export default FollowingList;
