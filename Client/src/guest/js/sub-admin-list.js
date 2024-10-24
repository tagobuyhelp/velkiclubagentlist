import './home';
import '../styles/sub-admin-list.css';
import halalWhatsapp from '/public/images/halal-whatsapp.png';
import { API_URL } from '../../../constants';

const api = API_URL;

document.addEventListener('DOMContentLoaded', function () {
    async function fetchSubAdmins() {
        try {
            const response = await fetch(`${api}/subadmin/uplines`);
            const data = await response.json();

            if (data.success) {
                const upline = data.data[0].upline;
                const subAdmins = data.data.flatMap(upline => upline.subAdmins);
                const tableBody = document.getElementById('subadmin-table-body');
                const totalSubAdmins = document.getElementById('total-subadmins');
                const headerText = document.getElementById('header-text');

                totalSubAdmins.textContent = data.data[0].downlineCount;
                headerText.innerHTML = `সাইট এডমিন ${upline.fullname} এর অধীনে সর্বমোট সাব এডমিন আছে <span id="total-subadmins">${data.data[0].downlineCount}</span> জন`;

                subAdmins.forEach(subAdmin => {
                    const row = document.createElement('tr');

                    const idCell = document.createElement('td');
                    idCell.textContent = subAdmin.fullname;
                    row.appendChild(idCell);

                    const agentCell = document.createElement('td');
                    agentCell.textContent = 'সাব এডমিন';
                    row.appendChild(agentCell);

                    const appCell = document.createElement('td');
                    const appLink = document.createElement('a');
                    appLink.href = subAdmin.app;
                    const appImage = document.createElement('img');
                    appImage.src = halalWhatsapp;
                    appImage.alt = 'WhatsApp';
                    appImage.style.width = '24px';
                    appImage.style.height = '24px';
                    appLink.appendChild(appImage);
                    appCell.appendChild(appLink);
                    row.appendChild(appCell);

                    const phoneCell = document.createElement('td');
                    const phoneLink = document.createElement('a');
                    phoneLink.href = subAdmin.app;
                    phoneLink.className = 'phone-number';
                    phoneLink.textContent = subAdmin.phone;
                    phoneCell.appendChild(phoneLink);
                    row.appendChild(phoneCell);

                    const complainCell = document.createElement('td');
                    const complainBtn = document.createElement('button');
                    complainBtn.textContent = 'অভিযোগ';
                    complainBtn.value = subAdmin.id;
                    complainBtn.id = subAdmin.id;
                    complainBtn.className = 'complain'


                    complainCell.appendChild(complainBtn);
                    row.appendChild(complainCell);

                    tableBody.appendChild(row);
                });
            }
        } catch (error) {
            console.error('Error fetching sub-admins:', error);
        }
    }

    fetchSubAdmins();
})


document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', async function (event) {
        if (event.target.classList.contains('complain')) {
            event.preventDefault();

            const clickedId = event.target.id;
            console.log(clickedId);

            try {
                const response = await fetch(`${api}/subadminbyid/${clickedId}`);
                const result = await response.json();

                if (result.success) {
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

                } else {
                    console.error('Error fetching subAdmin data:', result.message);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    });
});



