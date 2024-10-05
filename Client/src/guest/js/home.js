import '../styles/home.css';  // Import global CSS

document.getElementById('header').innerHTML = require('../components/header.html').default;
document.getElementById('footer').innerHTML = require('../components/footer.html').default;


//Menu Functions

document.addEventListener('DOMContentLoaded', () => {
    const openMenuBtn = document.getElementById('openMenu');
    const closeMenuBtn = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');

    // Function to open the sidebar
    openMenuBtn.addEventListener('click', () => {
        sidebar.style.display = 'block';
    });

    // Function to close the sidebar
    closeMenuBtn.addEventListener('click', () => {
        sidebar.style.display = 'none';
    });
});



//Date Function
document.addEventListener('DOMContentLoaded', () => {
    const dayElement = document.querySelector('.date-container .day');
    const weekdayElement = document.querySelector('.date-container .weekday');
    const monthElement = document.querySelector('.date-container .month');

    const now = new Date();

    // Get current day
    const day = now.getDate();
    dayElement.textContent = day < 10 ? '0' + day : day; // Add leading zero if needed

    // Get current weekday
    const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const weekday = weekdays[now.getDay()];
    weekdayElement.textContent = weekday;

    // Get current month
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = months[now.getMonth()];
    monthElement.textContent = month;
});

