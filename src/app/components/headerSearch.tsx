"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import searchIcon from "@/public/icons/searchIcon.svg";
import profileIcon from "@/public/icons/profileIcon.svg";
import axios from "axios";
import { BASIC_AUTH_URL_USERS, searchSlugs } from "../constants/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css"
import { searchUsers } from "../actions/retrievalActions";

interface User {
    _id: string;
    userName: string;
    fName: string;
    lName: string;
    email: string;
    isVerified: boolean;
    userBio: string;
    userType: string;
    localProfileImageUrl?: string;
}

const HeaderSearch = () => {
    const router = useRouter();
    const [state, setState] = useState<string>("");
    const [queryResults, setQueryResults] = useState<User[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(true);


    const handleResultClick = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        const fetchResults = async () => {
            if (state) {
                try {
                    const res = await searchUsers(state)

                    console.log(res);
                    
                    setQueryResults(res || []);
                } catch (error) {
                    console.error("Error fetching results", error);
                }
            } else {
                setQueryResults([]);
            }
        };

        fetchResults();
    }, [state]);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    };

    return (
        <>
            <div className={`${styles.searchForm}`}>
                <input
                    type="search"
                    className={styles.searchInput}
                    placeholder="Search"
                    value={state}
                    onChange={handleInputChange}
                />
                <button type="submit" className={styles.searchButton} disabled>
                    <Image src={searchIcon} alt="search icon" />
                </button>
            </div>

            {isVisible && (
                <div className="relative">
                    <div className={styles.cardContainer}>
                        <ul className={styles.userList}>
                            {queryResults.length > 0 ? (
                                queryResults.map((user: User) => (
                                    <li key={user._id} className={styles.card}>
                                        <Link href={`/profile/${user._id}`} className="flex items-center space-x-4" onClick={handleResultClick}>
                                            <Image
                                                className="rounded-full w-10 h-10 border border-orange-500 object-cover"
                                                src={user.localProfileImageUrl || profileIcon}
                                                alt="user profile avatar"
                                                width={40}
                                                height={40}
                                                unoptimized
                                            />
                                            <p>{user.userName}</p>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <p></p>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeaderSearch;
