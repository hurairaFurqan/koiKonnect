"use client"


import filledLikeIcon from "@/public/icons/filledLikeIcon.svg"
import filledSaveIcon from "@/public/icons/filledSaveIcon.svg"
import outlineLikeIcon from "@/public/icons/outlineLikeIcon.svg"
import outlineSaveIcon from "@/public/icons/outlineSaveIcon.svg"
import commentIcon from "@/public/icons/commentIcon.svg"
import shareIcon from "@/public/icons/shareIcon.svg"
import Image from "next/image"
const InteractiveButtons = () => {
    return <>
        <div>
            <div className="flex  space-x-4">


                <label htmlFor="likeButton" className="flex  ml-2 cursor-pointer"  >

                    <Image className="w-8 h-8" src={outlineLikeIcon} alt="outlineLikeIcon"></Image>

                </label>
                <input id="likeButton" type="checkbox" hidden>
                </input>
                <button>
                    <Image className="w-10 h-10" src={commentIcon} alt="commentIcon"></Image>

                </button>
                <button>
                    <Image className="w-8 h-8" src={shareIcon} alt="shareIcon"></Image>

                </button>

                <button className=" w-full flex  justify-end">
                    <Image className="w-6 h-6 mt-2 " style={{ marginRight: ".5rem" }} src={outlineSaveIcon} alt="outlineSaveIcon"></Image>
                </button>


            </div>
        </div>
    </>
}

export default InteractiveButtons;