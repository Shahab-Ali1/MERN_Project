import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.COLUDINARY_CLOUD_NAME,
    api_key: process.env.COLUDINARY_API_KEY,
    api_secret: process.env.COLUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        }
        );
        // fs.unlink(localFilePath);

        return response;
    } catch (error) {
        fs.unlink(localFilePath);
        return null;
    }
}

export { uploadOnCloudinary };
