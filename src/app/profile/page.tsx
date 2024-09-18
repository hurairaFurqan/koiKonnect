import React from 'react'
import { getAllPosts } from '../actions/retrievalActions';
import PostContent from './postContent';
import styles from "./styles.module.css"
interface User {
    _id: string;
    fName: string;
    lName: string;
    userType: string;
    userName: string,

    localProfileImageUrl: string,
}

interface post {
    _id: string;
    imageURL: string;
    userId: User;
    postCaption: string,

}


const Profile = async () => {


    const posts = await getAllPosts();




    return <>
        <div className='flex p-6'>
            <div className='text-3xl font-smemiBold	'>Feed</div>
        </div>
        <div className={` ${styles.postsContainer}`}>
            {posts && posts.map((post: post) => (
                <div key={post._id} >
                    <PostContent post={post} />
                </div>
            ))}
        </div>


    </>
}

export default Profile