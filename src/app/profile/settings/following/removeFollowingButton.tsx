"use client";

import { followUser } from "@/src/app/actions/postActions";
import React, { useState } from "react";

interface RemoveFollowingButtonProps {
    followingId: string;
}

const RemoveFollowingButton: React.FC<RemoveFollowingButtonProps> = ({ followingId }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemoveFollowing = async () => {
        
        setIsRemoving(true);
        try {
            const res = await followUser(followingId, "removeFollowing");
            console.log(res);
            
        } catch (error) {
            console.error(error);
        } finally {
            setIsRemoving(false);
        }
    };

    return (
        <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={handleRemoveFollowing}
            disabled={isRemoving}
        >
            {isRemoving ? "Removing..." : "Remove"}
        </button>
    );
};

export default RemoveFollowingButton;
