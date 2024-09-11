import Link from "next/link"
import styles from "./styles.module.css"
import { useParams, useRouter } from "next/navigation"
import { postRetrieval } from "@/src/app/actions/retrievalActions"
import { useEffect } from "react"
import PostContent from "./postContent"


const PostModal = async () => {



    return <>
        <div className="inset-0 fixed bg-gray-900 bg-opacity-50 z-50">

            <Link href={"/profile/settings/"} className="flex justify-end p-4 cursor-pointer">&#x2715;</Link>
            <div className="flex justify-center content-center h-4/5 ">
                <div className="bg-white w-3/5 h-full">
                    <PostContent />
                </div>
            </div>
        </div>
    </>
}

export default PostModal;