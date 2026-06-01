import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiTwitter, FiFacebook, FiShoppingCart, FiHeart } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <FiShoppingCart className="text-3xl text-primary-400" />
                            <span className="text-2xl font-extrabold text-white">
                                Quick<span className="text-primary-400">Cart</span>
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Your one-stop destination for fresh groceries delivered to your doorstep in minutes. Quality products at the best prices.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                                <FiFacebook />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                                <FiTwitter />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">
                                <FiInstagram />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                            <li><Link to="/products" className="hover:text-primary-400 transition-colors">Products</Link></li>
                            <li><Link to="/categories" className="hover:text-primary-400 transition-colors">Categories</Link></li>
                            <li><Link to="/cart" className="hover:text-primary-400 transition-colors">Cart</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products?category=Fruits" className="hover:text-primary-400 transition-colors">Fruits</Link></li>
                            <li><Link to="/products?category=Vegetables" className="hover:text-primary-400 transition-colors">Vegetables</Link></li>
                            <li><Link to="/products?category=Dairy" className="hover:text-primary-400 transition-colors">Dairy</Link></li>
                            <li><Link to="/products?category=Bakery" className="hover:text-primary-400 transition-colors">Bakery</Link></li>
                            <li><Link to="/products?category=Snacks" className="hover:text-primary-400 transition-colors">Snacks</Link></li>
                            <li><Link to="/products?category=Beverages" className="hover:text-primary-400 transition-colors">Beverages</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2">
                                <FiMapPin className="text-primary-400 flex-shrink-0" />
                                <span>123, Grocery Street, Mumbai - 400001</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiPhone className="text-primary-400 flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FiMail className="text-primary-400 flex-shrink-0" />
                                <span>support@quickcart.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} QuickCart. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-500">
                        Made with <FiHeart className="inline text-red-500 mx-1" size={14} /> for College Practical Project
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;