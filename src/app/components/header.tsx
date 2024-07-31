import HeaderSearch from "./headerSearch";
import inboxIcon from "@/public/inboxIcon.svg"
import notificationIcon from "@/public/notificationIcon.svg"
import Image from "next/image";
const Header = () => {
    return <>
        <div className="flex">
            <div className="w-3/4">
                <HeaderSearch></HeaderSearch>
            </div>
            <div className=" flex w-1/4 justify-end space-x-12">
                <Image src={notificationIcon} className=" " alt="Notification Icon" width={30} height={55}></Image>
                <Image src={inboxIcon} className=" " alt="Inbox Icon" width={30} height={55}></Image>
            </div>

        </div>
    </>
}


export default Header;