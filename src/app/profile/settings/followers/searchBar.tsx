import Image from "next/image";
import searchIcon from "@/public/icons/searchIcon.svg"
import styles from "./styles.module.css"
const SearchBar = () => {

    return <>
        <div className={`${styles.searchForm}`}>
            <input type="search" className={styles.searchInput} placeholder="Search your user..." />
            <button type="submit" className={styles.searchButton}>
                <Image src={searchIcon} alt="searchIcon"></Image>
            </button>
        </div>
    </>
}

export default SearchBar;