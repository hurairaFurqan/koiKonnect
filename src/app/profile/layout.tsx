import React from "react";
import SideBar from "../components/sidebar";
import Header from "../components/header";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="grid grid-cols-8 h-screen">
                <div className="col-span-2">
                    <SideBar></SideBar>
                </div>
                <div className="col-span-6 p-6   ">
                    <div className="bg-slate-400">

                        <Header></Header>
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </>
    )
}