import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('quickcart_user');
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem('quickcart_user');
            }
        }
        setLoading(false);
    }, []);

    // Register
    const register = async (formData) => {
        try {
            const { data } = await API.post('/auth/register', formData);
            localStorage.setItem('quickcart_user', JSON.stringify(data));
            setUser(data);
            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            const msg = error.response?.data?.message || 'Registration failed';
            toast.error(msg);
            return { success: false, message: msg };
        }
    };

    // Login
    const login = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('quickcart_user', JSON.stringify(data));
            setUser(data);
            toast.success('Login successful!');
            return { success: true };
        } catch (error) {
            const msg = error.response?.data?.message || 'Login failed';
            toast.error(msg);
            return { success: false, message: msg };
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('quickcart_user');
        setUser(null);
        toast.success('Logged out successfully');
    };

    // Update profile
    const updateProfile = async (profileData) => {
        try {
            const { data } = await API.put('/auth/profile', profileData);
            const updated = { ...user, name: data.name, mobile: data.mobile };
            localStorage.setItem('quickcart_user', JSON.stringify(updated));
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

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, login, register, logout, updateProfile, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);