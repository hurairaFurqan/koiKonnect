"use client"
import { useFormState } from "react-dom"
import styles from "./styles.module.css"
import { addUserUpdatedDetails } from "@/src/app/_actions"

const initialState = {
    successMessage: "",
    errorMessage: "",
}
export default function UserProfileForm() {
    const [state, setState] = useFormState(addUserUpdatedDetails, initialState)
    return <>
        <div className="mt-4 ml-6">
            <form>
                <div className="flex flex-col content-evenly">
                    <div className="flex place-content-between">
                        <div className="flex flex-col">
                            <label className={styles.label}>
                                First Name
                            </label>
                            <input name="firstName" className={styles.firstNameInput}></input>
                        </div>
                        <div className="flex flex-col w-5/12">
                            <label className={styles.label}>
                                Last Name
                            </label>
                            <input name="lastName" className={styles.lastNameInput}></input>
                        </div>
                    </div>
                    <div>
                        <label className={styles.label}>
                            User Name
                        </label>
                        <input name="userName" className={styles.userNameInput}></input>
                    </div>
                    <div>
                        <label className={styles.label}>
                            Status
                        </label>
                        <select className={styles.userStatus} name="userType" >
                            <option value={"student"}>Student</option>
                            <option value={"teacher"}>Teacher</option>
                            <option value={"graduate"}>Graduate</option>
                        </select>
                    </div>

                    <div>
                        <label className={styles.label}>
                            About me
                        </label>
                        <textarea name="userBio" className={styles.userBio}>
                        </textarea>
                    </div>

                    <div className="flex place-content-end">

                        <button className={`${styles.formSubmitButton} p-2 w-fit`} type="submit">
                            Save Changes
                        </button>
                    </div>

                </div>
            </form>
        </div>
    </>
}