const cloudinary = require('../config/cloudinary');

/**
 * Uploads an image buffer to Cloudinary.
 * Returns the secure URL or null on failure.
 */
const uploadToCloudinary = async (file) => {
    if (!file) return null;

    try {
        const b64 = file.buffer.toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'quickcart/products',
            resource_type: 'image',
        });

        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error.message);
        return null;
    }
};

module.exports = uploadToCloudinary;