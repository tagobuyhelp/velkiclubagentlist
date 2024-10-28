import './index';
import '../styles/site-admin-list.css';
import { API_URL } from '../../../constants';
import halalWhatsapp from '/public/images/halal-whatsapp.png';

const api = API_URL;

document.addEventListener('DOMContentLoaded', function () {
    async function fetchData() {
        try {
            const response = await fetch(`${api}/siteadmin`);
            const result = await response.json();

            if (result.success) {
                const data = result.data;
                const tableBody = document.getElementById('table-body');

                data.forEach(item => {
                    const row = document.createElement('tr');

                    

                    const nameCell = document.createElement('td');
                    nameCell.textContent = item.fullname;
                    row.appendChild(nameCell);

                    const telegramCell = document.createElement('td');
                    telegramCell.innerHTML = `<a href="${item.telegram}" target="_blank"><i class="fab fa-telegram icon-telegram"></i></a>`;
                    row.appendChild(telegramCell);

                    const whatsappCell = document.createElement('td');
                    const appLink = document.createElement('a');
                    appLink.href = item.whatsapp;
                    const appImage = document.createElement('img');
                    appImage.src = halalWhatsapp;
                    appImage.alt = 'WhatsApp';
                    appImage.style.width = '24px';
                    appImage.style.height = '24px';
                    appLink.appendChild(appImage);
                    whatsappCell.appendChild(appLink)

                    row.appendChild(whatsappCell);

                    const phoneCell = document.createElement('td');
                    phoneCell.className = 'phone-number';
                    phoneCell.innerHTML = `<a href="${item.whatsapp}" target="_blank">${item.phone}</a>`;
                    row.appendChild(phoneCell);

                    tableBody.appendChild(row);
                });
            } else {
                console.error('Failed to retrieve data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    fetchData();
})
