// Header functionality
class Header {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.updateCartCount();
        // Don't call setActiveNavigation here - it will be called from partials-loader
    }

    setupMobileMenu() {
        const toggle = document.querySelector('.mobile-toggle');
        const menu = document.querySelector('.navbar-menu');
        if (!toggle || !menu) return;

        // Remove any leftover inline styles / classes from desktop state
        const closeMenu = () => {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        };
        const openMenu = () => {
            menu.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
        };
        const toggleMenu = () => {
            if (menu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        };
        toggle.addEventListener('click', toggleMenu);

        // Close on resize back to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 560) {
                closeMenu();
            }
        });

        // Close when clicking outside menu (mobile only)
        document.addEventListener('click', (e) => {
            if (window.innerWidth > 560) return;
            if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    setActiveNavigation() {
        // Get current page path
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Get navigation links
        const homeLink = document.querySelector('.navbar-menu a[href*="index.html"]');
        const shopLink = document.querySelector('.navbar-menu a[href*="shop.html"]');
        const cartLink = document.querySelector('.navbar-menu a[href*="cart.html"]');
        const cartIcon = document.querySelector('.cart-icon');
        
        // Remove active class from all links first
        [homeLink, shopLink, cartLink].forEach(link => {
            if (link) link.classList.remove('active');
        });
        if (cartIcon) cartIcon.classList.remove('active');
        
        // Add active class based on current page
        if (currentPage === 'index.html' || currentPage === '' || currentPath === '/' || currentPath.endsWith('/')) {
            // Homepage - highlight Home
            if (homeLink) homeLink.classList.add('active');
        } else if (currentPage === 'shop.html') {
            // Shop page - highlight Shop
            if (shopLink) shopLink.classList.add('active');
        } else if (currentPage === 'cart.html') {
            // Cart page - highlight Cart icon
            if (cartIcon) cartIcon.classList.add('active');
            if (cartLink) cartLink.classList.add('active'); // Also highlight mobile cart link
        }
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            // Get cart items from localStorage or your cart system
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            cartCount.textContent = cartItems.length;
        }
    }

    // Method to update cart count from other parts of the application
    static updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            cartCount.textContent = cartItems.length;
        }
    }
}

// Expose Header class globally for partials-loader
window.Header = Header;

// Initialize header when DOM is loaded (fallback if not using partials-loader)
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('has-js');
    // Only initialize if partials-loader hasn't already done it
    if (!document.querySelector('.main-header')) {
        new Header();
    }
});