import HeaderSearch from "@/src/app/components/headerSearch";
import styles from "./styles.module.css"
import SearchBar from "./searchBar";
import Link from "next/link";
import Image from "next/image";
import backIcon from "@/public/icons/backIcon.svg"
import { linkHrefSlugs } from "@/src/app/constants/constants";

const Following = () => {
    return (<>
        <div className={` ${styles.parent}`}>
            <div className={`${styles.outOfFlow}`}>
                Following
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


export default Following;