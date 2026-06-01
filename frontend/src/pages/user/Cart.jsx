import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingCart, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, deliveryCharge, grandTotal, cartCount } = useCart();

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <FiShoppingCart className="text-8xl text-primary-300 mx-auto" />
                <h1 className="text-2xl font-bold text-gray-800 mt-6">Your cart is empty</h1>
                <p className="text-gray-500 mt-2 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/products" className="btn-primary inline-flex items-center gap-2">
                    <FiShoppingCart /> Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Shopping Cart <span className="text-primary-600">({cartCount} items)</span>
                </h1>
                <Link to="/products" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
                    <FiArrowLeft /> Continue Shopping
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.product} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover-card">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                {item.image ? (
                                    <img src={`http://localhost:5000${item.image}`} alt={item.name} className="w-full h-full object-contain p-2" />
                                ) : (
                                    <FiShoppingBag className="text-3xl text-primary-300" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                                <p className="text-lg font-bold text-primary-600 mt-1">₹{item.price * item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateQuantity(item.product, item.quantity - 1)}
                                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                >
                                    <FiMinus className="text-sm" />
                                </button>
                                <span className="font-semibold w-8 text-center">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.product, item.quantity + 1)}
                                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                                >
                                    <FiPlus className="text-sm" />
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.product)}
                                className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 h-fit sticky top-24">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Subtotal</span>
                            <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Delivery Charge</span>
                            <span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                                {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                            </span>
                        </div>
                        {cartTotal < 500 && (
                            <p className="text-xs text-accent-500">
                                Add ₹{(500 - cartTotal).toFixed(2)} more for free delivery!
                            </p>
                        )}
                        <hr className="my-3" />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Grand Total</span>
                            <span className="text-primary-600">₹{grandTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <Link to="/checkout" className="btn-primary w-full mt-6 py-3 text-center block">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;