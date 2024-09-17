"use client"
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
export default function FollowButton() {

    const [isFollowing, setIsFollowing] = useState(false);

    const [userId, setUserId] = useState<string>("");

    const router = useRouter();

    useEffect(() => {
        const pathSegments = window.location.pathname.split("/");
        const idFromUrl = pathSegments[pathSegments.length - 1];
        setUserId(idFromUrl);
    }, []);

    const handleFollowToggle = async () => {

        if (!userId) {
            return;
        }
        setIsFollowing(prevState => !prevState);

       
    };
    return (<>

        <button className={styles.followButton} disabled={!userId} onClick={handleFollowToggle}>{isFollowing ? "Following" : "Follow"} </button>

    </>)
}