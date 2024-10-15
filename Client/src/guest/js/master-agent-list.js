import './home';
import '../styles/master-agent-list.css';
import halalWhatsapp from '/public/images/halal-whatsapp.png';
import { API_URL } from '../../../constants';

const api = API_URL;

document.addEventListener('DOMContentLoaded', function () {
    async function fetchSuperAgents() {
        try {
            const response = await fetch(`${api}/masteragent/uplines`);
            const data = await response.json();

            if (data.statusCode === 200) {
                const grandUplines = data.data;

                grandUplines.forEach(grandUpline => {
                    const uplines = grandUpline.superAgents;
                    const grandUplineId = grandUpline.id;

                    uplines.forEach(upline => {
                        const masterAgents = upline.masterAgents;
                        const uplineId = upline.superAgent.id;
                        const grandUplineId = upline.superAgent.upline.id
                        const totalDownLineCount = upline.masterAgentCount;

                        const tableBox = document.getElementById('table-box');

                        // Create header text for each upline
                        const headerTextElement = document.createElement('div');
                        headerTextElement.className = 'header';
                        headerTextElement.id = 'header-text';

                        // Create a span element to display the total downline count dynamically
                        const countElement = document.createElement('span');
                        countElement.id = 'total-subadmins';
                        countElement.textContent = totalDownLineCount;

                        // Add the header content
                        headerTextElement.innerHTML = `সাব এডমিন ${grandUplineId} এর অধীনে সুপার এজেন্ট ${uplineId} এর অধীনে সর্বমোট মাস্টার এজেন্ট আছে `;
                        headerTextElement.appendChild(countElement);
                        headerTextElement.innerHTML += ` জন`;

                        // Append header to tableBox
                        tableBox.appendChild(headerTextElement);

                        const table = document.createElement('table');
                        table.className = 'master-agent-table';

                        const thead = document.createElement('thead');
                        const tbody = document.createElement('tbody');

                        // Create table headers
                        const headerRow = document.createElement('tr');
                        const idTh = document.createElement('th');
                        const agentTh = document.createElement('th');
                        const appTh = document.createElement('th');
                        const phoneNumberTh = document.createElement('th');
                        const complainTh = document.createElement('th');

                        idTh.innerHTML = 'ID';
                        agentTh.innerHTML = 'AGENT';
                        appTh.innerHTML = 'APP';
                        phoneNumberTh.innerHTML = 'PHONE NUMBER';
                        complainTh.innerHTML = 'COMPLAIN';

                        headerRow.appendChild(idTh);
                        headerRow.appendChild(agentTh);
                        headerRow.appendChild(appTh);
                        headerRow.appendChild(phoneNumberTh);
                        headerRow.appendChild(complainTh);
                        thead.appendChild(headerRow);

                        masterAgents.forEach(masterAgent => {
                            const trBody = document.createElement('tr');
                        
                            // Create and populate table data cells
                            const idTd = document.createElement('td');
                            const agentTd = document.createElement('td');
                            const appTd = document.createElement('td');
                            const phoneNumberTd = document.createElement('td');
                            const complainTd = document.createElement('td');
                        
                            idTd.innerHTML = masterAgent.id;
                            agentTd.innerHTML = 'মাষ্টার';
                        
                            // WhatsApp Link and Image
                            const appLink = document.createElement('a');
                            appLink.href = masterAgent.app;
                            appLink.target = '_blank'; // Open in new tab
                            const appImage = document.createElement('img');
                            appImage.src = halalWhatsapp;
                            appImage.alt = 'WhatsApp';
                            appImage.style.width = '24px';
                            appImage.style.height = '24px';
                            appLink.appendChild(appImage);
                            appTd.appendChild(appLink);
                        
                            // Phone Number as a Link
                            const phoneNumberLink = document.createElement('a');
                            phoneNumberLink.href = masterAgent.app; // Use masterAgent.app as the link
                            phoneNumberLink.target = '_blank'; // Open in new tab
                            phoneNumberLink.innerHTML = masterAgent.phone; // Display the phone number
                            phoneNumberTd.appendChild(phoneNumberLink);
                        
                            // Complain Button
                            const complainButton = document.createElement('button');
                            complainButton.className = 'complain';
                            complainButton.id = masterAgent.id;
                            complainButton.innerHTML = 'অভিযোগ';
                            complainTd.appendChild(complainButton);
                        
                            // Append all cells to the row
                            trBody.appendChild(idTd);
                            trBody.appendChild(agentTd);
                            trBody.appendChild(appTd);
                            trBody.appendChild(phoneNumberTd);
                            trBody.appendChild(complainTd);
                        
                            // Append the row to tbody
                            tbody.appendChild(trBody);
                        });
                        

                        // Append thead and tbody to the table
                        table.appendChild(thead);
                        table.appendChild(tbody);

                        // Append the table to the tableBox
                        tableBox.appendChild(table);
                    });
                });
            }
        } catch (error) {
            console.error('Error fetching Master-agent', error);
        }
    }

    fetchSuperAgents();
});


document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', async function (event) {
        if (event.target.classList.contains('complain')) {
            event.preventDefault();

            const clickedId = event.target.id;
            console.log(clickedId);

            try {
                const response = await fetch(`${api}/masteragent/${clickedId}`);
                const result = await response.json();

                if (result.success) {
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
                            <div class="section-title"><h1>উনি ভেল্কির একজন অনলাইন মাষ্টার এজেন্ট নাম্বার ${masterAgent.id}</h1></div>
                            <table class="info-table">
                                <tr>
                                    <td>উনার মাষ্টার এজেন্ট আইডিঃ </td>
                                    <td class="agent-id">${masterAgent.id}</td>
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
                                    <td class="upline-name">${superUpline.id}</td>
                                </tr>
                                <tr>
                                    <td>উনার সুপার এজেন্ট এর হোয়াটসঅ্যাপ নাম্বারঃ</td>
                                    <td class="upline-whatsapp"></td>
                                </tr>
                                <tr>
                                    <td>উনার সাব এডমিন এর এডমিন আইডিঃ</td>
                                    <td class="upline-name">${subAdminUpline.id}</td>
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

                } else {
                    console.error('Error fetching subAdmin data:', result.message);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
    });
});

