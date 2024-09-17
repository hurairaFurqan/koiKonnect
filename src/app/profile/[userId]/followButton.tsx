"use client"
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { followUser } from "../../actions/postActions";
import { getFollowStatus } from "../../actions/retrievalActions";
export default function FollowButton() {

    const [isFollowing, setIsFollowing] = useState(false);

    const [userId, setUserId] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        const pathSegments = window.location.pathname.split("/");
        const idFromUrl = pathSegments[pathSegments.length - 1];
        setUserId(idFromUrl);
    }, []);


    useEffect(() => {
        const fetchFollowStatus = async () => {
            try {

                console.log(userId, "in client");
                
                const res = await getFollowStatus(userId);
                setIsFollowing(res.isFollowing)
                console.log(res);
                
            } catch (error) {
                console.error("Error while fetching follow status", error);
            }
        };

        fetchFollowStatus();
    },[userId])

    const handleFollowToggle = async () => {

        if (!userId) {
            return;
        }
        setIsFollowing(prevState => !prevState);

        try {

            const res = await followUser(userId, isFollowing);

            if (res && res.data && res.data.success) {
                setIsFollowing(prevState => !prevState);
            } else {
                
                setIsFollowing(prevState => !prevState);
            }

        } catch (error) {
            console.error("Error while following/unfollowing:", error);
            setIsFollowing(prevState => !prevState);
        }
    };
    return (<>

        <button className={styles.followButton} disabled={!userId} onClick={handleFollowToggle}>{isFollowing ? "Following" : "Follow"} </button>

    </>)
}