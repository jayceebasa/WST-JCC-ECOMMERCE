// Partials loader utility for loading header and footer
class PartialsLoader {
    static getBasePath() {
        // Detect if we're in a subdirectory by checking the current path
        const currentPath = window.location.pathname;
        const hostname = window.location.hostname;
        
        console.log('Current path:', currentPath);
        console.log('Hostname:', hostname);
        
        // Check if we're on GitHub Pages
        const isGitHubPages = hostname.includes('github.io');
        
        // More robust subdirectory detection
        const isInPagesFolder = currentPath.includes('/pages/') || 
                               currentPath.endsWith('/shop.html') || 
                               currentPath.endsWith('/cart.html') ||
                               currentPath.endsWith('/singleProduct.html');
        
        const basePath = isInPagesFolder ? '../' : '';
        console.log('Base path determined:', basePath);
        
        return basePath;
    }

    static async loadPartial(partialPath, targetSelector) {
        try {
            const basePath = this.getBasePath();
            const fullPath = basePath + partialPath;
            
            console.log('Attempting to load partial from:', fullPath);
            
            const response = await fetch(fullPath);
            if (!response.ok) {
                console.error(`Failed to load partial: ${response.status} - ${fullPath}`);
                // Try fallback path
                const fallbackPath = '../' + partialPath;
                console.log('Trying fallback path:', fallbackPath);
                const fallbackResponse = await fetch(fallbackPath);
                if (!fallbackResponse.ok) {
                    throw new Error(`HTTP error! status: ${fallbackResponse.status} for ${fallbackPath}`);
                }
                var html = await fallbackResponse.text();
            } else {
                var html = await response.text();
            }
            
            console.log('Partial loaded successfully');
            
            // Don't modify paths in the HTML since we're using relative paths in the partial itself
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = html;
                console.log('Partial inserted into DOM');
            } else {
                console.error('Target element not found:', targetSelector);
            }
        } catch (error) {
            console.error('Error loading partial:', error);
        }
    }

    static async loadHeader() {
        await this.loadPartial('partials/header.html', 'header');
    }

    static async loadFooter() {
        await this.loadPartial('partials/footer.html', 'footer');
    }

    static async loadHeaderAndFooter() {
        await Promise.all([
            this.loadHeader(),
            this.loadFooter()
        ]);
    }
}

// Auto-load header and footer on pages that have the containers
document.addEventListener('DOMContentLoaded', async () => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (header) {
        await PartialsLoader.loadHeader();
        console.log('Header loaded, checking for Header class...');
        
        // Initialize header functionality after loading and add active navigation
        if (window.Header) {
            console.log('Header class found, initializing...');
            const headerInstance = new Header();
            // Ensure DOM is fully ready before setting active navigation
            requestAnimationFrame(() => {
                console.log('Calling setActiveNavigation...');
                headerInstance.setActiveNavigation();
            });
        } else {
            console.log('Header class not found on window object');
        }
    }
    
    if (footer) {
        await PartialsLoader.loadFooter();
    }
});