import { userProfileImageRetrevial } from "@/src/app/_actions";
import UserImageUpdate from "./userImageChange";
import UserProfileForm from "./userProfileForm";




export default async function AccountSetting() {
    const profileUrl = await userProfileImageRetrevial();


    return <>
        <div className=" h-full">

            <UserImageUpdate profileUrl={profileUrl}></UserImageUpdate>
            <UserProfileForm />
        </div>
    </>
}