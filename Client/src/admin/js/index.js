import '../styles/admin.css';  // Import global CSS
import { API_URL } from '../../../constants.js'

const api = API_URL
// Add Google Fonts and Material Symbols
const googleFont1 = document.createElement('link');
googleFont1.rel = 'stylesheet';
googleFont1.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
document.head.appendChild(googleFont1);

const googleFont2 = document.createElement('link');
googleFont2.rel = 'stylesheet';
googleFont2.href = 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap';
document.head.appendChild(googleFont2);

// Preconnect for faster font loading
const preconnect1 = document.createElement('link');
preconnect1.rel = 'preconnect';
preconnect1.href = 'https://fonts.googleapis.com';
document.head.appendChild(preconnect1);

const preconnect2 = document.createElement('link');
preconnect2.rel = 'preconnect';
preconnect2.href = 'https://fonts.gstatic.com';
preconnect2.crossOrigin = 'anonymous';
document.head.appendChild(preconnect2);

// Add FontAwesome
const fontAwesome = document.createElement('script');
fontAwesome.src = 'https://kit.fontawesome.com/85e5dfe440.js';
fontAwesome.crossOrigin = 'anonymous';
document.head.appendChild(fontAwesome);


// Load the header and footer for all pages
document.getElementById('nav').innerHTML = require('../components/navbar.html').default;
document.getElementById('header').innerHTML = require('../components/header.html').default;



document.addEventListener("DOMContentLoaded", function() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!accessToken || !refreshToken) {
        // No tokens found, redirect to login
        window.location.href = '/login.html';
        return;
    }


    // Validate tokens with server
    fetch(`${api}/user/validate-tokens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ refreshToken })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Token validation failed');
        }
        return response.json();
    })
    .then(data => {
        if (!data.success) {
            // Tokens are invalid, redirect to login
            window.location.href = '/login.html';
            return;
        }
    })
    .catch(error => {
        console.error('Error validating tokens:', error);
        // Redirect to login on error
        window.location.href = '/login.html';
    });

    //display logged in user
    const userNameElement = document.getElementById('userNameElement');
    const userEmailElement = document.getElementById('userEmailElement');

    userNameElement.innerText = user.fullname;
    userEmailElement.innerText = user.email;



    // Logout functionality
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", function() {
        // Make a request to log out the user
        fetch(`${api}/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            return response.json();
        })
        .then(data => {
            // Clear tokens and user data from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            // Redirect to login page
            window.location.href = '/login.html';
        })
        .catch(error => {
            console.error('Error logging out:', error);
        });
    });
});

document.getElementById('navOpen').addEventListener('click', () => {
    document.getElementById('nav').style.setProperty('display', 'block', 'important');
});


document.getElementById('navClose').addEventListener('click', () => {
    document.getElementById('nav').style.display = 'none';
})


