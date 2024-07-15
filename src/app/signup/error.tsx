"use client"
import errorIllustration from "@/public/errorIllustration.svg"
import Image from "next/image"

type ErrorProps = {
    error: Error,
    reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {

    console.log("in error class");
    

    return (<div className="bg-black flex justify-center items-center h-screen opacity-40">
        <div className="bg-white w-2/5 h-3/5 rounded-3xl p-3">
            <div>
                <div className=" mt-3 flex justify-center">
                    <Image
                        className=""
                        priority
                        src={errorIllustration}
                        alt="errorIllustration Vector"
                    />
                </div>
                <div className="flex flex-col  items-center mt-5 space-y-3">
                    <p>{error.message}</p>
                    <button className="bgOrangeColor rounded w-60 p-3" onClick={() => reset()}>Try Again</button>
                </div>
            </div>
        </div>
    </div>)
}