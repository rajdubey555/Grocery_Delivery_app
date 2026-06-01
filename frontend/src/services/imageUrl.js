/**
 * Resolves an image path to a full URL.
 * - If the path already starts with 'http' (Cloudinary URL), return as-is.
 * - Otherwise, prepend the backend base URL (without /api suffix).
 */
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';

    // Already a full URL (Cloudinary, etc.)
    if (imagePath.startsWith('http')) {
        return imagePath;
    }

    // Determine backend base URL (strip /api suffix if present)
    let baseUrl = import.meta.env.VITE_API_URL;
    if (!baseUrl && import.meta.env.PROD) {
        baseUrl = 'https://quickcart-api-1suo.onrender.com/api';
    }
    if (!baseUrl) {
        baseUrl = 'http://localhost:5000';
    }
    // Remove trailing /api (and any trailing slashes) to get the root
    baseUrl = baseUrl.replace(/\/api\/?$/, '').replace(/\/+$/, '');

    return `${baseUrl}${imagePath}`;
};