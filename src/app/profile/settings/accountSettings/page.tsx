import { userInfoRetrieval } from "@/src/app/actions/_actions";
import UserImageUpdate from "./userImageChange";
import UserProfileForm from "./userProfileForm";




export default async function AccountSetting() {
    const userInfo = await userInfoRetrieval();

    const profileUrl = userInfo?.localProfileImageUrl || "";
    return <>
        <div className="h-full">

            <div className=" h-1/4">
                <UserImageUpdate profileUrl={profileUrl} />
            </div>
            <div className=" h-3/4">
                <UserProfileForm {...userInfo} />
            </div>
        </div>
    </>
}