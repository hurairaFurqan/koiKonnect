import Image from "next/image";
import React from "react";
import SignupVector from '@/public/SignupVector.svg';

import AddForm from "./addfrom";

const signUp = () => {
    return (<>
        <div className="grid grid-cols-2">
            <div className=" p-4 pt-20">
                <div className="orangeColor font-bold text-6xl text-center ">
                    Welcome to club of
                    <div className="">
                        KOI KONNECT
                    </div>
                </div>
                <div className="orangeColor font-medium  text-center mt-4">
                    Join the conversation!  Sign up now to connect,
                    <div>
                        share, and discover with our vibrant community.
                    </div>
                </div>
                <div className=" mt-3 flex justify-center">
                    <Image
                        className=""
                        priority
                        src={SignupVector}
                        alt="Sign Up Vector"
                        height={450}
                        width={450}
                    />
                </div>
            </div>
            <div className="grid place-items-center">
                <div className=" rounded-md bg-gray-100 w-4/5 ">
                    <AddForm/>
                </div>
            </div>
        </div>
    </>)
}

export default signUp;