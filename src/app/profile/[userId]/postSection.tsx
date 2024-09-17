
import Image from "next/image";
import Link from "next/link";
import PostModal from "./[postId]/page";
import styles from "./styles.module.css"
import { openModal } from "../../constants/constants";

interface post {
    _id: string,
    postCaption: string,
    location: string,
    imageURL: string,
    commentPermission: boolean,
    privacyPermission: boolean,
    userId: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
}

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
}

const PostSection: React.FC<post> = async (props: post, SearchParamProps) => {

    const { searchParams } = SearchParamProps || false;
    const modal = searchParams?.modal;
    const { imageURL, _id, userId } = props;

    const postId = _id;
    
    
    return (<>
        <div className=""  >

            <Link href={`/profile/${userId}/${_id}?${openModal.query}`}>
                <Image src={imageURL} alt="picture" width={200} height={200}></Image>
            </Link>
            {
                modal && <PostModal params= {{userId, postId}}/>
            }
        </div>
    </>)
}

export default PostSection;