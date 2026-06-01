import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('quickcart_cart');
        if (stored) {
            try {
                setCart(JSON.parse(stored));
            } catch {
                localStorage.removeItem('quickcart_cart');
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('quickcart_cart', JSON.stringify(cart));
    }, [cart]);

    // Add to cart
    const addToCart = (product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.product === product._id);
            if (existing) {
                return prev.map((item) =>
                    item.product === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [
                ...prev,
                {
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity,
                },
            ];
        });
        toast.success(`${product.name} added to cart!`);
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.product !== productId));
        toast.success('Item removed from cart');
    };

    // Update quantity
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart((prev) =>
            prev.map((item) =>
                item.product === productId ? { ...item, quantity } : item
            )
        );
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    // Cart totals
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryCharge = cartTotal > 500 ? 0 : 40;
    const grandTotal = cartTotal + deliveryCharge;

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartTotal,
                deliveryCharge,
                grandTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);