import Image from 'next/image'
import React, { useState } from 'react'
import Intersect from "@/public/icons/Intersect.png"
import LoginForm from "./form";

const login = () => {
    return <>
        <div className='grid grid-cols-7'>
            <div className='h-screen col-span-4' >
                <Image src={Intersect} alt='login svg' className='h-full  object-cover'></Image>
            </div>
            <div className='col-span-3'>
                <LoginForm></LoginForm>
            </div>
        </div>
    </>
}

export default login