import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true,
})

export default async function uploadImageCloudinary(imagePath: any) {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    }

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        // console.log(result.secure_url);
        return result.secure_url;
    } catch (error: any) {
        console.log(error);

    }
}
