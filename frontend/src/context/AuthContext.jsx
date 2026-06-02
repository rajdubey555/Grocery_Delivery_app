import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Separate localStorage keys for user and admin sessions
const USER_KEY = 'quickcart_user';
const ADMIN_KEY = 'quickcart_admin';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);           // customer session
    const [adminUser, setAdminUser] = useState(null); // admin session
    const [loading, setLoading] = useState(true);

    // Load both sessions from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem(USER_KEY);
        const storedAdmin = localStorage.getItem(ADMIN_KEY);
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem(USER_KEY);
            }
        }
        if (storedAdmin) {
            try {
                setAdminUser(JSON.parse(storedAdmin));
            } catch {
                localStorage.removeItem(ADMIN_KEY);
            }
        }
        setLoading(false);
    }, []);

    // Register (always creates a customer account)
    const register = async (formData) => {
        try {
            const { data } = await API.post('/auth/register', formData);
            localStorage.setItem(USER_KEY, JSON.stringify(data));
            setUser(data);
            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            const msg = error.response?.data?.message || 'Registration failed';
            toast.error(msg);
            return { success: false, message: msg };
        }
    };

    // User Login (stores in quickcart_user, keeps admin session intact)
    const login = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem(USER_KEY, JSON.stringify(data));
            setUser(data);
            toast.success('Login successful!');
            return { success: true };
        } catch (error) {
            const msg = error.response?.data?.message || 'Login failed';
            toast.error(msg);
            return { success: false, message: msg };
        }
    };

    // Admin Login (stores in quickcart_admin, keeps user session intact)
    const adminLogin = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem(ADMIN_KEY, JSON.stringify(data));
            setAdminUser(data);
            toast.success('Admin login successful!');
            return { success: true };
        } catch (error) {
            const msg = error.response?.data?.message || 'Login failed';
            toast.error(msg);
            return { success: false, message: msg };
        }
    };

    // User Logout
    const logout = () => {
        localStorage.removeItem(USER_KEY);
        setUser(null);
        toast.success('Logged out successfully');
    };

    // Admin Logout
    const adminLogout = () => {
        localStorage.removeItem(ADMIN_KEY);
        setAdminUser(null);
        toast.success('Admin logged out successfully');
    };

    // Update profile
    const updateProfile = async (profileData) => {
        try {
            const { data } = await API.put('/auth/profile', profileData);
            const updated = { ...user, name: data.name, mobile: data.mobile };
            localStorage.setItem(USER_KEY, JSON.stringify(updated));
            setUser(updated);
            toast.success('Profile updated!');
            return { success: true };
        } catch (error) {
            toast.error('Failed to update profile');
            return { success: false };
        }
    };

    // Change password
    const changePassword = async (currentPassword, newPassword) => {
        try {
            await API.put('/auth/change-password', { currentPassword, newPassword });
            toast.success('Password changed!');
            return { success: true };
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to change password');
            return { success: false };
        }
    };

    const isAdmin = adminUser?.role === 'admin';

    return (
        <AuthContext.Provider value={{
            user, adminUser, loading, isAdmin,
            login, adminLogin, logout, adminLogout,
            register, updateProfile, changePassword,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);