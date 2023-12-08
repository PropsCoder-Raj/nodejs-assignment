require("dotenv").config()
const cloudinary = require('cloudinary');

cloudinary.config({
  "cloud_name": process.env.CLOUDNARY_CLOUD_NAME,
  "api_key": process.env.CLOUDNARY_API_KEY,
  "api_secret": process.env.CLOUDNARY_API_SECRET,
});

exports.getBase64ToSecureUrl = async (base64) => {
    var result = await cloudinary.v2.uploader.upload(base64, { resource_type: "auto" });
    return result.secure_url;
}