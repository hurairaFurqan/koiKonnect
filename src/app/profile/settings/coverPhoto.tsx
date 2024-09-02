"use client"

import Image from "next/image";
import styles from "./styles.module.css"
import editButtonIcon from "@/public/icons/editButtonIcon.png"
import { useEffect, useState } from "react";
import { uplaodCoverPhotoCurrentUser } from "../../actions/_actions";


const createImagePreview = (file: File) => {
    const imageUrl = window.URL.createObjectURL(file);
    return imageUrl;
}


interface coverPhotoProps {
    coverPhoto: string,
}

const CoverPhoto: React.FC<coverPhotoProps> = (props: coverPhotoProps) => {


    const {coverPhoto} = props;
    
    
    const [file, setFile] = useState<File>();

    const [preview, setPreview] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // for strict file type
        const element = e.currentTarget as HTMLInputElement;
        let files: FileList | null = element.files;

        const { name } = e.target;

        if (files && files[0]) {
            setFile(files[0])
            const url = createImagePreview(files[0])
            setPreview(url)


            const formData = new FormData();
            formData.append("file", files[0])
            uplaodCoverPhotoCurrentUser(formData);
        }
    }

    return (<>
        <div className="rounded-xl relative" style={{ backgroundColor: "#D9D9D9", height:"10rem" }}>
            <label htmlFor="coverPhoto" className={`${styles.iconDiv} space-x-2`} >
                <Image src={editButtonIcon} alt="edit Button Icon" width={30} height={30}>
                </Image>
                <p className="text-sm" style={{ color: "#F36E39" }}>Edit Cover Picture</p>
            </label>
            <input id="coverPhoto" type="file" accept=".png, .jpg, .jpeg" onChange={(e) => handleChange(e)} className="hidden"></input>

            {coverPhoto ?
                <Image className={`${styles.Image} bg-red-500 object-cover rounded-xl`} src={coverPhoto} alt="preview Image" width={0} height={0} style={{ width: "100%", height: "100%" }} unoptimized></Image>
                : <p className="flex justify-center h-full items-center" style={{ color: "#F36E39" }}>No Cover Photo</p>
            }
        </div>
    </>)
}

export default CoverPhoto;