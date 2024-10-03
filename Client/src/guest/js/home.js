import '../styles/home.css';  // Import global CSS

// Load the header and footer for all pages
const loadHeaderFooter = () => {
    document.getElementById('header').innerHTML = require('../components/header.html').default;
    document.getElementById('footer').innerHTML = require('../components/footer.html').default;
};

window.onload = loadHeaderFooter;
