import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { getImageUrl } from '../../services/imageUrl';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover-card group">
            {/* Product Image */}
            <Link to={`/product/${product._id}`} className="block relative overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-6">
                    {product.image ? (
                        <img
                            src={getImageUrl(product.image)}
                            alt={product.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <FiShoppingBag className="text-6xl text-primary-300" />
                    )}
                </div>
                {product.quantity <= 5 && product.quantity > 0 && (
                    <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Only {product.quantity} left
                    </span>
                )}
                {product.quantity === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm">Out of Stock</span>
                    </div>
                )}
            </Link>

            {/* Product Info */}
            <div className="p-4">
                <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded-full">
                    {product.category?.name || 'General'}
                </span>
                <Link to={`/product/${product._id}`}>
                    <h3 className="mt-2 font-semibold text-gray-800 line-clamp-1 hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                    <FiStar className="text-yellow-400 fill-current text-sm" />
                    <span className="text-sm text-gray-500">{product.rating}</span>
                </div>

                {/* Price & Add to Cart */}
                <div className="flex items-center justify-between mt-3">
                    <div>
                        <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                        <span className="text-xs text-gray-400 ml-1">/ unit</span>
                    </div>
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.quantity === 0}
                        className="flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        <FiShoppingCart className="text-sm" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;