import '../styles/admin.css';  // Import global CSS

// Load the header and footer for all pages
const loadNavbar = () => {
    document.getElementById('navbar').innerHTML = require('../components/navbar.html').default;
    document.getElementById('header').innerHTML = require('../components/header.html').default;
};

window.onload = loadNavbar;
