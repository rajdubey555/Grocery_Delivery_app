import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShoppingCart, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        const result = await login(email, password);
        setSubmitting(false);
        if (result.success) {
            // Check if logged-in user is actually an admin
            const stored = localStorage.getItem('quickcart_user');
            if (stored) {
                try {
                    const u = JSON.parse(stored);
                    if (u.role === 'admin') {
                        logout(); // properly clear user state from AuthContext
                        setError('This portal is for customers only. Please use the Admin Portal.');
                        return;
                    }
                } catch { /* ignore */ }
            }
            navigate('/');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <FiShoppingCart className="text-4xl text-primary-500" />
                        <span className="text-3xl font-extrabold text-primary-600">
                            Quick<span className="text-accent-500">Cart</span>
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 mt-6">Welcome Back!</h1>
                    <p className="text-gray-500 mt-1">Login to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
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
                                placeholder="Enter your password"
                                required
                                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
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

                    {/* Demo Credentials */}
                    <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500">
                        <p className="font-medium text-gray-700 mb-1">Demo Credentials:</p>
                        <p>User: rahul@gmail.com / rahul123</p>
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full py-3 text-base disabled:opacity-70"
                    >
                        {submitting ? 'Logging in...' : 'Login'}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;