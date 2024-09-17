
import Link from "next/link"
import styles from "./styles.module.css"
import Image from "next/image"
import { linkHrefSlugs } from "@/src/app/constants/constants"
import SearchBar from "./searchBar"
import backIcon from "@/public/icons/backIcon.svg"

const Followers = () => {
    return (<>
        <div className={`${styles.parent}`}>
            <div className={`${styles.outOfFlow}`}>
                Followers
            </div>
            <div className=" flex items-center	 ">
                <Link href={`${linkHrefSlugs.profile}`} className="">
                    <Image className={`${styles.rotote}`} src={backIcon} alt="go back" ></Image>
                </Link> 
                <SearchBar></SearchBar>
            </div>
        </div>
    </>)
}


export default Followers