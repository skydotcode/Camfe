require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary : cloudinary,
  params: {
    folder: 'campus-eats',        // folder name in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],  // only allow images
  },
});

// multer handles the file from the request and passes it to cloudinary
const upload = multer({
  storage,
  // limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max file size
});

module.exports = {
    cloudinary , 
    storage,
    upload,
};