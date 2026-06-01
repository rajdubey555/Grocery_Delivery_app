import axios from 'axios';

// Determine base URL for API calls
// In development: uses Vite proxy (/api → localhost:5000/api)
// In production: uses the Render backend URL
const getBaseURL = () => {
    // If an env var is explicitly set, use it
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    // In production (Netlify), use the hardcoded Render URL
    if (import.meta.env.PROD) {
        return 'https://quickcart-api-1suo.onrender.com/api';
    }
    // In development, use the Vite proxy
    return '/api';
};

const API = axios.create({
    baseURL: getBaseURL(),
});

// Attach token to every request
API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('quickcart_user') || 'null');
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default API;