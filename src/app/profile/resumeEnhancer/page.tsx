import Image from "next/image"
import underDevelopment from "@/public/icons/underDevelopmentIllustration.svg"
const ResumeEnhancer = () => {
    return <>
        <div className="flex justify-center align-center ">

            <Image src={underDevelopment} alt="under development" width={500} height={500} className="mt-14"></Image>
        </div>
    </>
}

export default ResumeEnhancer