
import Image from "next/image";
import Link from "next/link";
import PostModal from "./[postId]/page";
import styles from "./styles.module.css"

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
    const { imageURL, _id } = props;
    return (<>
        <div className=""  >

            <Link href={`/profile/settings/${_id}?modal=true`}>
                <Image src={imageURL} alt="picture" width={200} height={200}></Image>
            </Link>
            {
                modal && <PostModal />
            }
        </div>
    </>)
}

export default PostSection;