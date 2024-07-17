require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const extractPublicId = (url) => {
  const parts = url.split("/");
  const filename = parts.pop().split(".")[0];
  return filename;
};

const deleteImageByUrl = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
};

module.exports = { extractPublicId, deleteImageByUrl };
