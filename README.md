# WST JCC E-Commerce

A vanilla HTML, CSS, and JavaScript e-commerce web application with a well-organized folder structure.

## Project Structure

```
WST-JCC-ECOMMERCE/
├── index.html                 # Main entry point
├── assets/                    # Static assets
│   ├── css/                  # Stylesheets
│   │   ├── main.css         # Main stylesheet
│   │   ├── header.css       # Header styles
│   │   ├── footer.css       # Footer styles
│   │   └── README.md
│   ├── js/                   # JavaScript files
│   │   ├── main.js          # Main JavaScript file
│   │   ├── helpers.js       # Utility functions
│   │   ├── header.js        # Header functionality
│   │   ├── partials-loader.js # Partials loading utility
│   │   └── README.md
│   ├── images/               # Images (products, banners, UI)
│   ├── icons/                # Icon files
│   ├── fonts/                # Custom fonts
│   └── README.md
├── components/               # Reusable UI components
│   └── README.md
├── data/                     # Static data files (JSON)
│   ├── products.json         # Product catalog
│   └── README.md
├── modules/                  # Feature-specific modules
│   └── README.md
├── pages/                    # Individual page files
│   └── README.md
├── partials/                 # Reusable HTML partials
│   ├── header.html          # Header partial
│   ├── footer.html          # Footer partial
│   └── README.md
├── utils/                    # Utility functions (deprecated - moved to assets/js)
└── README.md                # This file
```

## Getting Started

1. Open `index.html` in your web browser to view the application
2. Start developing by adding components in the `components/` folder
3. Add new pages in the `pages/` folder
4. Manage product data in `data/products.json`
5. Add utilities and helper functions in `assets/js/`
6. Add styles in `assets/css/`

## Folder Guidelines

### Assets
- Place all images in `assets/images/`
- Organize images by type (products, banners, UI)
- Use descriptive naming conventions
- Optimize images for web

### Components
- Create reusable UI components
- Each component should have its own folder with HTML, CSS, and JS files
- Keep components modular and reusable

### Data
- Store static data as JSON files
- Use consistent data structure
- Validate JSON syntax

### Utils
- Create utility functions for common operations
- Keep functions pure and reusable
- Document function parameters and return values

## Development Best Practices

1. **Naming Conventions**
   - Use lowercase with hyphens for files: `product-card.html`
   - Use camelCase for JavaScript variables: `productPrice`
   - Use descriptive names that indicate purpose

2. **Code Organization**
   - Keep HTML semantic and accessible
   - Use CSS classes for styling, avoid inline styles
   - Write modular JavaScript functions
   - Comment your code for clarity

3. **File Management**
   - Keep related files together
   - Use consistent folder structure
   - Avoid deep nesting when possible

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Styling and responsive design
- **Vanilla JavaScript**: Interactive functionality
- **JSON**: Data storage and management

## Browser Support

This application is designed to work with modern web browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- HTML5 semantic elements