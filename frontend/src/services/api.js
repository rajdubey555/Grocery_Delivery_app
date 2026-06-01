import axios from 'axios';

// Determine base URL for API calls
// In development: uses Vite proxy (/api → localhost:5000/api)
// In production: uses the Render backend URL
const getBaseURL = () => {
    let url = import.meta.env.VITE_API_URL;

    // In production, fall back to hardcoded URL if no env var is set
    if (!url && import.meta.env.PROD) {
        url = 'https://quickcart-api-1suo.onrender.com/api';
    }

    // In development, use the Vite proxy
    if (!url) {
        return '/api';
    }

    // Ensure the URL ends with /api (in case the user sets it without /api)
    if (!url.endsWith('/api')) {
        url = url.replace(/\/+$/, '') + '/api';
    }

    return url;
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