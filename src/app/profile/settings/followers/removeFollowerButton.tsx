"use client";

import { followUser } from "@/src/app/actions/postActions";
import React, { useState } from "react";

interface RemoveFollowerButtonProps {
    followerId: string;
}

const RemoveFollowerButton: React.FC<RemoveFollowerButtonProps> = ({ followerId }) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemoveFollower = async () => {
        
        setIsRemoving(true);
        try {
            const res = await followUser(followerId, "removeFollower");
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
            onClick={handleRemoveFollower}
            disabled={isRemoving}
        >
            {isRemoving ? "Removing..." : "Remove"}
        </button>
    );
};

export default RemoveFollowerButton;
