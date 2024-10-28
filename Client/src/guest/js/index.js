import '../styles/home.css';  // Import global CSS
import halalWhatsapp from '/public/images/halal-whatsapp.png';
import { inject } from '@vercel/analytics';
import { API_URL } from '../../../constants';


const api = API_URL;
inject();

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


// Handle Search With Agent Id Form
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.btn-submit').addEventListener('click', async function (event) {
        event.preventDefault();

        const inputAgentType = document.getElementById('agent-type').value;
        const inputAgentId = document.getElementById('agent-id').value;

        // Log values to the console (for debugging)
        console.log('Agent ID:', inputAgentId, 'Agent Type:', inputAgentType);

        // You can then use the inputs for an API call, redirect, or validation, like so:

        if (inputAgentId && inputAgentType) {
            const subAdminEndPoint = 'subadminbyid';
            const superAgentEndPoint = 'superagent';
            const masterAgentEndPoint = 'masteragent';
            let endPoint;

            if (inputAgentType === 'sub-admin') {
                endPoint = subAdminEndPoint;
            } else if (inputAgentType === 'super-agent') {
                endPoint = superAgentEndPoint;
            } else if (inputAgentType === 'master-agent') {
                endPoint = masterAgentEndPoint;
            }




            try {
                const response = await fetch(`${api}/${endPoint}/${inputAgentId}`);
                const result = await response.json();

                if (result.success) {

                    if (inputAgentType === 'sub-admin') {
                        const subAdminData = result.data;
                        const uplineData = result.data.upline;

                        const contentDiv = document.getElementById('content');

                        // Clear the contentDiv before rendering new content
                        contentDiv.innerHTML = '';

                        // Set up the content layout using innerHTML
                        const subAdminSection = `
                        <div class="section">
                            <div class="section-title"><h1>উনি ভেক্টর একজন অনলাইন সাব এডমিন নাম্বার ${subAdminData.fullname}</h1></div>
                            <table class="info-table">
                                <tr>
                                    <td>উনার সাব এডমিন আইডি:</td>
                                    <td class="agent-id">${subAdminData.fullname}</td>
                                </tr>
                                <tr>
                                    <td>উনার হোয়াটসঅ্যাপ নাম্বার:</td>
                                    <td class="subadmin-whatsapp"></td>
                                </tr>
                            </table>
                        </div>
                    `;

                        const adminSection = `
                        <div class="section">
                            <div class="section-title"><h1>এই ভেক্টর অনলাইন সাব এডমিন এর আপলাইনের তথ্য:</h1></div>
                            <p class="upline-p">উপরের সাব এডমিন এর বিরুদ্ধে অভিযোগ করতে হলে নিচের যে কোন নাম্বার এ হোয়াটসঅ্যাপ এ মেসেজ দিতে হবে</p>
                            <table class="info-table">
                                <tr>
                                    <td>উনার এডমিন এর এডমিন আইডি:</td>
                                    <td class="upline-name">${uplineData.fullname}</td>
                                </tr>
                                <tr>
                                    <td>উনার এডমিন এর হোয়াটসঅ্যাপ নাম্বার:</td>
                                    <td class="upline-whatsapp"></td>
                                </tr>
                            </table>
                            <div class="highlight"><a href="/customer-service-list.html"><h1>কাস্টমার সার্ভিস এর নাম্বার গুলো পেতে এই লিঙ্ক এ ক্লিক করুন</h1></a></div>
                        </div>
                    `;

                        // Append new content to contentDiv
                        contentDiv.innerHTML = subAdminSection + adminSection;

                        // Scroll to the contentDiv
                        contentDiv.scrollIntoView({ behavior: 'smooth' });

                        // Append clickable WhatsApp icon for subAdmin
                        const wpIcon1 = document.createElement('img');
                        wpIcon1.src = halalWhatsapp;  // Assuming halalWhatsapp is a valid image URL
                        wpIcon1.alt = 'WhatsApp Icon';

                        const subAdminWhatsappCell = document.querySelector('.subadmin-whatsapp');
                        const subAdminLink = document.createElement('a');
                        subAdminLink.href = subAdminData.app;  // WhatsApp link
                        subAdminLink.target = '_blank';  // Open in a new tab
                        subAdminLink.appendChild(wpIcon1);
                        subAdminWhatsappCell.appendChild(subAdminLink);
                        subAdminWhatsappCell.innerHTML += `<br><a href="${subAdminData.app}" target="_blank">${subAdminData.phone}</a>`;

                        // Append clickable WhatsApp icon for upline
                        const wpIcon2 = document.createElement('img');
                        wpIcon2.src = halalWhatsapp;
                        wpIcon2.alt = 'WhatsApp Icon';

                        const uplineWhatsappCell = document.querySelector('.upline-whatsapp');
                        const uplineLink = document.createElement('a');
                        uplineLink.href = uplineData.whatsapp;
                        uplineLink.target = '_blank';
                        uplineLink.appendChild(wpIcon2);
                        uplineWhatsappCell.appendChild(uplineLink);
                        uplineWhatsappCell.innerHTML += `<br><a href="${uplineData.whatsapp}" target="_blank">${uplineData.phone}</a>`;


                    } else if (inputAgentType === 'super-agent') {

                        const subAdminData = result.data.superAgent;
                        const uplineData = result.data.subAdminUpline;
                        const siteAdminUpline = result.data.siteAdminUpline;

                        const contentDiv = document.getElementById('content');

                        // Clear the contentDiv before rendering new content
                        contentDiv.innerHTML = '';

                        // Set up the content layout using innerHTML
                        const subAdminSection = `
                        <div class="section">
                            <div class="section-title"><h1>উনি ভেল্কির একজন অনলাইন সুপার এজেন্ট নাম্বার ${subAdminData.fullname}</h1></div>
                            <table class="info-table">
                                <tr>
                                    <td>উনার সুপার এজেন্ট আইডি:</td>
                                    <td class="agent-id">${subAdminData.fullname}</td>
                                </tr>
                                <tr>
                                    <td>উনার হোয়াটসঅ্যাপ নাম্বার:</td>
                                    <td class="subadmin-whatsapp"></td>
                                </tr>
                            </table>
                        </div>
                    `;

                        const adminSection = `
                        <div class="section">
                            <div class="section-title"><h1>এই ভেল্কির অনলাইন সুপার এজেন্ট এর আপলাইনের তথ্যঃ</h1></div>
                            <p class="upline-p">উপরের অনলাইন সুপার এজেন্ট এর বিরুদ্ধে অভিযোগ করতে হলে নিচের যে কোন নাম্বার এ হোয়াটসঅ্যাপ এ মেসেজ দিলেই হবে</p>
                            <table class="info-table">
                                <tr>
                                    <td>উনার এডমিন এর এডমিন আইডি:</td>
                                    <td class="upline-name">${uplineData.fullname}</td>
                                </tr>
                                <tr>
                                    <td>উনার সাব এডমিন এর হোয়াটসঅ্যাপ নাম্বারঃ:</td>
                                    <td class="upline-whatsapp"></td>
                                </tr>
                                <tr>
                                    <td>উনার এডমিন এর এডমিন আইডিঃ</td>
                                    <td class="upline-name">${siteAdminUpline.fullname}</td>
                                </tr>
                                <tr>
                                    <td>উনার এডমিন এর হোয়াটসঅ্যাপ নাম্বারঃ</td>
                                    <td class="site-admin-upline-whatsapp"></td>
                                </tr>
                            </table>
                            <div class="highlight"><a href="/customer-service-list.html"><h1>কাস্টমার সার্ভিস এর নাম্বার গুলো পেতে এই লিঙ্ক এ ক্লিক করুন</h1></a></div>
                        </div>
                    `;

                        // Append new content to contentDiv
                        contentDiv.innerHTML = subAdminSection + adminSection;

                        // Scroll to the contentDiv
                        contentDiv.scrollIntoView({ behavior: 'smooth' });

                        // Append clickable WhatsApp icon for subAdmin
                        const wpIcon1 = document.createElement('img');
                        wpIcon1.src = halalWhatsapp;  // Assuming halalWhatsapp is a valid image URL
                        wpIcon1.alt = 'WhatsApp Icon';

                        const subAdminWhatsappCell = document.querySelector('.subadmin-whatsapp');
                        const subAdminLink = document.createElement('a');
                        subAdminLink.href = subAdminData.app;  // WhatsApp link
                        subAdminLink.target = '_blank';  // Open in a new tab
                        subAdminLink.appendChild(wpIcon1);
                        subAdminWhatsappCell.appendChild(subAdminLink);
                        subAdminWhatsappCell.innerHTML += `<br><a href="${subAdminData.app}" target="_blank">${subAdminData.phone}</a>`;

                        // Append clickable WhatsApp icon for upline
                        const wpIcon2 = document.createElement('img');
                        wpIcon2.src = halalWhatsapp;
                        wpIcon2.alt = 'WhatsApp Icon';

                        const uplineWhatsappCell = document.querySelector('.upline-whatsapp');
                        const uplineLink = document.createElement('a');
                        uplineLink.href = uplineData.whatsapp;
                        uplineLink.target = '_blank';
                        uplineLink.appendChild(wpIcon2);
                        uplineWhatsappCell.appendChild(uplineLink);
                        uplineWhatsappCell.innerHTML += `<br><a href="${uplineData.whatsapp}" target="_blank">${uplineData.phone}</a>`;

                        // Append clickable WhatsApp icon for site admin upline
                        const wpIcon3 = document.createElement('img');
                        wpIcon3.src = halalWhatsapp;
                        wpIcon3.alt = 'WhatsApp Icon';

                        const siteAdminUplineWhatsappCell = document.querySelector('.site-admin-upline-whatsapp');
                        const siteAdminUplineLink = document.createElement('a');
                        siteAdminUplineLink.href = siteAdminUpline.whatsapp;
                        siteAdminUplineLink.target = '_blank';
                        siteAdminUplineLink.appendChild(wpIcon3);
                        siteAdminUplineWhatsappCell.appendChild(siteAdminUplineLink);
                        siteAdminUplineWhatsappCell.innerHTML += `<br><a href="${siteAdminUpline.whatsapp}" target="_blank">${siteAdminUpline.phone}</a>`;


                    } else if (inputAgentType === 'master-agent') {

                        const masterAgent = result.data.masterAgent;
                        const superUpline = result.data.superUpline;
                        const subAdminUpline = result.data.subAdminUpline;
                        const siteAdminUpline = result.data.siteAdminUpline;

                        const contentDiv = document.getElementById('content');

                        // Clear the contentDiv before rendering new content
                        contentDiv.innerHTML = '';

                        // Set up the content layout using innerHTML
                        const subAdminSection = `
                        <div class="section">
                            <div class="section-title"><h1>উনি ভেল্কির একজন অনলাইন মাষ্টার এজেন্ট নাম্বার ${masterAgent.fullname}</h1></div>
                            <table class="info-table">
                                <tr>
                                    <td>উনার মাষ্টার এজেন্ট আইডিঃ </td>
                                    <td class="agent-id">${masterAgent.fullname}</td>
                                </tr>
                                <tr>
                                    <td>উনার হোয়াটসঅ্যাপ নাম্বার:</td>
                                    <td class="subadmin-whatsapp"></td>
                                </tr>
                            </table>
                        </div>
                    `;

                        const adminSection = `
                        <div class="section">
                            <div class="section-title"><h1>এই ভেল্কির অনলাইন মাষ্টার এজেন্ট এর আপলাইনের তথ্যঃ</h1></div>
                            <p class="upline-p">উপরের অনলাইন মাষ্টার এজেন্ট এর বিরুদ্ধে অভিযোগ করতে হলে নিচের যে কোন নাম্বার এ হোয়াটসঅ্যাপ এ মেসেজ দিলেই হবে</p>
                            <table class="info-table">
                                <tr>
                                    <td>উনার সুপার এজেন্ট এর এজেন্ট আইডিঃ</td>
                                    <td class="upline-name">${superUpline.fullname}</td>
                                </tr>
                                <tr>
                                    <td>উনার সুপার এজেন্ট এর হোয়াটসঅ্যাপ নাম্বারঃ</td>
                                    <td class="upline-whatsapp"></td>
                                </tr>
                                <tr>
                                    <td>উনার সাব এডমিন এর এডমিন আইডিঃ</td>
                                    <td class="upline-name">${subAdminUpline.fullname}</td>
                                </tr>
                                <tr>
                                    <td>উনার সাব এডমিন এর হোয়াটসঅ্যাপ নাম্বারঃ</td>
                                    <td class="sub-admin-upline-whatsapp"></td>
                                </tr>
                                <tr>
                                    <td>উনার এডমিন এর এডমিন আইডিঃ</td>
                                    <td class="upline-name">${siteAdminUpline.fullname}</td>
                                </tr>
                                <tr>
                                    <td>উনার এডমিন এর হোয়াটসঅ্যাপ নাম্বারঃ</td>
                                    <td class="site-admin-upline-whatsapp"></td>
                                </tr>
                            </table>
                            <div class="highlight"><a href="/customer-service-list.html"><h1>কাস্টমার সার্ভিস এর নাম্বার গুলো পেতে এই লিঙ্ক এ ক্লিক করুন</h1></a></div>
                        </div>
                    `;

                        // Append new content to contentDiv
                        contentDiv.innerHTML = subAdminSection + adminSection;

                        // Scroll to the contentDiv
                        contentDiv.scrollIntoView({ behavior: 'smooth' });

                        // Append clickable WhatsApp icon for subAdmin
                        const wpIcon1 = document.createElement('img');
                        wpIcon1.src = halalWhatsapp;  // Assuming halalWhatsapp is a valid image URL
                        wpIcon1.alt = 'WhatsApp Icon';

                        const subAdminWhatsappCell = document.querySelector('.subadmin-whatsapp');
                        const subAdminLink = document.createElement('a');
                        subAdminLink.href = masterAgent.app;  // WhatsApp link
                        subAdminLink.target = '_blank';  // Open in a new tab
                        subAdminLink.appendChild(wpIcon1);
                        subAdminWhatsappCell.appendChild(subAdminLink);
                        subAdminWhatsappCell.innerHTML += `<br><a href="${masterAgent.app}" target="_blank">${masterAgent.phone}</a>`;

                        // Append clickable WhatsApp icon for upline
                        const wpIcon2 = document.createElement('img');
                        wpIcon2.src = halalWhatsapp;
                        wpIcon2.alt = 'WhatsApp Icon';

                        const uplineWhatsappCell = document.querySelector('.upline-whatsapp');
                        const uplineLink = document.createElement('a');
                        uplineLink.href = superUpline.app;
                        uplineLink.target = '_blank';
                        uplineLink.appendChild(wpIcon2);
                        uplineWhatsappCell.appendChild(uplineLink);
                        uplineWhatsappCell.innerHTML += `<br><a href="${superUpline.app}" target="_blank">${superUpline.phone}</a>`;

                        // Append clickable WhatsApp icon for sub admin upline
                        const wpIcon3 = document.createElement('img');
                        wpIcon3.src = halalWhatsapp;
                        wpIcon3.alt = 'WhatsApp Icon';

                        const subAdminUplineWhatsappCell = document.querySelector('.sub-admin-upline-whatsapp');
                        const subAdminUplineLink = document.createElement('a');
                        subAdminUplineLink.href = subAdminUpline.app;
                        subAdminUplineLink.target = '_blank';
                        subAdminUplineLink.appendChild(wpIcon3);
                        subAdminUplineWhatsappCell.appendChild(subAdminUplineLink);
                        subAdminUplineWhatsappCell.innerHTML += `<br><a href="${subAdminUpline.app}" target="_blank">${subAdminUpline.phone}</a>`;

                        // Append clickable WhatsApp icon for sub admin upline
                        const wpIcon4 = document.createElement('img');
                        wpIcon4.src = halalWhatsapp;
                        wpIcon4.alt = 'WhatsApp Icon';

                        const siteAdminUplineWhatsappCell = document.querySelector('.site-admin-upline-whatsapp');
                        const siteAdminUplineLink = document.createElement('a');
                        siteAdminUplineLink.href = siteAdminUpline.whatsapp;
                        siteAdminUplineLink.target = '_blank';
                        siteAdminUplineLink.appendChild(wpIcon4);
                        siteAdminUplineWhatsappCell.appendChild(siteAdminUplineLink);
                        siteAdminUplineWhatsappCell.innerHTML += `<br><a href="${siteAdminUpline.whatsapp}" target="_blank">${subAdminUpline.phone}</a>`;

                    }

                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        } else {
            alert('Please enter both Agent Type and Agent ID.');
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Get the current URL of the page
    var currentUrl = window.location.href;

    // Get all the anchor tags inside the sidebar
    var menuItems = document.querySelectorAll('.sidebar ul li a');
    var itemLinks = document.querySelectorAll('.item-link'); // Select elements with class 'item-link'

    // Loop through each anchor tag
    menuItems.forEach(function (menuItem) {
        // Compare the href attribute of each anchor tag with the current URL
        if (menuItem.href === currentUrl && !menuItem.classList.contains('item-link')) {
            // Add 'active' class if the URL matches
            menuItem.classList.add('active');

            // Check if it's one of the dropdown submenu items
            if (menuItem.id === 'dropdown1-sub') {
                const dropdown1 = document.getElementById('dropdown1');
                dropdown1.classList.add('current');
            } else if (menuItem.id === 'dropdown2-sub') {
                const dropdown2 = document.getElementById('dropdown2');
                dropdown2.classList.add('current');
            }
        } 
    });

    // Handle links with the 'item-link' class
    itemLinks.forEach(function (itemLink) {
        if (itemLink.href === currentUrl) {
            itemLink.classList.add('current');
        }
    });

    console.log(currentUrl);

    const csl = document.querySelector('.csl');

    if (csl.href === currentUrl) {
        console.log('I am visited in customer service page');
        csl.classList.add('customer-service-button-active')
    }

});


