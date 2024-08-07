import React from "react";
import SideBar from "../components/sidebar";
import Header from "../components/header";
import styles from "./styles.module.css"

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <div className="grid grid-cols-8 h-screen">
                <div className="col-span-2">
                    <SideBar></SideBar>
                </div>
                <div className="col-span-6 p-6">
                    <div className={`${styles.rightBase} p-6`} >
                        <Header></Header>
                        <main className={styles.main}>{children}</main>
                    </div>
                </div>
            </div>
        </>
    )
}