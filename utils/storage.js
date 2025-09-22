// Local Storage management utilities

const Storage = {
    // Set item in localStorage
    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },

    // Get item from localStorage
    getItem: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    // Remove item from localStorage
    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    // Clear all localStorage
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },

    // Check if key exists
    hasItem: (key) => {
        return localStorage.getItem(key) !== null;
    }
};

// Cart-specific storage functions
const CartStorage = {
    // Get cart items
    getCart: () => Storage.getItem('cart') || [],
    
    // Save cart items
    saveCart: (cartItems) => Storage.setItem('cart', cartItems),
    
    // Add item to cart
    addToCart: (item) => {
        const cart = CartStorage.getCart();
        cart.push(item);
        CartStorage.saveCart(cart);
    },
    
    // Remove item from cart
    removeFromCart: (itemId) => {
        const cart = CartStorage.getCart();
        const updatedCart = cart.filter(item => item.id !== itemId);
        CartStorage.saveCart(updatedCart);
    },
    
    // Clear cart
    clearCart: () => Storage.removeItem('cart')
};