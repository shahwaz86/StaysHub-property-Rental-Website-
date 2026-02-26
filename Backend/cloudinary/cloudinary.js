const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadToCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try{

        if(!filePath){
            return null;
        }
        const result = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return result.secure_url;

    }catch(err){
        fs.unlinkSync(filePath);
        console.error("Cloudinary Upload Error:", err);
        throw new Error("Failed to upload image to Cloudinary");
    }
}

module.exports = uploadToCloudinary;
