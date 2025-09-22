// Utility functions for the WST JCC E-Commerce application

// DOM utility functions
const DOM = {
    // Get element by ID
    getElementById: (id) => document.getElementById(id),
    
    // Get elements by class name
    getElementsByClass: (className) => document.getElementsByClassName(className),
    
    // Query selector
    querySelector: (selector) => document.querySelector(selector),
    
    // Query selector all
    querySelectorAll: (selector) => document.querySelectorAll(selector),
    
    // Create element
    createElement: (tag, className = '', textContent = '') => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }
};

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Format date
const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
};

// Validate email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Generate unique ID
const generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
};

// Export utilities (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DOM,
        formatCurrency,
        formatDate,
        validateEmail,
        generateId
    };
}