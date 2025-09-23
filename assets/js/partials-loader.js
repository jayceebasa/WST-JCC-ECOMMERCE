// Partials loader utility for loading header and footer
class PartialsLoader {
    static getBasePath() {
        // Detect if we're in a subdirectory by checking the current path
        const currentPath = window.location.pathname;
        const isInSubdirectory = currentPath.includes('/pages/') || currentPath.split('/').length > 2;
        return isInSubdirectory ? '../' : '';
    }

    static async loadPartial(partialPath, targetSelector) {
        try {
            const basePath = this.getBasePath();
            const fullPath = basePath + partialPath;
            const response = await fetch(fullPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let html = await response.text();
            
            // Fix asset paths in the loaded HTML
            if (basePath) {
                // We're in a subdirectory, so fix relative paths
                html = html.replace(/src="assets\//g, 'src="../assets/');
                html = html.replace(/href="assets\//g, 'href="../assets/');
                html = html.replace(/href="pages\//g, 'href="../pages/');
                html = html.replace(/href="index\.html"/g, 'href="../index.html"');
            }
            
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = html;
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