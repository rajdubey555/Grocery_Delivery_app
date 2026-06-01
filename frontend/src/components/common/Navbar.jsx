import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiPackage, FiSearch, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, logout, isAdmin } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/products?search=${searchTerm.trim()}`);
            setSearchTerm('');
            setMobileOpen(false);
        }
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                        <FiShoppingCart className="text-3xl text-primary-500" />
                        <span className="text-2xl font-extrabold text-primary-600">
                            Quick<span className="text-accent-500">Cart</span>
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search for groceries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 text-sm"
                            />
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </form>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-5">
                        <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium text-sm">
                            Products
                        </Link>
                        <Link to="/categories" className="text-gray-600 hover:text-primary-600 font-medium text-sm">
                            Categories
                        </Link>

                        {user ? (
                            <>
                                <Link to="/cart" className="relative text-gray-600 hover:text-primary-600">
                                    <FiShoppingCart className="text-xl" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-2 -right-3 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                                <Link to="/my-orders" className="text-gray-600 hover:text-primary-600">
                                    <FiPackage className="text-xl" />
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
                                        <FiUser className="text-xl" />
                                        <span className="text-sm font-medium">{user.name?.split(' ')[0]}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                            My Profile
                                        </Link>
                                        <Link to="/my-orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                                            My Orders
                                        </Link>
                                        {isAdmin && (
                                            <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-accent-500 hover:bg-accent-50 font-medium">
                                                <FiSettings size={14} /> Admin Panel
                                            </Link>
                                        )}
                                        <hr className="my-1" />
                                        <button
                                            onClick={logout}
                                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                                        >
                                            <FiLogOut /> Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Link to="/login" className="btn-primary text-sm px-6 py-2">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu toggle */}
                    <div className="flex md:hidden items-center gap-3">
                        {user && (
                            <Link to="/cart" className="relative text-gray-600">
                                <FiShoppingCart className="text-xl" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-accent-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-600">
                            {mobileOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-100 pt-4">
                        <form onSubmit={handleSearch} className="mb-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for groceries..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-primary-400 text-sm"
                                />
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                        </form>
                        <div className="space-y-2">
                            <Link to="/products" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg">
                                Products
                            </Link>
                            <Link to="/categories" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg">
                                Categories
                            </Link>
                            {user ? (
                                <>
                                    <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg">
                                        My Profile
                                    </Link>
                                    <Link to="/my-orders" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-gray-600 hover:bg-primary-50 rounded-lg">
                                        My Orders
                                    </Link>
                                    {isAdmin && (
                                        <Link to="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-accent-500 font-medium hover:bg-accent-50 rounded-lg">
                                            <FiSettings size={14} /> Admin Panel
                                        </Link>
                                    )}
                                    <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-primary-600 font-medium hover:bg-primary-50 rounded-lg">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;