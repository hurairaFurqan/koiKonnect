
import Link from "next/link"
import styles from "./styles.module.css"
import Image from "next/image"
import { linkHrefSlugs } from "@/src/app/constants/constants"
import SearchBar from "./searchBar"
import backIcon from "@/public/icons/backIcon.svg"
import { getFollowers } from "@/src/app/actions/retrievalActions"
import FollowerList from "./followerList"


interface user {
    _id: string,
    userName: string,
    fName: string,
    lName: string,
    localProfileImageUrl: string,
}
const Followers = async () => {
    const followers = await getFollowers();
    const followersArray = followers?.followers;


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

            <div className="mt-4">

                {
                    followersArray && followersArray.map((follower: user) => {

                        return (<div key={follower._id} >
                            <FollowerList {...follower} />
                        </div>)
                    })
                }
            </div>
        </div>
    </>)
}


export default Followers