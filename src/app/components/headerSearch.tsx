"use client"

import Image from "next/image";
import { useState } from "react"
import searchIcon from "@/public/searchIcon.svg"
import styles from "./styles.module.css"

const HeaderSearch = () => {

    const [state, setState] = useState("");
    

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        console.log(state);

    }

    return <>
        <form className={`${styles.searchForm}`} onSubmit={handleSubmit}>
            <input type="search" className={styles.searchInput} placeholder="Search"  value={state || ""} onChange={(e) => setState(e.target.value)} />
            <button type="submit" className={styles.searchButton}>
                <Image src={searchIcon} alt="searchIcon"></Image>
            </button>

        </form>

    </>
}


export default HeaderSearch