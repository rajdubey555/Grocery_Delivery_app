const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'Root',
    api_key: process.env.CLOUDINARY_API_KEY || '218521675735499',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'ueiS0zphiUPBPk0hg6S3b5BwF7c',
});

module.exports = cloudinary;