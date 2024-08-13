"use client"
import { useFormState, useFormStatus } from "react-dom"
import styles from "./styles.module.css"
import { userUpdatedDetails } from "@/src/app/_actions"
import React from "react"

const initialState = {
    successMessage: "",
    errorMessage: "",
}


interface userInfoProps {
    userName: string,
    fName: string,
    lName: string,
    userType: string,
    userBio: string,
}


function SubmitButton() {
    const { pending } = useFormStatus();
    return (<>
        {pending ?
            <div className="flex items-center place-content-around space-x-2 border-2 rounded-lg borderOrange p-1">
                <div className={styles.loader}></div>
                <div className="text-medium orangeColor">Updating details</div>
            </div>
            :
            <button className={`${styles.formSubmitButton} p-2 w-fit`}>Save Changes</button>
        }
    </>)
}

const UserProfileForm: React.FC<userInfoProps> = (props: userInfoProps) => {

    const { userName, fName, lName, userType, userBio } = props;
    const [state, setState] = useFormState(userUpdatedDetails, initialState)
    return <>
        <div className="mt-4 ml-6 h-full">
            <form action={setState} id="userForm" className="h-full">
                <div className="flex flex-col justify-between h-full">
                    <div className="flex place-content-between">
                        <div className="flex flex-col">
                            <label className={styles.label}>
                                First Name
                            </label>
                            <input name="firstName" className={styles.firstNameInput} defaultValue={fName || ""}></input>
                        </div>
                        <div className="flex flex-col w-5/12">
                            <label className={styles.label}>
                                Last Name
                            </label>
                            <input name="lastName" className={styles.lastNameInput} defaultValue={lName || ""}></input>
                        </div>
                    </div>
                    <div>
                        <label className={styles.label}>
                            User Name
                        </label>
                        <input name="userName" className={styles.userNameInput} defaultValue={userName || ""}></input>
                    </div>
                    <div>
                        <label className={styles.label}>
                            Status
                        </label>
                        <select className={styles.userStatus} name="userType" defaultValue={userType}>
                            <option value={"student"}>Student</option>
                            <option value={"teacher"}>Teacher</option>
                            <option value={"graduate"}>Graduate</option>
                        </select>
                    </div>

                    <div>
                        <label className={styles.label}>
                            Bio
                        </label>
                        <input name="userBio" className={styles.userBio} defaultValue={userBio || ""}>
                        </input>
                    </div>

                    <div className="flex place-content-end space-x-6">
                        <div className="content-center">
                            {state.successMessage && <div className="text-green-700">{state.successMessage}</div>}
                        </div>

                        <SubmitButton />
                        {/* <button className={`${styles.formSubmitButton} p-2 w-fit`} type="submit">
                            Save Changes
                        </button> */}
                    </div>

                </div>
            </form>
        </div>
    </>
}

export default UserProfileForm;