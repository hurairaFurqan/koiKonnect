"use client"
import Image from "next/image"
import profileIcon from "@/public/icons/profileIcon.svg"
import styles from "./styles.module.css"
import React from "react"
import { useFormState } from "react-dom"
import { userProfileImage, deleteProfileImage } from "@/src/app/_actions"


const initialState = {
    successMessage: "",
    errorMessage: "",
}

interface UserImageUpdateProps {
    profileUrl: string,
}


const UserImageUpdate: React.FC<UserImageUpdateProps> = (props: UserImageUpdateProps) => {

    const [file, setFile] = useFormState(userProfileImage, initialState);

    const { profileUrl } = props;

    const handleDelete = () => {
        deleteProfileImage(profileUrl);
    }

    return (
        <>
            <div className="flex items-center">
                <div className="ml-4 space-y-2 flex flex-col items-center w-fit">
                    <p className="text-xs text-gray-500">Profile Picture</p>
                    <Image className="rounded-full w-24 h-24  border border-orange-500 object-cover"
                        src={file.successMessage || profileUrl || profileIcon} alt="user profile avatar"
                        width={22} height={24} unoptimized></Image>
                </div>


                <div>{file.errorMessage || ""}</div>

                <form action={setFile} className="flex items-center place-content-around mt-2 w-3/5 ml-12">


                    <label htmlFor="file-upload" className={styles.imageLabel}>Browse your computer</label>
                    <input className={styles.fileUpload} id="file-upload" accept=".png, .jpg, .jpeg" type="file"
                        name="profileImage" ></input>

                    <button className={`${styles.imageButton}`} type="submit">Upload Picture</button>
                </form>
                <div className="mt-2">
                    <button className={`${styles.deleteButton}`} onClick={handleDelete}> Delete Picture</button>
                </div>
            </div>
        </>)
}


export default UserImageUpdate;