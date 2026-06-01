import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiDollarSign, FiClock, FiStar, FiChevronRight, FiShoppingCart, FiHeart, FiSun, FiDroplet, FiBox, FiZap, FiCoffee } from 'react-icons/fi';
import API from '../../services/api';
import ProductCard from '../../components/common/ProductCard';
import Loader from '../../components/common/Loader';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes] = await Promise.all([
                    API.get('/products/featured'),
                    API.get('/categories'),
                ]);
                setFeaturedProducts(prodRes.data);
                setCategories(catRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const features = [
        { icon: <FiTruck className="text-2xl" />, title: 'Fast Delivery', desc: 'Delivery in under 30 minutes' },
        { icon: <FiShield className="text-2xl" />, title: 'Fresh Products', desc: '100% fresh & quality assured' },
        { icon: <FiDollarSign className="text-2xl" />, title: 'Best Prices', desc: 'Competitive market prices' },
        { icon: <FiClock className="text-2xl" />, title: '24/7 Support', desc: 'Round the clock assistance' },
    ];

    const reviews = [
        { name: 'Priya Patel', rating: 5, text: 'Amazing service! Groceries delivered fresh and on time. Highly recommended!' },
        { name: 'Amit Kumar', rating: 4, text: 'Great app for daily grocery needs. The UI is smooth and delivery is fast.' },
        { name: 'Sneha Reddy', rating: 5, text: 'Best grocery app in town. Fruits and vegetables are always fresh.' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="hero-gradient">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 text-center md:text-left">
                            <span className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                                <FiTruck size={16} /> Free Delivery on orders above ₹500
                            </span>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                                Fresh Groceries{' '}
                                <span className="text-primary-600">Delivered</span>{' '}
                                in Minutes
                            </h1>
                            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
                                Order fresh fruits, vegetables, dairy, and more from the comfort of your home. Fast delivery, best prices, premium quality.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link to="/products" className="btn-primary text-center text-lg px-8 py-3">
                                    Shop Now <FiArrowRight className="inline ml-1" />
                                </Link>
                                <Link to="/categories" className="bg-white text-primary-600 font-semibold rounded-xl px-8 py-3 border-2 border-primary-200 hover:border-primary-400 transition-colors text-center text-lg">
                                    Explore Categories
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="relative">
                                <div className="w-72 h-72 sm:w-96 sm:h-96 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                                <FiShoppingCart className="text-9xl sm:text-[12rem] text-primary-300 relative animate-bounce" style={{ animationDuration: '3s' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <div key={idx} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors">
                                <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                                    {feature.icon}
                                </div>
                                <h3 className="font-semibold text-gray-800 text-sm">{feature.title}</h3>
                                <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Shop by <span className="text-primary-600">Category</span>
                        </h2>
                        <Link to="/categories" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                            View All <FiChevronRight />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat._id}
                                to={`/products?category=${cat._id}`}
                                className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-primary-300 hover-card text-center group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                    <span className="text-2xl text-primary-500">
                                        {cat.name === 'Fruits' && <FiHeart />}
                                        {cat.name === 'Vegetables' && <FiSun />}
                                        {cat.name === 'Dairy' && <FiDroplet />}
                                        {cat.name === 'Bakery' && <FiBox />}
                                        {cat.name === 'Snacks' && <FiZap />}
                                        {cat.name === 'Beverages' && <FiCoffee />}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-sm text-gray-700">{cat.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Popular <span className="text-primary-600">Products</span>
                        </h2>
                        <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                            View All <FiChevronRight />
                        </Link>
                    </div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
                        What Our <span className="text-primary-600">Customers Say</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 hover-card">
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">{review.text}</p>
                                <p className="font-semibold text-gray-800 text-sm">{review.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12 text-center text-white">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Order Your Groceries?</h2>
                        <p className="text-primary-100 mb-6 max-w-md mx-auto">
                            Join thousands of happy customers who trust QuickCart for their daily grocery needs.
                        </p>
                        <Link to="/register" className="inline-block bg-white text-primary-600 font-bold px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors">
                            Get Started Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;