require("dotenv").config();

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "svg"],
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 23 * 1024 + 1024,
  },
});

const deleteFromCloduinary = async (publicFileId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicFileId);
    console.log("Deleted", result);
  } catch (error) {
    console.error("deleting error", error);
  }
};

module.exports = { upload, deleteFromCloduinary };
