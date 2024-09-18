import HeaderSearch from "@/src/app/components/headerSearch";
import styles from "./styles.module.css"
import SearchBar from "./searchBar";
import Link from "next/link";
import Image from "next/image";
import backIcon from "@/public/icons/backIcon.svg"
import { linkHrefSlugs } from "@/src/app/constants/constants";
import { getFollowing } from "@/src/app/actions/retrievalActions";
import FollowingList from "./followingList";

interface user {
    _id: string,
    userName: string,
    fName: string,
    lName: string,
    localProfileImageUrl: string,
}
const Following = async () => {

    const following = await getFollowing();
    const followingArray = following?.following;
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

            <div className="mt-4">

                {
                    followingArray && followingArray.map((followingUser: user) => {

                        return (<div key={followingUser._id} >
                            <FollowingList {...followingUser} />
                        </div>)
                    })
                }
            </div>
        </div>
    </>)
}


export default Following;