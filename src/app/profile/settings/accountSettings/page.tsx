import UserImageUpdate from "./userImageChange";
import UserProfileForm from "./userProfileForm";
export default function AccountSetting() {
    return <>
        <div className=" h-full">

            <UserImageUpdate />
            <UserProfileForm />
        </div>
    </>
}