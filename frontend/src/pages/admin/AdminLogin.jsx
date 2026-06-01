import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShield, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { adminLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        const result = await adminLogin(email, password);
        setSubmitting(false);
        if (result.success) {
            // Check if logged-in user is actually an admin
            const stored = localStorage.getItem('quickcart_admin');
            if (stored) {
                try {
                    const admin = JSON.parse(stored);
                    if (admin.role === 'admin') {
                        navigate('/admin');
                        return;
                    }
                } catch {
                    // fall through to error
                }
            }
            // Not an admin — clear and show error
            localStorage.removeItem('quickcart_admin');
            setError('Access Denied. This portal is for administrators only.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-2xl mb-4">
                        <FiShield className="text-3xl text-accent-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
                    <p className="text-gray-500 mt-1">Sign in to manage the store</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-5">
                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                            <FiAlertCircle className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter admin email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                required
                                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    {/* Admin Demo Credentials */}
                    <div className="bg-accent-50 rounded-xl p-3 text-xs border border-accent-100">
                        <p className="font-medium text-accent-700 mb-1">Admin Credentials:</p>
                        <p className="text-accent-600">Email: admin@grocery.com</p>
                        <p className="text-accent-600">Password: admin123</p>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-3 text-base font-semibold text-white bg-accent-500 hover:bg-accent-600 rounded-xl transition-colors disabled:opacity-70"
                    >
                        {submitting ? 'Signing in...' : 'Sign In as Admin'}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Not an admin?{' '}
                        <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
                            User Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;