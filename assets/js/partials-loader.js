// Partials loader utility for loading header and footer
class PartialsLoader {
    static async loadPartial(partialPath, targetSelector) {
        try {
            const response = await fetch(partialPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
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