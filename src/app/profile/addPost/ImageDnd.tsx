"use client"

import React, { useRef, useState } from "react"
import uplaodIcon from "@/public/icons/uploadIcon.svg"
import Image from "next/image";

import { accessibilityControls } from "@/src/app/actions/_actions";
import styles from "./styles.module.css"


const initialState = {
    successMessage: "",
    errorMessage: "",
}

const createImagePreview = (file: File) => {
    const imageUrl = window.URL.createObjectURL(file);
    return imageUrl;
}

const ImageDnd = () => {

    // Image Drag n Drop
    const [dragActive, setDragActive] = useState<Boolean>(false);

    const [file, setFile] = useState<File>();

    const [preview, setPreview] = useState("");
    const [responseData, setResponseData] = useState<String>("");

    const [responseFlag, setFlag] = useState<Boolean>(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        // for strict file type
        const element = e.currentTarget as HTMLInputElement;
        let files: FileList | null = element.files;

        if (files && files[0]) {
            setFile(files[0])
            const url = createImagePreview(files[0])
            setPreview(url)
        }
    }

    async function handleSubmitFile() {
        // server logic

        if (file) {

            setFlag(true);
            const formData = new FormData();
            formData.append("addPostImage", file);

            // const res = await addPostImage(formData)
            // console.log(res);
            // setResponseData(res);

            setFlag(false);
        }
    }

    async function handleDrop(e: React.DragEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const files = e.dataTransfer.files;

        if (files && files[0]) {
            setFile(files[0]);
            const url = createImagePreview(files[0])
            setPreview(url)
        }
    }

    function handleDragLeave(e: React.DragEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }

    function handleDragOver(e: React.DragEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function handleDragEnter(e: React.DragEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }

    function removeFile() {
        setFile(undefined);
        setPreview("");
        // revalidatePath("/")
    }

    return (<>
        <div className={`h-3/4 w-4/5 bg-white  rounded-2xl`}>
            {
                file ?
                    <div className="flex flex-col items-center  h-full justify-center">
                        <div className="h-4/5 w-3/4 rounded-xl  " style={{ backgroundColor: "#F2F2F2" }}>
                            <div className="h-full  grid grid-rows-4">
                                <div className="row-span-3 relative">
                                    <div className={`${styles.iconDiv} rounded-full`} onClick={removeFile}>&times;</div>
                                    <Image className={`${styles.Image} object-cover`} src={preview} alt="preview Image" width={0} height={0}  style={{ width: "100%", height: "100%" }}></Image>
                                </div>


                                {/* for image
                                style={{ width: "100%", height: "100%" }} */}
                                <div className={`w-full grid grid-cols-2 rounded-bl-xl rounded-br-xl ${styles.footerInfoBar}`}>
                                    <div className="ml-2 flex flex-col justify-center">
                                        <p className="text-xs" style={{ color: "#5E5E5E" }}>File Name: {file.name}</p>
                                        <p className="text-xs" style={{ color: "#5E5E5E" }}>File Size: {file.size} bytes</p>
                                    </div>

                                    <div className="flex justify-end mr-2 items-center">
                                        {responseFlag === true ? <p className="text-green-500 text-xs">{responseData}</p> :
                                            <button onClick={handleSubmitFile} className={`${styles.imageUploadButton}`}>Upload Image</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :


                    <form className={`h-full flex flex-col items-center justify-center space-y-2 
                        ${dragActive ? "border-2 border-dashed border-orange-500 rounded-2xl" : "border-2 border-dashed rounded-2xl"}`}
                        onDragEnter={(e) => handleDragEnter(e)}
                        onDrop={(e) => handleDrop(e)}
                        onDragOver={(e) => handleDragOver(e)}
                        onDragLeave={(e) => handleDragLeave(e)}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <Image src={uplaodIcon} alt="upload icon" width={80} height={1}></Image>

                        <input
                            placeholder="fileInput"
                            style={{ display: "none" }}
                            id="fileUpload"
                            name="addPostImage"
                            type="file"
                            onChange={(e) => handleChange(e)}
                            accept=".png, .jpeg, .jpg"
                        >
                        </input>
                        <div className="text-gray-500 text-xl">Drag &amp; Drop your images here</div>
                        <label htmlFor="fileUpload" className="text-gray-500 italic text-lg" >or <u>browse</u> your computer</label>

                    </form>

            }
        </div>
    </>)
}


export default ImageDnd