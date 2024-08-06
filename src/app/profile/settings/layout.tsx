import Image from "next/image"
import searchIcon from "@/public/searchIcon.svg"
import styles from "./styles.module.css"
import SettingsSideBar from "../../components/settingsSideBar"
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <h1 className="text-2xl	mt-6">Profile</h1>
            <div className={`${styles.base} flex flex-col mt-2 p-5`}>
                <div className="flex justify-between w-1/4">
                    <p>Settings</p>
                    <Image src={searchIcon} className="" alt="search Icon" width={22} height={22}></Image>
                </div>

                <div className="grid grid-cols-4 mt-6">
                    <div className="">
                        <SettingsSideBar/>
                    </div>
                    <div className="bg-blue-500 col-span-3 ml-5">
                        <main className="">{children}</main>
                    </div>
                </div>

                <div className={styles.verticalLine}></div>
                <div className={`${styles.horizontalLine}`}></div>
            </div>
        </>
    )
}