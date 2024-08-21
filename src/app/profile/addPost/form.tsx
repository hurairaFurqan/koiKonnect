"use client"

import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css"
import uplaodIcon from "@/public/icons/uploadIcon.svg"
import axios from "axios";
import { addPost } from "../../_actions";

const createImagePreview = (file: File) => {
    const imageUrl = window.URL.createObjectURL(file);
    return imageUrl;
}



type FormState = {
    addPostImage: File | null,
    commentPermission: boolean,
    privacyPermission: boolean,
    caption: string,
    location: string
}

const AddPostForm = () => {


    const [state, setState] = useState<FormState>({
        addPostImage: null,
        commentPermission: false,
        privacyPermission: false,
        caption: "",
        location: "",
    })


    const [response, setResponse] = useState("");


    // caption
    const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setState((values) => ({ ...values, [name]: value }))
    }
    // Location
    const [coords, setCoords] = useState({
        lat: 0,
        lng: 0,
    })

    const [addressLine2, setAddressLine2] = useState("");

    // Accessibility
    const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setState((values => ({ ...values, [name]: checked })))

        // accessibilityControls(name, checked)
    }

    // Image Drag n Drop
    const [dragActive, setDragActive] = useState<Boolean>(false);

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

            setState((values) => ({ ...values, [name]: files[0] }))
            const url = createImagePreview(files[0])
            setPreview(url)
        }
    }

    async function handleDrop(e: React.DragEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const files = e.dataTransfer.files;
        const name = "addPostImage"

        if (files && files[0]) {
            setFile(files[0]);

            setState((values) => ({ ...values, name: files[0] }))
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

    // Location
    const handleLocation = async () => {
        // const res = await accessLocation();
        if ("geolocation" in navigator) {


            try {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    setCoords({ lat, lng })

                }, (error) => {

                    console.log(error.message);

                });


                const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${coords.lat}&lon=${coords.lng}&apiKey=fa07c6916ebc439a9b842769913382f6`)

                const addressLine2 = res.data.features[0].properties.address_line2;

                const location = "location";

                if (addressLine2) {
                    setState((values) => ({ ...values, location: addressLine2 }))
                }



            } catch (error: any) {
                return error.response;
            }

        } else {
            console.log("geolocation IS NOT available");
        }
    }


    const handlePostForm = async () => {

        const formData = new FormData();
        for (const key in state) {
            const value = state[key as keyof FormState];
            if (value instanceof File || typeof value === "string" || typeof value === "boolean") {
                formData.append(key, value as Blob | string);
            }

        }

        const res = await addPost(formData)

        if (typeof res === "string") {
            setResponse(res);
            handleDiscardForm();
        }

    }

    const handleDiscardForm = () => {

        setState({
            addPostImage: null,
            commentPermission: false,
            privacyPermission: false,
            caption: "",
            location: "",
        })
        setFile(undefined)

    }
    return (<>

        <div className="h-full">
            <p className="flex justify-center text-green-700">{response}</p>
            <form className="h-full"
                onDragEnter={(e) => handleDragEnter(e)}
                onDrop={(e) => handleDrop(e)}
                onDragOver={(e) => handleDragOver(e)}
                onDragLeave={(e) => handleDragLeave(e)}
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="grid grid-cols-2 h-1/2 mt-6">
                    <div className="flex justify-center items-center">
                        <div className={`h-3/4 w-4/5 bg-white rounded-2xl`}>
                            {
                                file ?
                                    <div className="flex flex-col items-center  h-full justify-center">
                                        <div className="h-4/5 w-3/4 rounded-xl  " style={{ backgroundColor: "#F2F2F2" }}>
                                            <div className="h-full  grid grid-rows-4">
                                                <div className="row-span-3 relative">
                                                    <div className={`${styles.iconDiv} rounded-full`} onClick={removeFile}>&times;</div>
                                                    <Image className={`${styles.Image} object-cover`} src={preview} alt="preview Image" width={0} height={0} style={{ width: "100%", height: "100%" }}></Image>
                                                </div>
                                                <div className={`w-full grid grid-cols-2 rounded-bl-xl rounded-br-xl ${styles.footerInfoBar}`}>
                                                    <div className="ml-2 flex flex-col justify-center">
                                                        <p className="text-xs" style={{ color: "#5E5E5E" }}>File Name: {file.name}</p>
                                                        <p className="text-xs" style={{ color: "#5E5E5E" }}>File Size: {file.size} bytes</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className={`h-full flex flex-col items-center justify-center space-y-2 
                        ${dragActive ? "border-2 border-dashed border-orange-500 rounded-2xl" : "border-2 border-dashed rounded-2xl"}`}

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
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="p-6 h-3/4 w-4/5 border-2 border-dashed rounded-2xl">

                            <p className="text-xl tracking-wider" style={{ color: "#5E5E5E" }}>Accessibility</p>

                            <div className="h-5/6 mt-4 flex flex-col place-content-around">

                                <div className="grid grid-cols-5">
                                    <div className="col-span-4 space-y-2">
                                        <p className="text-lg tracking-wider" style={{ color: "#5E5E5E" }}>Comment</p>
                                        <p className="text-xs" style={{ color: "#646464" }}>Enable comment will allow you to comment</p>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center">

                                        <label htmlFor="commentPermission" className="flex cursor-pointer relative w-16 h-8 rounded-full" style={{ backgroundColor: "#B1A9A6" }}>
                                            <input type="checkbox" name="commentPermission" id="commentPermission" checked={state.commentPermission || false} onChange={(e) => onChangeHandle(e)} className="sr-only peer"></input>
                                            <span className="w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-1
             peer-checked:bg-orange-600 peer-checked:left-9 transition-all duration-500"></span>
                                        </label>
                                    </div>

                                </div>
                                <div className="grid grid-cols-5">
                                    <div className="col-span-4 space-y-2">
                                        <p className="text-lg tracking-wider" style={{ color: "#5E5E5E" }}>Privacy</p>
                                        <p className="text-xs" style={{ color: "#646464" }}>Enable you to hide/show post to specific people</p>
                                    </div>
                                    <div className="col-span-1 flex items-center justify-center">

                                        <label htmlFor="privacyPermission" className="flex cursor-pointer relative w-16 h-8 rounded-full" style={{ backgroundColor: "#B1A9A6" }}>
                                            <input type="checkbox" name="privacyPermission" id="privacyPermission" checked={state.privacyPermission || false} onChange={(e) => onChangeHandle(e)} className="sr-only peer"></input>
                                            <span className="w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-1
             peer-checked:bg-orange-600 peer-checked:left-9 transition-all duration-500"></span>
                                        </label>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" flex justify-center h-2/4">
                    <div className=" rounded-xl border-black border p-4 flex flex-col justify-between" style={{ width: "90%" }}>
                        <div>
                            Create a new Post
                        </div>
                        <div className="">
                            <textarea className={`${styles.textarea}`} placeholder="Write a caption..." name="caption" value={state.caption || ""} onChange={(e) => handleCaptionChange(e)}></textarea>
                        </div>
                        <div onClick={handleLocation}>
                            <input className={styles.locationInput} value={state.location || ""} readOnly placeholder="Location"></input>
                        </div>
                        <div className="p-4 flex justify-end space-x-20">
                            <button className={`${styles.discardButton}`} onClick={handleDiscardForm}>Discard</button>
                            <button onClick={handlePostForm} className={`${styles.postButton}`}>Post</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>




    </>)
}

export default AddPostForm;