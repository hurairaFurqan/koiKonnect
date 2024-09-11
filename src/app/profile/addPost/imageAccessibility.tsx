"use client"

import React, { useState } from "react"
import { accessibilityControls } from "@/src/app/actions/_actions"


interface ToggleSwitch {
    privacyPermission: false,
    commentPermission: false,
}

const ImageAccessibility = () => {

    const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        accessibilityControls(name, checked)
    }

    return (<>
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
                            <input type="checkbox" name="commentPermission" id="commentPermission" onChange={(e) => onChangeHandle(e)} className="sr-only peer"></input>
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
                            <input type="checkbox" name="privacyPermission" id="privacyPermission" onChange={(e) => onChangeHandle(e)} className="sr-only peer"></input>
                            <span className="w-2/5 h-4/5 bg-white absolute rounded-full left-1 top-1
                         peer-checked:bg-orange-600 peer-checked:left-9 transition-all duration-500"></span>
                        </label>
                    </div>

                </div>
            </div>
        </div>
    </>)
}

export default ImageAccessibility