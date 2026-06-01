import axios from 'axios';

// In production (Netlify), use the full Render backend URL
// In development, use relative /api path (proxied by Vite)
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const API = axios.create({
    baseURL: BASE_URL,
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