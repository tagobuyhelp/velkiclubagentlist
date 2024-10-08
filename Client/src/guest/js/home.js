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


document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav > ul > li > a');

    // Function to remove the visited class from all links
    function removeVisitedClasses() {
        navLinks.forEach(link => {
            link.classList.remove('visited');
            // Clear visited links from localStorage
            localStorage.removeItem(link.href);
        });
    }

    // Set the visited class based on localStorage
    navLinks.forEach(link => {
        if (localStorage.getItem('visitedLink') === link.href) {
            link.classList.add('visited');
        }

        // Add click event to each link
        link.addEventListener('click', function () {
            // Remove visited class from all links
            removeVisitedClasses();
            // Add visited class to the clicked link
            this.classList.add('visited');
            // Save the current visited link to localStorage
            localStorage.setItem('visitedLink', this.href);
        });
    });


});


document.addEventListener('DOMContentLoaded', () => {
    // Get the grid and list radio buttons
    const gridButton = document.getElementById('grid');
    const listButton = document.getElementById('list');

    // Get the container you want to change the layout for
    const gridListContainer = document.querySelector('.grid-list');

    // Get all card items
    const cardItems = document.querySelectorAll('.card-item');

    // Add event listeners to both radio buttons
    gridButton.addEventListener('click', () => {
        gridListContainer.style.display = 'flex';
        gridListContainer.style.flexDirection = 'row';  // Set to row for grid view
        cardItems.forEach(card => {
            // Apply grid-specific classes
            card.classList.add('grid-view');
            card.classList.remove('list-view');
        });
    });

    listButton.addEventListener('click', () => {
        gridListContainer.style.display = 'flex';
        gridListContainer.style.flexDirection = 'column';  // Set to column for list view
        cardItems.forEach(card => {
            // Apply list-specific classes
            card.classList.add('list-view');
            card.classList.remove('grid-view');
            card.classList.remove('card-item')
        });
    });


})
