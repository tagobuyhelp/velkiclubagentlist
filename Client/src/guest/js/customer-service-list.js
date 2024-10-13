import './home';
import '../styles/customer-service-list.css';
import halalWhatsapp from '/public/images/halal-whatsapp.png';


document.addEventListener('DOMContentLoaded', async function () {
    const tbody = document.querySelector('tbody'); // Assuming there's only one <tbody> element

    try {
        const response = await fetch(`/api/customerservice`);
        const result = await response.json();

        if (result.statusCode === 200 && result.data.length > 0) {
            const customerServices = result.data;

            customerServices.forEach(service => {
                // Create a new table row
                const row = document.createElement('tr');

                // Create table data (td) for each column
                const idCell = document.createElement('td');
                idCell.textContent = service.id;
                row.appendChild(idCell);

                const typeCell = document.createElement('td');
                typeCell.textContent = service.type;
                row.appendChild(typeCell);

                const whatsappCell = document.createElement('td');
                const whatsappLink = document.createElement('a');
                whatsappLink.href = service.whatsapp;
                const whatsappImage = document.createElement('img');
                whatsappImage.src = halalWhatsapp; // Update the path to your WhatsApp icon
                whatsappImage.alt = 'WhatsApp';
                whatsappImage.style.width = '24px';
                whatsappImage.style.height = '24px';
                whatsappLink.appendChild(whatsappImage);
                whatsappCell.appendChild(whatsappLink);
                row.appendChild(whatsappCell);

                // Create the phone cell with an anchor linking to the WhatsApp number
                const phoneCell = document.createElement('td');
                const phoneLink = document.createElement('a');
                phoneLink.href = service.whatsapp; // Link the phone number to WhatsApp
                phoneLink.textContent = service.phone;
                phoneCell.appendChild(phoneLink);
                row.appendChild(phoneCell);

                // Append the row to the table body
                tbody.appendChild(row);
            });
        } else {
            console.error('No customer service data found');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});
