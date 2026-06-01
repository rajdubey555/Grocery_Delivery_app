import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiHeart, FiSun, FiDroplet, FiBox, FiZap, FiCoffee, FiShoppingBag } from 'react-icons/fi';
import API from '../../services/api';
import Loader from '../../components/common/Loader';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const categoryIcons = {
        Fruits: <FiHeart />,
        Vegetables: <FiSun />,
        Dairy: <FiDroplet />,
        Bakery: <FiBox />,
        Snacks: <FiZap />,
        Beverages: <FiCoffee />,
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await API.get('/categories');
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Shop by <span className="text-primary-600">Category</span>
                </h1>
                <p className="text-gray-500 mt-2">Choose a category to browse products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat) => (
                    <Link
                        key={cat._id}
                        to={`/products?category=${cat._id}`}
                        className="bg-white rounded-2xl border border-gray-100 hover:border-primary-300 hover-card p-6 flex items-center gap-5 group"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform flex-shrink-0">
                            {categoryIcons[cat.name] || <FiShoppingBag />}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">Fresh & premium quality</p>
                            <span className="inline-flex items-center text-primary-600 text-sm font-medium mt-2">
                                Browse Products <FiChevronRight className="ml-1" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;