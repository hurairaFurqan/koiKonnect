import Image from "next/image";
import jobsNotAvailable from "@/public/jobsNotAvailableIllustration.svg"
export default function Jobs() {
    return <>
        <div className="flex justify-center align-center ">

            <Image src={jobsNotAvailable} alt="under development"  className="mt-20"></Image>
        </div>
    </>
}

