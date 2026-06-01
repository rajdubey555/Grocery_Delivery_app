import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiShoppingCart, FiStar, FiArrowLeft, FiShoppingBag, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import API from '../../services/api';
import { useCart } from '../../context/CartContext';
import Loader from '../../components/common/Loader';
import { getImageUrl } from '../../services/imageUrl';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <Loader />;
    if (!product) return <div className="text-center py-20 text-gray-500">Product not found</div>;

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary-600 mb-6">
                <FiArrowLeft /> Back
            </button>

            <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl flex items-center justify-center p-8">
                        {product.image ? (
                            <img
                                src={getImageUrl(product.image)}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <FiShoppingBag className="text-9xl text-primary-300" />
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <span className="text-sm text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full w-fit">
                            {product.category?.name || 'General'}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3">{product.name}</h1>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mt-3">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar
                                        key={i}
                                        className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-500">{product.rating} / 5</span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mt-4 leading-relaxed">{product.description || 'Fresh and premium quality product.'}</p>

                        {/* Price */}
                        <div className="mt-6">
                            <span className="text-4xl font-extrabold text-gray-900">₹{product.price}</span>
                            <span className="text-gray-400 text-sm ml-2">/ unit</span>
                        </div>

                        {/* Stock Info */}
                        <div className="mt-3">
                            {product.quantity > 0 ? (
                                <span className="text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-full">
                                    <FiCheckCircle className="inline mr-1" size={14} /> {product.quantity} units in stock
                                </span>
                            ) : (
                                <span className="text-red-600 text-sm font-medium bg-red-50 px-3 py-1 rounded-full">
                                    <FiXCircle className="inline mr-1" size={14} /> Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        {product.quantity > 0 && (
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                    >
                                        <FiMinus />
                                    </button>
                                    <span className="text-lg font-semibold w-10 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                    >
                                        <FiPlus />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.quantity === 0}
                            className="btn-accent mt-6 w-full md:w-auto py-3 px-8 text-base flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            <FiShoppingCart /> Add to Cart - ₹{(product.price * quantity).toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;